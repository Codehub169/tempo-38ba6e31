import axios from 'axios';

// The Vite dev server proxy (configured in vite.config.js) will handle routing /api requests
// to the backend. In production, the Node.js server will serve static files and handle API routes.
const API_BASE_URL = '/api'; // Relative path for API calls

/**
 * Fetches the list of menu items from the backend.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of menu items.
 * Each item should have id, name, description, price, image_url, category.
 * @throws {Error} If the API request fails.
 */
export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/menu`);
    // Ensure price is a number, as backend might store it as string or it might be inconsistent
    return response.data.map(item => ({ ...item, price: parseFloat(item.price) }));
  } catch (error) {
    console.error('Error fetching menu items:', error.response ? error.response.data : error.message);
    // Provide a more specific error message if available from backend, otherwise a generic one
    const message = error.response?.data?.message || 'Failed to fetch menu items. Please check your connection or try again later.';
    throw new Error(message);
  }
};

/**
 * Submits a new order to the backend.
 * @param {Object} orderPayload - The order details.
 * @param {Object} orderPayload.customerInfo - Customer details (e.g., name, email, phone, address).
 * @param {Array<Object>} orderPayload.items - Array of cart items. Each item should have id, name, price, quantity.
 * @param {number} orderPayload.totalAmount - The total amount of the order.
 * @returns {Promise<Object>} A promise that resolves to the response from the backend (e.g., order confirmation with orderId).
 * @throws {Error} If the API request fails.
 */
export const submitOrder = async (orderPayload) => {
  try {
    // Ensure items sent to backend have the structure expected by backend (id, quantity, price)
    // The backend server.js expects 'items' and passes it to database.js which expects id, quantity, price.
    const itemsForBackend = orderPayload.items.map(item => ({
      id: item.id,
      name: item.name, // Backend might use name for records, though not strictly for order_items table schema
      quantity: item.quantity,
      price: item.price // Price at the time of purchase
    }));

    const payload = {
      customerInfo: orderPayload.customerInfo,
      items: itemsForBackend,
      totalAmount: orderPayload.totalAmount
    };

    const response = await axios.post(`${API_BASE_URL}/orders`, payload);
    return response.data; // Assuming backend returns order confirmation (e.g., { orderId: '...' })
  } catch (error) {
    console.error('Error submitting order:', error.response ? error.response.data : error.message);
    const message = error.response?.data?.message || 'Failed to submit order. Please verify your details or try again later.';
    throw new Error(message);
  }
};
