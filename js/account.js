// 当前语言
let currentLang = localStorage.getItem('hoyBaratoLang') || 'zh';

// 模拟用户数据
const userData = {
    name: 'User123',
    id: '123456789'
};

// 语言配置
const accountTranslations = {
    zh: {
        accountTitle: '我的',
        userName: '用户123',
        userId: 'ID: 123456789',
        orderSection: '我的订单',
        allOrders: '全部订单',
        pendingPayment: '待付款',
        shipping: '待发货',
        settingsSection: '设置',
        language: '语言设置',
        about: '关于我们',
        logout: '退出登录',
        languageModalTitle: '选择语言',
        cancel: '取消',
        confirm: '确定',
        home: '首页',
        chat: '聊天',
        orders: '订单',
        account: '我的'
    },
    es: {
        accountTitle: 'Mi Cuenta',
        userName: 'Usuario123',
        userId: 'ID: 123456789',
        orderSection: 'Mis Pedidos',
        allOrders: 'Todos los pedidos',
        pendingPayment: 'Pendiente de pago',
        shipping: 'Enviando',
        settingsSection: 'Configuración',
        language: 'Idioma',
        about: 'Sobre nosotros',
        logout: 'Cerrar sesión',
        languageModalTitle: 'Seleccionar idioma',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        home: 'Inicio',
        chat: 'Chat',
        orders: 'Pedidos',
        account: 'Cuenta'
    },
    en: {
        accountTitle: 'My Account',
        userName: 'User123',
        userId: 'ID: 123456789',
        orderSection: 'My Orders',
        allOrders: 'All Orders',
        pendingPayment: 'Pending Payment',
        shipping: 'Shipping',
        settingsSection: 'Settings',
        language: 'Language',
        about: 'About Us',
        logout: 'Logout',
        languageModalTitle: 'Select Language',
        cancel: 'Cancel',
        confirm: 'Confirm',
        home: 'Home',
        chat: 'Chat',
        orders: 'Orders',
        account: 'Account'
    }
};

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 更新页面语言
    updateAccountLanguage();
    
    // 设置用户数据
    setUserData();
    
    // 绑定菜单点击事件
    bindMenuEvents();
    
    // 绑定语言选择事件
    bindLanguageEvents();
});

// 更新页面语言
function updateAccountLanguage() {
    const lang = accountTranslations[currentLang];
    
    // 更新标题
    document.getElementById('accountTitle').textContent = lang.accountTitle;
    
    // 更新用户信息
    document.getElementById('userName').textContent = lang.userName;
    document.getElementById('userId').textContent = lang.userId;
    
    // 更新订单部分
    document.getElementById('orderSection').textContent = lang.orderSection;
    document.getElementById('allOrdersText').textContent = lang.allOrders;
    document.getElementById('pendingPaymentText').textContent = lang.pendingPayment;
    document.getElementById('shippingText').textContent = lang.shipping;
    
    // 更新设置部分
    document.getElementById('settingsSection').textContent = lang.settingsSection;
    document.getElementById('languageText').textContent = lang.language;
    document.getElementById('aboutText').textContent = lang.about;
    
    // 更新退出按钮
    document.getElementById('logoutBtn').textContent = lang.logout;
    
    // 更新语言弹窗
    document.getElementById('languageModalTitle').textContent = lang.languageModalTitle;
    document.getElementById('languageCancelBtn').textContent = lang.cancel;
    document.getElementById('languageConfirmBtn').textContent = lang.confirm;
    
    // 更新导航栏文本
    const navTexts = document.querySelectorAll('.nav-text');
    navTexts[0].textContent = lang.home;
    navTexts[1].textContent = lang.chat;
    navTexts[2].textContent = lang.orders;
    navTexts[3].textContent = lang.account;
    
    // 更新页面语言
    document.documentElement.lang = currentLang;
}

// 设置用户数据
function setUserData() {
    // 在实际应用中，这里应该从服务器获取用户数据
    // 这里使用模拟数据
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userId').textContent = `ID: ${userData.id}`;
}

// 绑定菜单点击事件
function bindMenuEvents() {
    // 订单菜单
    document.getElementById('allOrdersMenu').addEventListener('click', () => {
        window.location.href = 'orders.html?tab=all';
    });
    
    document.getElementById('pendingPaymentMenu').addEventListener('click', () => {
        window.location.href = 'orders.html?tab=pending_payment';
    });
    
    document.getElementById('shippingMenu').addEventListener('click', () => {
        window.location.href = 'orders.html?tab=shipping';
    });
    
    // 语言设置
    document.getElementById('languageMenu').addEventListener('click', () => {
        showLanguageModal();
    });
    
    // 关于我们
    document.getElementById('aboutMenu').addEventListener('click', () => {
        alert('Hoy Barato - 版本 1.0.0\n© 2023 Hoy Barato 团队');
    });
    
    // 退出登录
    document.getElementById('logoutBtn').addEventListener('click', () => {
        // 在实际应用中，这里应该清除用户会话
        alert('已退出登录');
        // 跳转到欢迎页
        window.location.href = '../index.html';
    });
}

// 显示语言选择弹窗
function showLanguageModal() {
    const modal = document.getElementById('languageModal');
    modal.style.display = 'flex';
    
    // 设置当前选中的语言
    const options = document.querySelectorAll('.language-option');
    options.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// 绑定语言选择事件
function bindLanguageEvents() {
    // 语言选项点击事件
    const options = document.querySelectorAll('.language-option');
    let selectedLang = currentLang;
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            // 移除所有选项的active类
            options.forEach(opt => opt.classList.remove('active'));
            // 为当前点击的选项添加active类
            option.classList.add('active');
            // 更新选中的语言
            selectedLang = option.getAttribute('data-lang');
        });
    });
    
    // 取消按钮
    document.getElementById('languageCancelBtn').addEventListener('click', () => {
        document.getElementById('languageModal').style.display = 'none';
    });
    
    // 确认按钮
    document.getElementById('languageConfirmBtn').addEventListener('click', () => {
        // 保存选中的语言
        if (selectedLang !== currentLang) {
            localStorage.setItem('hoyBaratoLang', selectedLang);
            currentLang = selectedLang;
            // 更新页面语言
            updateAccountLanguage();
        }
        // 关闭弹窗
        document.getElementById('languageModal').style.display = 'none';
    });
}