import { getRandomIntInRange } from '../commons/ultils.js';

const brandList = ['filco', 'keychron', 'glorious', 'logitech', 'realforce'];
const categoryList = ['mouse', 'keyboard', 'headphone', 'mousepad'];

const products = [];

for (let i = 0; i < 16; i++) {
  const product = {
    id: i,
    name: `${i} Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptas temporibus laborum alias quos vero soluta aspernatur rerum, repellendus obcaecati.`,
    price: getRandomIntInRange(500000, 2500000),
    brand: brandList[getRandomIntInRange(0, brandList.length - 1)],
    category: categoryList[getRandomIntInRange(0, categoryList.length - 1)],
    quantity: getRandomIntInRange(0, 20),
    imgs: [
      '/assets/imgs/home/mock-product-2.webp',
      '/assets/imgs/home/mock-product-3.webp',
      '/assets/imgs/home/mock-product.webp',
    ],
  };

  products.push(product);
}

export { products };
