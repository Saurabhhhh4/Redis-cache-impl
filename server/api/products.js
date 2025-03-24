export const getproducts = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        products: [
          {
            id: 1,
            name: "product 1",
            price: 100,
          },
        ],
      });
    }, 2000);
  });
export const getproductDetail = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        product: {
          id: id,
          name: `product ${id}`,
          price: Math.floor(Math.random() * id * 100),
        },
      });
    }, 2000);
  });
