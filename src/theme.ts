export const theme = {
    global: {
        font: {
            family: "Roboto",
            size: "18px",
            height: "20px",
        },
        focus: {
            border: {
                color: "transparent",
            },
        },
        colors: {
            brand: '#69fabd'
        }
    },
    button: {
        primary: {
            extend: () => `
            padding: 8px 24px;
          `
        }
    }
};
