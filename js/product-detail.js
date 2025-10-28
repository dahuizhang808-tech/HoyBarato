// 当前语言
let currentLang = localStorage.getItem('hoyBaratoLang') || 'zh';

// 语言配置
const detailTranslations = {
    zh: {
        specifications: '规格选择',
        contactSeller: '联系商家',
        buyNow: '下单购买',
        home: '首页',
        chat: '聊天',
        orders: '订单',
        account: '我的',
        paymentTitle: '付款方式',
        paymentMessage: '请通过以下方式付款后点击"我已付款"',
        paymentConfirm: '我已付款',
        paymentCancel: '取消'
    },
    es: {
        specifications: 'Especificaciones',
        contactSeller: 'Contactar vendedor',
        buyNow: 'Comprar ahora',
        home: 'Inicio',
        chat: 'Chat',
        orders: 'Pedidos',
        account: 'Cuenta',
        paymentTitle: 'Método de pago',
        paymentMessage: 'Por favor, realice el pago mediante los siguientes métodos y haga clic en "He pagado"',
        paymentConfirm: 'He pagado',
        paymentCancel: 'Cancelar'
    },
    en: {
        specifications: 'Specifications',
        contactSeller: 'Contact Seller',
        buyNow: 'Buy Now',
        home: 'Home',
        chat: 'Chat',
        orders: 'Orders',
        account: 'Account',
        paymentTitle: 'Payment Method',
        paymentMessage: 'Please make payment through the following methods and click "I have paid"',
        paymentConfirm: 'I have paid',
        paymentCancel: 'Cancel'
    }
};

// 当前选中的规格
let selectedSpec = '';

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取URL参数中的商品ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // 加载商品详情
        loadProductDetail(productId);
    } else {
        // 没有商品ID，返回首页
        window.location.href = 'home.html';
    }
    
    // 更新页面语言
    updateDetailLanguage();
});

// 更新页面语言
function updateDetailLanguage() {
    const lang = detailTranslations[currentLang];
    
    // 更新导航栏文本
    const navTexts = document.querySelectorAll('.nav-text');
    navTexts[0].textContent = lang.home;
    navTexts[1].textContent = lang.chat;
    navTexts[2].textContent = lang.orders;
    navTexts[3].textContent = lang.account;
    
    // 更新页面语言
    document.documentElement.lang = currentLang;
}

// 加载商品详情
function loadProductDetail(productId) {
    const product = getProductById(parseInt(productId));
    
    if (!product) {
        // 商品不存在，返回首页
        window.location.href = 'home.html';
        return;
    }
    
    // 更新页面标题
    document.title = `Hoy Barato - ${product.name}`;
    
    const productDetailContainer = document.getElementById('productDetailContainer');
    const discountedPrice = getDiscountedPrice(product);
    
    // 使用占位图像（实际项目中应替换为真实图像）
    const imagePlaceholder = `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.name)}`;
    
    // 创建商品详情HTML
    const detailHTML = `
        <a href="javascript:history.back()" class="back-btn">
            <i class="fas fa-arrow-left"></i>
        </a>
        <img src="${imagePlaceholder}" alt="${product.name}" class="product-detail-image">
        <div class="product-detail-name">${product.name}</div>
        <div class="product-detail-price-container">
            <span class="product-detail-price">$${discountedPrice}</span>
            ${product.discount ? `<span class="product-detail-discount">-${product.discount}%</span>` : ''}
        </div>
        <div class="product-detail-description">${product.description[currentLang]}</div>
        
        <div class="product-specs">
            <div class="product-specs-title">${detailTranslations[currentLang].specifications}</div>
            <div class="specs-options" id="specsOptions">
                ${product.specs.map((spec, index) => `
                    <div class="spec-option ${index === 0 ? 'selected' : ''}" data-spec="${spec}">${spec}</div>
                `).join('')}
            </div>
        </div>
        
        <div class="action-buttons">
            <button class="contact-btn" id="contactBtn">
                <i class="fas fa-comment btn-icon"></i>
                ${detailTranslations[currentLang].contactSeller}
            </button>
            <button class="buy-btn" id="buyBtn">
                <i class="fas fa-shopping-cart btn-icon"></i>
                ${detailTranslations[currentLang].buyNow}
            </button>
        </div>
    `;
    
    // 更新商品详情容器
    productDetailContainer.innerHTML = detailHTML;
    
    // 设置默认选中的规格
    selectedSpec = product.specs[0];
    
    // 为规格选项添加点击事件
    const specOptions = document.querySelectorAll('.spec-option');
    specOptions.forEach(option => {
        option.addEventListener('click', () => {
            // 移除所有选项的选中状态
            specOptions.forEach(opt => opt.classList.remove('selected'));
            // 添加当前选项的选中状态
            option.classList.add('selected');
            // 更新选中的规格
            selectedSpec = option.getAttribute('data-spec');
        });
    });
    
    // 联系商家按钮点击事件
    const contactBtn = document.getElementById('contactBtn');
    contactBtn.addEventListener('click', () => {
        // 跳转到聊天页面，并传递商家ID
        window.location.href = `chat.html?seller=${product.id}&product=${product.id}`;
    });
    
    // 购买按钮点击事件
    const buyBtn = document.getElementById('buyBtn');
    buyBtn.addEventListener('click', () => {
        // 显示付款提示
        showPaymentPrompt(product);
    });
}

// 显示付款提示
function showPaymentPrompt(product) {
    const lang = detailTranslations[currentLang];
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    
    // 创建模态框内容
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.padding = '20px';
    modalContent.style.width = '90%';
    modalContent.style.maxWidth = '400px';
    
    // 模态框标题
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = lang.paymentTitle;
    modalTitle.style.marginBottom = '15px';
    
    // 模态框消息
    const modalMessage = document.createElement('p');
    modalMessage.textContent = lang.paymentMessage;
    modalMessage.style.marginBottom = '20px';
    
    // 付款二维码（示例）
    const qrCode = document.createElement('div');
    qrCode.style.width = '200px';
    qrCode.style.height = '200px';
    qrCode.style.backgroundColor = '#f0f0f0';
    qrCode.style.margin = '0 auto 20px';
    qrCode.style.display = 'flex';
    qrCode.style.alignItems = 'center';
    qrCode.style.justifyContent = 'center';
    qrCode.innerHTML = '<i class="fas fa-qrcode" style="font-size: 100px; color: #666;"></i>';
    
    // 按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    
    // 取消按钮
    const cancelButton = document.createElement('button');
    cancelButton.textContent = lang.paymentCancel;
    cancelButton.style.flex = '1';
    cancelButton.style.padding = '10px';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.backgroundColor = '#f0f0f0';
    cancelButton.style.cursor = 'pointer';
    
    // 确认按钮
    const confirmButton = document.createElement('button');
    confirmButton.textContent = lang.paymentConfirm;
    confirmButton.style.flex = '1';
    confirmButton.style.padding = '10px';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '4px';
    confirmButton.style.backgroundColor = '#E74C3C';
    confirmButton.style.color = 'white';
    confirmButton.style.cursor = 'pointer';
    
    // 添加按钮到容器
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    
    // 添加元素到模态框内容
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalMessage);
    modalContent.appendChild(qrCode);
    modalContent.appendChild(buttonContainer);
    
    // 添加模态框内容到模态框
    modal.appendChild(modalContent);
    
    // 添加模态框到页面
    document.body.appendChild(modal);
    
    // 取消按钮点击事件
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // 确认按钮点击事件
    confirmButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        
        // 创建订单并跳转到订单页面
        createOrder(product);
        window.location.href = 'orders.html';
    });
}

// 创建订单
function createOrder(product) {
    // 获取现有订单
    let orders = JSON.parse(localStorage.getItem('hoyBaratoOrders') || '[]');
    
    // 创建新订单
    const newOrder = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        price: getDiscountedPrice(product),
        spec: selectedSpec,
        status: 'pending_payment',
        date: new Date().toISOString()
    };
    
    // 添加新订单
    orders.push(newOrder);
    
    // 保存订单
    localStorage.setItem('hoyBaratoOrders', JSON.stringify(orders));
}