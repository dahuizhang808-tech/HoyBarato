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

// 使用单独命名避免与各页面脚本冲突
let hbLang = localStorage.getItem('hoyBaratoLang') || 'zh';

document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.language-btn');
    const continueBtn = document.getElementById('continueBtn');

    if (langButtons && langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                hbLang = button.getAttribute('data-lang');
                safeUpdateLanguage();
            });
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            localStorage.setItem('hoyBaratoLang', hbLang);
            window.location.href = 'pages/home.html';
        });
    }

    const savedLang = localStorage.getItem('hoyBaratoLang');
    if (savedLang) {
        hbLang = savedLang;
        if (langButtons && langButtons.length > 0) {
            langButtons.forEach(btn => {
                if (btn.getAttribute('data-lang') === hbLang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    safeUpdateLanguage();
});

function safeUpdateLanguage() {
    const lang = translations[hbLang] || translations.zh;

    const titleEl = document.querySelector('.welcome-title');
    if (titleEl) titleEl.textContent = lang.welcomeTitle;

    const subTitleEl = document.querySelector('.welcome-subtitle');
    if (subTitleEl) subTitleEl.textContent = lang.welcomeSubtitle;

    const continueBtnEl = document.getElementById('continueBtn');
    if (continueBtnEl) continueBtnEl.textContent = lang.continueBtn;

    const noteEl = document.querySelector('.language-note');
    if (noteEl) noteEl.textContent = lang.languageNote;

    document.documentElement.lang = hbLang;
}