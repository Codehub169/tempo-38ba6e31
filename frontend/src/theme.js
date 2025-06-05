import { extendTheme } from '@chakra-ui/react';

// Design System Colors
const colors = {
  brand: {
    primary: '#FF6347',       // Tomato
    secondary: '#FFA07A',     // Light Salmon
    accent: '#FFD700',        // Gold
    neutralWhite: '#FFFFFF',
    neutralLightGray: '#F8F8F8',
    neutralDarkGray: '#333333',
    text: '#333333',
    success: '#32CD32',       // Lime Green
    warning: '#FFD700',       // Gold (same as accent)
    error: '#DC143C',         // Crimson
  },
};

// Design System Fonts
const fonts = {
  heading: `'Montserrat', sans-serif`,
  body: `'Poppins', sans-serif`,
};

// Design System Shadows (mapping to Chakra's scale or custom)
const shadows = {
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

// Design System Border Radius
const radii = {
  md: '8px',
};

const theme = extendTheme({
  colors,
  fonts,
  shadows,
  radii,
  styles: {
    global: {
      body: {
        bg: 'brand.neutralLightGray',
        color: 'brand.text',
        lineHeight: '1.6',
        fontFamily: 'body',
      },
      html: {
        scrollBehavior: 'smooth',
        fontSize: '16px',
      },
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: 'md', // Use defined radius
      },
      variants: {
        solid: (props) => {
          if (props.colorScheme === 'primary') {
            return {
              bg: 'brand.primary',
              color: 'brand.neutralWhite',
              _hover: {
                bg: '#e05238', // Darker primary
              },
            };
          }
          if (props.colorScheme === 'secondary') {
            return {
              bg: 'brand.secondary',
              color: 'brand.neutralDarkGray',
              _hover: {
                bg: '#f08f6a', // Darker secondary
              },
            };
          }
        },
      },
    },
    Container: {
      baseStyle: {
        width: '90%',
        maxW: '1200px',
        px: '0', // Reset padding, handle with parent if needed
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
      },
    },
    Link: {
      baseStyle: {
        fontFamily: 'body',
        fontWeight: '500',
        _hover: {
          textDecoration: 'none',
        }
      }
    }
  },
});

export default theme;
