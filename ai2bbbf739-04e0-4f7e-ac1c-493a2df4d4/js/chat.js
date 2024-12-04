let answerCount = 0;
const history = [];
let data = null;

function appendMessage(type, message) {
    answerCount++;
    const answerId = 'answer' + answerCount;
    const messageHtml = `
        <div class="message ${type}">
            ${type === 'received' ? '<img src="./images/robot.png">' : ''}
            <div class="message-content" id = ${answerId}>${message}</div>
            ${type === 'sent' ? '<img src="./images/user.png">' : ''}
        </div>`;
    $('#chatHistory').append(messageHtml);
    $('#chatHistory').scrollTop($('#chatHistory')[0].scrollHeight);
    // hljs.highlightAll();

    // 高亮
    const codeBlocks = document.getElementById(answerId).getElementsByTagName('code');
    if (codeBlocks && codeBlocks.length > 0) {
        for (const codeBlock of codeBlocks) {
            hljs.highlightElement(codeBlock);
        }
    }
}

function request(question) {
    $('#sendButton').attr('diabled', 'diabled');
    $('#sendButton').text('发送中...');

    const ai = new AGAI(data);
    ai.chat('', question, history, function (res) {
        appendMessage('received', marked.marked(res));
        $('#sendButton').attr('diabled', '');
        $('#sendButton').text('发送');

        // 加入历史
        history.push({ role: 'user', content: question });
        history.push({ role: 'assistant', content: res });
    });
}

function getUrlParameter(name) {
    // 使用正则表达式从 URL 中提取参数
    const regex = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)', 'i');
    const results = regex.exec(window.location.href);
    return results ? decodeURIComponent(results[1]) : null;
}

function chatInit() {
    const key = getUrlParameter('key');
    if (key) {
        data = new GlobalData(key);
    } else {
        alert('Empty key');
    }
}

function chat() {
    const message = $('#messageInput').val();
    if (message.trim() !== '') {
        appendMessage('sent', message);
        $('#messageInput').val('');
        request(message);
    }
}