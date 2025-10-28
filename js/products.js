// 商品数据
const products = [
    {
        id: 1,
        name: '小米手机 Redmi Note 12',
        price: 4999,
        discount: 20,
        image: '../images/product1.jpg',
        description: {
            zh: '高性能智能手机，6.67英寸AMOLED屏幕，5000mAh大电池，支持快充。',
            es: 'Teléfono inteligente de alto rendimiento, pantalla AMOLED de 6.67 pulgadas, batería grande de 5000mAh, compatible con carga rápida.',
            en: 'High-performance smartphone, 6.67-inch AMOLED screen, 5000mAh large battery, supports fast charging.'
        },
        specs: ['6GB+128GB', '8GB+256GB']
    },
    {
        id: 2,
        name: '韩式泡菜 500g',
        price: 120,
        discount: 0,
        image: '../images/product2.jpg',
        description: {
            zh: '正宗韩国泡菜，酸辣可口，开胃下饭。',
            es: 'Kimchi coreano auténtico, picante y sabroso, perfecto como acompañamiento.',
            en: 'Authentic Korean kimchi, spicy and delicious, perfect as a side dish.'
        },
        specs: ['辣', '微辣']
    },
    {
        id: 3,
        name: '电饭煲 3L',
        price: 899,
        discount: 15,
        image: '../images/product3.jpg',
        description: {
            zh: '智能电饭煲，多功能烹饪，内胆不粘涂层，容量3L。',
            es: 'Olla arrocera inteligente, cocción multifuncional, revestimiento antiadherente, capacidad de 3L.',
            en: 'Smart rice cooker, multifunctional cooking, non-stick coating, 3L capacity.'
        },
        specs: ['白色', '黑色']
    },
    {
        id: 4,
        name: '中国茶叶礼盒装',
        price: 350,
        discount: 0,
        image: '../images/product4.jpg',
        description: {
            zh: '精选中国茶叶，包含乌龙茶、普洱茶、龙井茶，高档礼盒包装。',
            es: 'Té chino seleccionado, incluye té Oolong, té Pu-erh, té Longjing, en elegante caja de regalo.',
            en: 'Selected Chinese tea, includes Oolong tea, Pu-erh tea, Longjing tea, in elegant gift box.'
        },
        specs: ['标准装', '豪华装']
    },
    {
        id: 5,
        name: '筷子套装 10双',
        price: 199,
        discount: 10,
        image: '../images/product5.jpg',
        description: {
            zh: '高级竹筷，环保健康，防滑防霉，10双装。',
            es: 'Palillos de bambú de alta calidad, ecológicos y saludables, antideslizantes y antimoho, juego de 10 pares.',
            en: 'High-quality bamboo chopsticks, eco-friendly and healthy, anti-slip and anti-mold, set of 10 pairs.'
        },
        specs: ['竹制', '木制']
    },
    {
        id: 6,
        name: '中华调味料套装',
        price: 450,
        discount: 5,
        image: '../images/product6.jpg',
        description: {
            zh: '中式烹饪必备调味料，包含酱油、醋、豆瓣酱等。',
            es: 'Condimentos esenciales para la cocina china, incluye salsa de soja, vinagre, pasta de frijoles, etc.',
            en: 'Essential seasonings for Chinese cooking, includes soy sauce, vinegar, bean paste, etc.'
        },
        specs: ['标准装', '豪华装']
    },
    {
        id: 7,
        name: '便携式电热水壶',
        price: 299,
        discount: 0,
        image: '../images/product7.jpg',
        description: {
            zh: '旅行便携式电热水壶，快速加热，容量0.5L，适合出差旅行。',
            es: 'Hervidor eléctrico portátil para viajes, calentamiento rápido, capacidad de 0.5L, ideal para viajes de negocios.',
            en: 'Portable travel electric kettle, fast heating, 0.5L capacity, suitable for business trips.'
        },
        specs: ['白色', '粉色']
    },
    {
        id: 8,
        name: '中国风装饰画',
        price: 580,
        discount: 0,
        image: '../images/product8.jpg',
        description: {
            zh: '传统中国风装饰画，山水画风格，适合客厅、书房装饰。',
            es: 'Pintura decorativa de estilo chino tradicional, estilo de paisaje, adecuada para decoración de sala de estar o estudio.',
            en: 'Traditional Chinese style decorative painting, landscape style, suitable for living room or study decoration.'
        },
        specs: ['小号 30x40cm', '大号 50x70cm']
    }
];

// 获取商品数据
function getProducts() {
    return products;
}

// 根据ID获取商品
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// 搜索商品
function searchProducts(keyword, lang = 'zh') {
    if (!keyword) return products;
    
    keyword = keyword.toLowerCase();
    return products.filter(product => {
        // 搜索名称
        if (product.name.toLowerCase().includes(keyword)) return true;
        
        // 搜索描述
        if (product.description[lang].toLowerCase().includes(keyword)) return true;
        
        return false;
    });
}

// 计算折扣后价格
function getDiscountedPrice(product) {
    if (!product.discount) return product.price;
    return Math.round(product.price * (1 - product.discount / 100));
}