// 当前语言
let currentLang = localStorage.getItem('hoyBaratoLang') || 'zh';

// 语言配置
const chatTranslations = {
    zh: {
        inputPlaceholder: '输入消息...',
        home: '首页',
        chat: '聊天',
        orders: '订单',
        account: '我的',
        today: '今天',
        yesterday: '昨天',
        productInfo: '商品信息',
        viewProduct: '查看商品'
    },
    es: {
        inputPlaceholder: 'Escribe un mensaje...',
        home: 'Inicio',
        chat: 'Chat',
        orders: 'Pedidos',
        account: 'Cuenta',
        today: 'Hoy',
        yesterday: 'Ayer',
        productInfo: 'Información del producto',
        viewProduct: 'Ver producto'
    },
    en: {
        inputPlaceholder: 'Type a message...',
        home: 'Home',
        chat: 'Chat',
        orders: 'Orders',
        account: 'Account',
        today: 'Today',
        yesterday: 'Yesterday',
        productInfo: 'Product Information',
        viewProduct: 'View Product'
    }
};

// 模拟聊天数据
let chatMessages = [];

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const sellerId = urlParams.get('seller');
    const productId = urlParams.get('product');
    
    // 更新页面语言
    updateChatLanguage();
    
    // 加载聊天数据
    loadChatData(sellerId, productId);
    
    // 发送按钮点击事件
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');
    
    sendBtn.addEventListener('click', () => {
        sendMessage();
    });
    
    // 输入框回车发送
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// 更新页面语言
function updateChatLanguage() {
    const lang = chatTranslations[currentLang];
    
    // 更新输入框占位符
    document.getElementById('messageInput').placeholder = lang.inputPlaceholder;
    
    // 更新导航栏文本
    const navTexts = document.querySelectorAll('.nav-text');
    navTexts[0].textContent = lang.home;
    navTexts[1].textContent = lang.chat;
    navTexts[2].textContent = lang.orders;
    navTexts[3].textContent = lang.account;
    
    // 更新页面语言
    document.documentElement.lang = currentLang;
}

// 加载聊天数据
function loadChatData(sellerId, productId) {
    // 获取商家信息
    let sellerName = '商家名称';
    if (sellerId) {
        const product = getProductById(parseInt(sellerId));
        if (product) {
            sellerName = `${product.name} 商家`;
        }
    }
    
    // 更新商家名称
    document.getElementById('sellerName').textContent = sellerName;
    
    // 从本地存储获取聊天记录
    const chatKey = `hoyBarato_chat_${sellerId || 'default'}`;
    const savedMessages = localStorage.getItem(chatKey);
    
    if (savedMessages) {
        chatMessages = JSON.parse(savedMessages);
    } else {
        // 如果没有聊天记录，创建初始消息
        const initialMessages = [
            {
                type: 'received',
                text: currentLang === 'zh' ? '您好！有什么可以帮助您的吗？' : 
                      currentLang === 'es' ? '¡Hola! ¿En qué puedo ayudarte?' : 
                      'Hello! How can I help you?',
                time: new Date(Date.now() - 60000).toISOString() // 1分钟前
            }
        ];
        
        // 如果有商品ID，添加商品信息
        if (productId) {
            const product = getProductById(parseInt(productId));
            if (product) {
                initialMessages.unshift({
                    type: 'product',
                    productId: product.id,
                    time: new Date(Date.now() - 120000).toISOString() // 2分钟前
                });
            }
        }
        
        chatMessages = initialMessages;
        saveChatMessages(sellerId);
    }
    
    // 渲染聊天记录
    renderChatMessages();
}

// 渲染聊天记录
function renderChatMessages() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    chatMessagesContainer.innerHTML = '';
    
    chatMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-container';
        
        if (message.type === 'product') {
            // 渲染商品信息
            const product = getProductById(message.productId);
            if (product) {
                const discountedPrice = getDiscountedPrice(product);
                const imagePlaceholder = `https://via.placeholder.com/60x60?text=${encodeURIComponent(product.name)}`;
                
                messageElement.innerHTML = `
                    <div class="product-message">
                        <img src="${imagePlaceholder}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">$${discountedPrice}</div>
                        </div>
                    </div>
                `;
            }
        } else {
            // 渲染文本消息
            const messageDiv = document.createElement('div');
            messageDiv.className = `message message-${message.type}`;
            
            const messageText = document.createElement('div');
            messageText.className = 'message-text';
            messageText.textContent = message.text;
            
            const messageTime = document.createElement('div');
            messageTime.className = 'message-time';
            messageTime.textContent = formatMessageTime(message.time);
            
            messageDiv.appendChild(messageText);
            messageDiv.appendChild(messageTime);
            messageElement.appendChild(messageDiv);
        }
        
        chatMessagesContainer.appendChild(messageElement);
    });
    
    // 滚动到底部
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// 发送消息
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText) {
        // 添加新消息
        chatMessages.push({
            type: 'sent',
            text: messageText,
            time: new Date().toISOString()
        });
        
        // 清空输入框
        messageInput.value = '';
        
        // 渲染聊天记录
        renderChatMessages();
        
        // 保存聊天记录
        const urlParams = new URLSearchParams(window.location.search);
        const sellerId = urlParams.get('seller');
        saveChatMessages(sellerId);
        
        // 模拟商家回复
        setTimeout(() => {
            simulateReply(messageText);
        }, 1000);
    }
}

// 模拟商家回复
function simulateReply(userMessage) {
    // 根据用户消息生成回复
    let replyText;
    
    if (userMessage.includes('价格') || userMessage.includes('多少钱') || 
        userMessage.includes('precio') || userMessage.includes('cuánto') || 
        userMessage.includes('price') || userMessage.includes('how much')) {
        
        replyText = currentLang === 'zh' ? '这个商品的价格是如商品页所示，您可以直接下单购买。' : 
                   currentLang === 'es' ? 'El precio de este producto es como se muestra en la página del producto, puede realizar un pedido directamente.' : 
                   'The price of this product is as shown on the product page, you can place an order directly.';
    } else if (userMessage.includes('发货') || userMessage.includes('送货') || 
               userMessage.includes('envío') || userMessage.includes('entrega') || 
               userMessage.includes('shipping') || userMessage.includes('delivery')) {
        
        replyText = currentLang === 'zh' ? '我们通常在确认付款后24小时内发货，送达时间约为2-3天。' : 
                   currentLang === 'es' ? 'Normalmente enviamos dentro de las 24 horas posteriores a la confirmación del pago, el tiempo de entrega es de aproximadamente 2-3 días.' : 
                   'We usually ship within 24 hours after payment confirmation, delivery time is approximately 2-3 days.';
    } else if (userMessage.includes('库存') || userMessage.includes('有货') || 
               userMessage.includes('stock') || userMessage.includes('disponible') || 
               userMessage.includes('available')) {
        
        replyText = currentLang === 'zh' ? '目前该商品有充足的库存，您可以放心购买。' : 
                   currentLang === 'es' ? 'Actualmente hay suficiente stock de este producto, puede comprarlo con confianza.' : 
                   'Currently there is sufficient stock of this product, you can purchase with confidence.';
    } else {
        replyText = currentLang === 'zh' ? '感谢您的咨询，请问还有其他问题吗？' : 
                   currentLang === 'es' ? 'Gracias por su consulta, ¿tiene alguna otra pregunta?' : 
                   'Thank you for your inquiry, do you have any other questions?';
    }
    
    // 添加回复消息
    chatMessages.push({
        type: 'received',
        text: replyText,
        time: new Date().toISOString()
    });
    
    // 渲染聊天记录
    renderChatMessages();
    
    // 保存聊天记录
    const urlParams = new URLSearchParams(window.location.search);
    const sellerId = urlParams.get('seller');
    saveChatMessages(sellerId);
}

// 保存聊天记录
function saveChatMessages(sellerId) {
    const chatKey = `hoyBarato_chat_${sellerId || 'default'}`;
    localStorage.setItem(chatKey, JSON.stringify(chatMessages));
}

// 格式化消息时间
function formatMessageTime(isoTime) {
    const messageDate = new Date(isoTime);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = messageDate.toDateString() === now.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();
    
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    if (isToday) {
        return `${chatTranslations[currentLang].today} ${timeString}`;
    } else if (isYesterday) {
        return `${chatTranslations[currentLang].yesterday} ${timeString}`;
    } else {
        const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
        const day = messageDate.getDate().toString().padStart(2, '0');
        return `${month}-${day} ${timeString}`;
    }
}