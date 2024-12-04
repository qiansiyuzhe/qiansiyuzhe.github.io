function AGAI(data) {
    this.token = data.get('auth-token');
    this.chat = function chat(system, question, history, success, fail) {
        // console.log('history', history)
        const messages = [];
        if (history) {
            for (const his of history) {
                messages.push(his);
            }
        }
        messages.push({ role: "user", content: question, pictures: [] });
        $.ajax({
            type: 'POST',
            url: 'https://s.aginnov.com/agai/chat/completions/fsse',
            headers: {
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
                'Authorization': 'Bearer ' + this.token,
                // 'Connection': 'keep-alive',
                // 'Origin': 'https://www.aginnov.com',
                // 'Referer': 'https://www.aginnov.com/',
                // 'Sec-Fetch-Dest': 'empty',
                // 'Sec-Fetch-Mode': 'cors',
                // 'Sec-Fetch-Site': 'same-site',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
                'accept': 'text/event-stream',
                'content-type': 'application/json',
                // 'sec-ch-ua': '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': '"Windows"'
            },
            contentType: 'application/json',
            data: JSON.stringify({
                model: "gpt4o-mini",
                messages: messages,
                webAccess: false,
                question: question,
                searchFor: "",
                customSearch: true,
                site: ""
            }),
            success: function (response) {
                // console.log(response);
                const ss = response.split('\n');
                let res = '';
                for (const s of ss) {
                    if (!s.trim()) {
                        continue;
                    }
                    const s1 = s.trim().replace('data: ', '');
                    if ('[DONE]' === s1) {
                        break
                    }
                    const obj1 = JSON.parse(s1);
                    const cho1 = obj1['choices'];
                    if (!cho1 || !cho1[0]) {
                        continue;
                    }
                    const d = cho1[0]['delta'];
                    if (!d) {
                        continue;
                    }
                    if (!d['content']) {
                        continue;
                    }
                    res += d['content'];
                }
                // console.log(res);
                if (success) {
                    success(res);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                $('#sendButton').attr('diabled', '');
                $('#sendButton').text('发送');
            }
        });
    }
}