// 语言配置
const translations = {
    zh: {
        welcomeTitle: '欢迎使用 Hoy Barato',
        welcomeSubtitle: '墨西哥本地华人购物平台',
        continueBtn: '继续',
        languageNote: '可在设置中随时更改语言'
    },
    es: {
        welcomeTitle: 'Bienvenido a Hoy Barato',
        welcomeSubtitle: 'Plataforma de compras para la comunidad china en México',
        continueBtn: 'Continuar',
        languageNote: 'Puede cambiar el idioma en cualquier momento en la configuración'
    },
    en: {
        welcomeTitle: 'Welcome to Hoy Barato',
        welcomeSubtitle: 'Shopping platform for Chinese community in Mexico',
        continueBtn: 'Continue',
        languageNote: 'You can change the language anytime in settings'
    }
};

// 当前语言
let currentLang = 'zh';

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取语言按钮
    const langButtons = document.querySelectorAll('.language-btn');
    const continueBtn = document.getElementById('continueBtn');
    
    // 为语言按钮添加点击事件
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            langButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            button.classList.add('active');
            
            // 更新当前语言
            currentLang = button.getAttribute('data-lang');
            
            // 更新页面文本
            updateLanguage();
        });
    });
    
    // 继续按钮点击事件
    continueBtn.addEventListener('click', () => {
        // 保存语言选择
        localStorage.setItem('hoyBaratoLang', currentLang);
        // 跳转到首页
        window.location.href = 'pages/home.html';
    });
    
    // 检查是否已有语言设置
    const savedLang = localStorage.getItem('hoyBaratoLang');
    if (savedLang) {
        currentLang = savedLang;
        // 更新选中的语言按钮
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        // 更新页面文本
        updateLanguage();
    }
});

// 更新页面文本
function updateLanguage() {
    const lang = translations[currentLang];
    
    // 更新标题和副标题
    document.querySelector('.welcome-title').textContent = lang.welcomeTitle;
    document.querySelector('.welcome-subtitle').textContent = lang.welcomeSubtitle;
    
    // 更新按钮文本
    document.getElementById('continueBtn').textContent = lang.continueBtn;
    
    // 更新语言提示
    document.querySelector('.language-note').textContent = lang.languageNote;
    
    // 更新页面语言
    document.documentElement.lang = currentLang;
}