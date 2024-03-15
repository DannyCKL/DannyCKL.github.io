// 给提交按钮添加点击事件监听器
document.getElementById('button').addEventListener('click', function () {
    // 获取用户名和留言内容
    var username = document.getElementById('username').value;
    var message = document.getElementById('message').value;
    // 如果留言内容为空，弹出提示并返回
    if (message === '') {
        alert('請輸入內容');
        return;
    }
    // 如果用户名为空，将用户名设置为匿名
    if (username === '') {
        username = '匿名';
    }
    // 获取当前时间
    var currentTime = getCurrentTime();
    // 创建留言对象
    var messageObj = {
        username: username,
        message: message,
        time: currentTime
    };
    // 将留言对象转换为字符串
    var messageStr = JSON.stringify(messageObj);
    // 将留言字符串发送到指定的邮箱
    sendMessageToEmail(messageStr);
    // 将留言对象添加到 localStorage 中
    addMessageToLocalStorage(messageObj);
    // // 在留言板中添加新的留言
    addMessageToBoard(messageObj);
    // // 清空用户名和留言内容的输入框
});

// 获取当前时间的函数
function getCurrentTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var day = ('0' + now.getDate()).slice(-2);
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);
    return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

// 将留言对象添加到 localStorage 中
function addMessageToLocalStorage(messageObj) {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(messageObj);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// 在留言板中添加新的留言
function addMessageToBoard(messageObj) {
    var messageBoard = document.getElementById('messageBoard');
    var newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = '<div class="message-info"><div class="info"><img src="icon.png"><strong>'
        + messageObj.username + '</strong></div><span>發布於：' + messageObj.time +
        '</span></div><div class="content">' + messageObj.message + '</div>';
    messageBoard.insertBefore(newMessage, messageBoard.firstChild);
}

// 将留言字符串发送到指定的邮箱
function sendMessageToEmail(messageStr) {
    document.getElementById('form')
        .addEventListener('submit', function (event) {
            event.preventDefault();

            const serviceID = 'default_service';
            const templateID = 'template_s99g7o5';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    console.log('Sent!');
                    document.getElementById('username').value = '';
                    document.getElementById('message').value = '';
                }, (err) => {
                    console.log(JSON.stringify(err));
                });
        });

}

// 从 localStorage 中获取留言信息并显示在留言板上
function showMessagesFromLocalStorage() {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    var messageBoard = document.getElementById('messageBoard');
    messages.forEach(function (messageObj) {
        var newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = '<div class="message-info"><div class="info"><img src="icon.png"><strong>'
            + messageObj.username + '</strong></div><span>發布於：' + messageObj.time +
            '</span></div><div class="content">' + messageObj.message + '</div>';
        messageBoard.appendChild(newMessage);
    });
}

// 在页面加载完成后显示留言信息
window.onload = function () {
    showMessagesFromLocalStorage();
};






