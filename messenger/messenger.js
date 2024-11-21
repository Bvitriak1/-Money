const chatButtons = document.querySelectorAll('.chat-button');
const chatView = document.getElementById('chatView');
const chatTitle = document.getElementById('chatTitle');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');

let chats = [];
let currentChat = null;

// Функция для рендеринга сообщений
function renderMessages() {
    messages.innerHTML = ''; // Очистка сообщений

    if (currentChat !== null) {
        chats[currentChat].messages.forEach((msg, index) => {
            const msgElem = document.createElement('div');
            msgElem.classList.add('message');

            // Чередование сообщений: ваши сообщения справа, чужие слева
            if (msg.sender === 'user') {
                msgElem.classList.add('user'); // Сообщения пользователя
            } else {
                msgElem.classList.add('other'); // Сообщения другого пользователя
            }

            msgElem.textContent = msg.text;
            messages.appendChild(msgElem);
        });
    }
}

// Функция для отправки сообщения
function sendMessageToChat() {
    const text = messageInput.value.trim();
    if (text && currentChat !== null) {
        chats[currentChat].messages.push({ sender: 'user', text: text }); // Добавление сообщения от пользователя
        messageInput.value = '';
        renderMessages(); // Обновление отображения сообщений
    }
}

sendMessage.addEventListener('click', sendMessageToChat);

// Пример добавления чатов
chats.push({ title: 'Избранное', messages: [], isFavorite: false });
chats.push({ title: 'Поставщик', messages: [{ sender: 'other', text: 'Привет, как дела?' }], isFavorite: false });
chats.push({ title: 'Чат 3', messages: [{ sender: 'other', text: 'Что нового?' }], isFavorite: false });

chatButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentChat = index;
        chatTitle.textContent = chats[index].title;
        renderMessages();
    });
});
