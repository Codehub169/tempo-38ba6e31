const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use an in-memory database for simplicity, or specify a file path for persistence
// const DB_PATH = path.join(__dirname, 'db.sqlite'); // For file-based DB
const DB_PATH = ':memory:'; // For in-memory DB for easier reset during dev/testing

let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const menuItemsData = [
    { id: 1, name: "Margherita Pizza", description: "Classic delight with 100% real mozzarella cheese, fresh basil, and a rich tomato sauce.", price: 12.99, image: "https://placehold.co/600x400/FF6347/FFF?text=Margherita+Pizza&font=Montserrat" },
    { id: 2, name: "Pepperoni Feast", description: "Loaded with spicy pepperoni, a blend of cheeses, and our signature sauce.", price: 15.99, image: "https://placehold.co/600x400/FFA07A/333?text=Pepperoni+Feast&font=Montserrat" },
    { id: 3, name: "Veggie Supreme", description: "A garden fresh mix of bell peppers, onions, olives, mushrooms, and tomatoes.", price: 14.50, image: "https://placehold.co/600x400/32CD32/FFF?text=Veggie+Supreme&font=Montserrat" },
    { id: 4, name: "Classic Burger", description: "Juicy beef patty, cheddar cheese, lettuce, tomato, and our special sauce on a sesame bun.", price: 9.99, image: "https://placehold.co/600x400/FFD700/333?text=Classic+Burger&font=Montserrat" },
    { id: 5, name: "Chicken Pasta Alfredo", description: "Creamy Alfredo sauce with grilled chicken and fettuccine pasta, topped with parmesan.", price: 16.75, image: "https://placehold.co/600x400/C0C0C0/333?text=Chicken+Pasta&font=Montserrat" },
    { id: 6, name: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey molten center, served with a scoop of vanilla ice cream.", price: 7.50, image: "https://placehold.co/600x400/8B4513/FFF?text=Lava+Cake&font=Montserrat" }
];


const initDb = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create menu_items table
      db.run(`CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image TEXT
      )`, (err) => {
        if (err) return reject(err);
        console.log('Table menu_items created or already exists.');

        // Populate menu_items table if empty
        const stmt = db.prepare("INSERT OR IGNORE INTO menu_items (id, name, description, price, image) VALUES (?, ?, ?, ?, ?)");
        menuItemsData.forEach(item => {
          stmt.run(item.id, item.name, item.description, item.price, item.image);
        });
        stmt.finalize((err) => {
          if (err) return reject(err);
          console.log('Initial menu items populated.');
        });
      });

      // Create orders table
      db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_address TEXT,
        total_amount REAL NOT NULL,
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) return reject(err);
        console.log('Table orders created or already exists.');
      });

      // Create order_items table
      db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        menu_item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price_per_item REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
      )`, (err) => {
        if (err) return reject(err);
        console.log('Table order_items created or already exists.');
        resolve();
      });
    });
  });
};

const getMenuItems = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM menu_items", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const createOrder = (customerInfo, cartItems, totalAmount) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      const stmtOrder = db.prepare("INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount) VALUES (?, ?, ?, ?, ?)");
      stmtOrder.run(customerInfo.name, customerInfo.email, customerInfo.phone, customerInfo.address, totalAmount, function(err) {
        if (err) {
          db.run("ROLLBACK");
          return reject(err);
        }
        const orderId = this.lastID;

        const stmtItem = db.prepare("INSERT INTO order_items (order_id, menu_item_id, quantity, price_per_item) VALUES (?, ?, ?, ?)");
        let itemsProcessed = 0;
        cartItems.forEach(item => {
          stmtItem.run(orderId, item.id, item.quantity, item.price, (itemErr) => {
            if (itemErr) {
              db.run("ROLLBACK");
              return reject(itemErr);
            }
            itemsProcessed++;
            if (itemsProcessed === cartItems.length) {
              stmtItem.finalize((finalizeErr) => {
                if(finalizeErr) {
                    db.run("ROLLBACK");
                    return reject(finalizeErr);
                }
                db.run("COMMIT", (commitErr) => {
                    if(commitErr) {
                        db.run("ROLLBACK");
                        return reject(commitErr);
                    }
                    resolve(orderId);
                });
              });
            }
          });
        });
        stmtOrder.finalize();
      });
    });
  });
};

// If this file is run directly (e.g., `node database.js init`), initialize the DB.
if (require.main === module && process.argv[2] === 'init') {
  initDb().then(() => console.log('Database initialized manually.')).catch(console.error);
}

module.exports = { initDb, getMenuItems, createOrder, db };
