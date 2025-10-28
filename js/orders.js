// 当前语言
let currentLang = localStorage.getItem('hoyBaratoLang') || 'zh';

// 当前选中的订单状态标签
let currentTab = 'all';

// 语言配置
const orderTranslations = {
    zh: {
        ordersTitle: '订单',
        all: '全部',
        pendingPayment: '待付款',
        shipping: '待发货',
        completed: '已完成',
        orderNumber: '订单号',
        specification: '规格',
        date: '日期',
        confirm: '确认收货',
        viewDetails: '查看详情',
        contactSeller: '联系商家',
        payNow: '立即付款',
        emptyOrders: '暂无订单',
        home: '首页',
        chat: '聊天',
        orders: '订单',
        account: '我的',
        statusPendingPayment: '待付款',
        statusShipping: '待发货',
        statusCompleted: '已完成'
    },
    es: {
        ordersTitle: 'Pedidos',
        all: 'Todos',
        pendingPayment: 'Pendiente',
        shipping: 'Enviando',
        completed: 'Completado',
        orderNumber: 'Número de pedido',
        specification: 'Especificación',
        date: 'Fecha',
        confirm: 'Confirmar',
        viewDetails: 'Ver detalles',
        contactSeller: 'Contactar',
        payNow: 'Pagar ahora',
        emptyOrders: 'No hay pedidos',
        home: 'Inicio',
        chat: 'Chat',
        orders: 'Pedidos',
        account: 'Cuenta',
        statusPendingPayment: 'Pendiente de pago',
        statusShipping: 'Enviando',
        statusCompleted: 'Completado'
    },
    en: {
        ordersTitle: 'Orders',
        all: 'All',
        pendingPayment: 'Pending',
        shipping: 'Shipping',
        completed: 'Completed',
        orderNumber: 'Order No.',
        specification: 'Specification',
        date: 'Date',
        confirm: 'Confirm',
        viewDetails: 'View Details',
        contactSeller: 'Contact',
        payNow: 'Pay Now',
        emptyOrders: 'No orders',
        home: 'Home',
        chat: 'Chat',
        orders: 'Orders',
        account: 'Account',
        statusPendingPayment: 'Pending Payment',
        statusShipping: 'Shipping',
        statusCompleted: 'Completed'
    }
};

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 更新页面语言
    updateOrdersLanguage();
    
    // 加载订单数据
    loadOrders();
    
    // 标签点击事件
    const tabs = document.querySelectorAll('.order-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有标签的active类
            tabs.forEach(t => t.classList.remove('active'));
            // 为当前点击的标签添加active类
            tab.classList.add('active');
            
            // 更新当前选中的标签
            currentTab = tab.getAttribute('data-status');
            
            // 重新加载订单
            loadOrders();
        });
    });
});

// 更新页面语言
function updateOrdersLanguage() {
    const lang = orderTranslations[currentLang];
    
    // 更新标题
    document.getElementById('ordersHeader').textContent = lang.ordersTitle;
    
    // 更新标签
    document.getElementById('tabAll').textContent = lang.all;
    document.getElementById('tabPending').textContent = lang.pendingPayment;
    document.getElementById('tabShipping').textContent = lang.shipping;
    document.getElementById('tabCompleted').textContent = lang.completed;
    
    // 更新导航栏文本
    const navTexts = document.querySelectorAll('.nav-text');
    navTexts[0].textContent = lang.home;
    navTexts[1].textContent = lang.chat;
    navTexts[2].textContent = lang.orders;
    navTexts[3].textContent = lang.account;
    
    // 更新页面语言
    document.documentElement.lang = currentLang;
}

// 加载订单数据
function loadOrders() {
    const orderList = document.getElementById('orderList');
    
    // 从本地存储获取订单数据
    let orders = JSON.parse(localStorage.getItem('hoyBaratoOrders') || '[]');
    
    // 根据当前标签筛选订单
    if (currentTab !== 'all') {
        orders = orders.filter(order => order.status === currentTab);
    }
    
    // 清空订单列表
    orderList.innerHTML = '';
    
    // 如果没有订单，显示空状态
    if (orders.length === 0) {
        const emptyOrders = document.createElement('div');
        emptyOrders.className = 'empty-orders';
        emptyOrders.innerHTML = `
            <div class="empty-icon">
                <i class="fas fa-shopping-bag"></i>
            </div>
            <div>${orderTranslations[currentLang].emptyOrders}</div>
        `;
        orderList.appendChild(emptyOrders);
        return;
    }
    
    // 添加订单
    orders.forEach(order => {
        const product = getProductById(order.productId);
        if (!product) return;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        // 使用占位图像（实际项目中应替换为真实图像）
        const imagePlaceholder = `https://via.placeholder.com/80x80?text=${encodeURIComponent(product.name)}`;
        
        // 获取订单状态文本
        const statusText = getStatusText(order.status);
        const statusClass = getStatusClass(order.status);
        
        // 创建订单HTML
        orderItem.innerHTML = `
            <div class="order-header">
                <div class="order-id">${orderTranslations[currentLang].orderNumber}: ${order.id}</div>
                <div class="order-status ${statusClass}">${statusText}</div>
            </div>
            <div class="order-content">
                <img src="${imagePlaceholder}" alt="${product.name}" class="order-image">
                <div class="order-info">
                    <div class="order-product-name">${product.name}</div>
                    <div class="order-spec">${orderTranslations[currentLang].specification}: ${order.spec}</div>
                    <div class="order-price">$${order.price}</div>
                </div>
            </div>
            <div class="order-footer">
                <div class="order-date">${formatDate(order.date)}</div>
                <div class="order-actions">
                    ${getOrderActions(order)}
                </div>
            </div>
        `;
        
        // 添加订单到列表
        orderList.appendChild(orderItem);
        
        // 添加按钮事件
        const actionButtons = orderItem.querySelectorAll('.order-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                const orderId = order.id;
                
                handleOrderAction(action, orderId);
            });
        });
    });
}

// 获取订单状态文本
function getStatusText(status) {
    switch (status) {
        case 'pending_payment':
            return orderTranslations[currentLang].statusPendingPayment;
        case 'shipping':
            return orderTranslations[currentLang].statusShipping;
        case 'completed':
            return orderTranslations[currentLang].statusCompleted;
        default:
            return '';
    }
}

// 获取订单状态类
function getStatusClass(status) {
    switch (status) {
        case 'pending_payment':
            return 'status-pending';
        case 'shipping':
            return 'status-shipping';
        case 'completed':
            return 'status-completed';
        default:
            return '';
    }
}

// 获取订单操作按钮
function getOrderActions(order) {
    switch (order.status) {
        case 'pending_payment':
            return `
                <button class="order-btn secondary-btn" data-action="contact" data-id="${order.id}">
                    ${orderTranslations[currentLang].contactSeller}
                </button>
                <button class="order-btn primary-btn" data-action="pay" data-id="${order.id}">
                    ${orderTranslations[currentLang].payNow}
                </button>
            `;
        case 'shipping':
            return `
                <button class="order-btn secondary-btn" data-action="contact" data-id="${order.id}">
                    ${orderTranslations[currentLang].contactSeller}
                </button>
                <button class="order-btn primary-btn" data-action="confirm" data-id="${order.id}">
                    ${orderTranslations[currentLang].confirm}
                </button>
            `;
        case 'completed':
            return `
                <button class="order-btn secondary-btn" data-action="view" data-id="${order.id}">
                    ${orderTranslations[currentLang].viewDetails}
                </button>
            `;
        default:
            return '';
    }
}

// 处理订单操作
function handleOrderAction(action, orderId) {
    // 获取订单
    let orders = JSON.parse(localStorage.getItem('hoyBaratoOrders') || '[]');
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return;
    
    const order = orders[orderIndex];
    
    switch (action) {
        case 'contact':
            // 跳转到聊天页面
            window.location.href = `chat.html?seller=${order.productId}`;
            break;
        case 'pay':
            // 更新订单状态为待发货
            order.status = 'shipping';
            orders[orderIndex] = order;
            localStorage.setItem('hoyBaratoOrders', JSON.stringify(orders));
            // 重新加载订单
            loadOrders();
            break;
        case 'confirm':
            // 更新订单状态为已完成
            order.status = 'completed';
            orders[orderIndex] = order;
            localStorage.setItem('hoyBaratoOrders', JSON.stringify(orders));
            // 重新加载订单
            loadOrders();
            break;
        case 'view':
            // 跳转到商品详情页
            window.location.href = `product-detail.html?id=${order.productId}`;
            break;
    }
}

// 格式化日期
function formatDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}