// 当前语言
let currentLang = localStorage.getItem('hoyBaratoLang') || 'zh';

// 语言配置
const homeTranslations = {
    zh: {
        searchPlaceholder: '搜索商品',
        home: '首页',
        chat: '聊天',
        orders: '订单',
        account: '我的'
    },
    es: {
        searchPlaceholder: 'Buscar productos',
        home: 'Inicio',
        chat: 'Chat',
        orders: 'Pedidos',
        account: 'Cuenta'
    },
    en: {
        searchPlaceholder: 'Search products',
        home: 'Home',
        chat: 'Chat',
        orders: 'Orders',
        account: 'Account'
    }
};

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 更新页面语言
    updateHomeLanguage();
    
    // 加载商品数据
    loadProducts();
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.trim();
        loadProducts(keyword);
    });
});

// 更新页面语言
function updateHomeLanguage() {
    const lang = homeTranslations[currentLang];
    
    // 更新搜索框占位符
    document.getElementById('searchInput').placeholder = lang.searchPlaceholder;
    
    // 更新导航栏文本
    const navTexts = document.querySelectorAll('.nav-text');
    navTexts[0].textContent = lang.home;
    navTexts[1].textContent = lang.chat;
    navTexts[2].textContent = lang.orders;
    navTexts[3].textContent = lang.account;
    
    // 更新页面语言
    document.documentElement.lang = currentLang;
}

// 加载商品数据
function loadProducts(keyword = '') {
    const productGrid = document.getElementById('productGrid');
    const filteredProducts = keyword ? searchProducts(keyword, currentLang) : getProducts();
    
    // 清空商品网格
    productGrid.innerHTML = '';
    
    // 添加商品卡片
    filteredProducts.forEach(product => {
        const discountedPrice = getDiscountedPrice(product);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-id', product.id);
        
        // 使用占位图像（实际项目中应替换为真实图像）
        const imagePlaceholder = `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`;
        
        productCard.innerHTML = `
            <img src="${imagePlaceholder}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price-container">
                    <span class="product-price">$${discountedPrice}</span>
                    ${product.discount ? `<span class="discount-tag">-${product.discount}%</span>` : ''}
                </div>
            </div>
        `;
        
        // 点击商品卡片跳转到详情页
        productCard.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        });
        
        productGrid.appendChild(productCard);
    });
}