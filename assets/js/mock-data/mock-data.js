import { getRandomIntInRange } from '../commons/utils.js';

const brandList = ['filco', 'keychron', 'glorious', 'logitech', 'realforce'];
const categoryList = ['mouse', 'keyboard', 'headphone', 'mousepad'];

const products = [];

for (let i = 0; i < 16; i++) {
  const product = {
    id: i,
    name: `Chuột không dây siêu nhẹ Pulsar X2 Wireless Aim Trainer Pack (Limited Edition) - Medium/Mini`,
    price: getRandomIntInRange(500000, 3000000),
    brand: brandList[getRandomIntInRange(0, brandList.length - 1)],
    category: categoryList[getRandomIntInRange(0, categoryList.length - 1)],
    quantity: getRandomIntInRange(0, 20),
    images: [
      '/assets/imgs/home/mock-product-2.webp',
      '/assets/imgs/home/mock-product-3.webp',
      '/assets/imgs/home/mock-product.webp',
      '/assets/imgs/home/mock-product-4.webp',
      '/assets/imgs/home/mock-product-5.webp',
      '/assets/imgs/home/mock-product-6.webp',
      '/assets/imgs/home/mock-product-7.webp',
    ],
    description:
      'Phiên bản giới hạn hợp tác giữa Pulsar Hàn Quốc và Youtuber/Tech Reviewer RandomfrankP. Giới hạn chỉ 1500 chiếc toàn cầu mỗi loại.',
    designedIn: 'korea',
    warrantyPeriodInMonths: 24,
    information: {
      subtitle: 'Lót chuột đế Xsoft Lethal Gaming Gear Venus PRO',
      title: 'Bề mặt vải Polyester cao cấp',
      description:
        'Được làm từ vải Polyester chất lượng cao và bằng cách tối ưu hóa mật độ, độ cứng và cách dệt vải giúp lót chuột LGG có nhiều loại bề mặt khác nhau. Nhờ đó, lót chuột LGG phù hợp với từng nhu cầu riêng biệt của bạn như tốc độ cao hay cần sự kiểm soát tuyệt vời.',
    },
    detail: [
      {
        title: 'Kích thước',
        content: '120mm x 63mm x 38mm',
      },
      {
        title: 'Cân nặng',
        content: '56g (+- 1g)',
      },
      {
        title: 'Cảm biến',
        content: 'PixArt PAW3395, 26.000 DPI, 650 IPS, 50g Acceleration',
      },
    ],
    significants: [
      {
        title: 'hybrid',
        content: 'Loại bề mặt',
      },
      {
        title: 'poron',
        content: 'chất liệu đế',
      },
      {
        title: 'usa',
        content: 'Thương hiệu mỹ',
      },
    ],
  };

  products.push(product);
}

export { products };
