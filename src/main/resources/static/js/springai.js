/**
 * Spring AI JavaScript 유틸리티
 */
const springai = {
    /**
     * 사용자 질문을 채팅 패널에 추가
     */
    addUserQuestion: function(question, panelId) {
        const panel = document.getElementById(panelId);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'd-flex justify-content-end border-bottom m-2';
        messageDiv.innerHTML = `
            <table>
                <tr>
                    <td><span class="chat-message user-message">${question}</span></td>
                    <td><img src="/image/user.png" width="50" onerror="this.style.display='none'" /></td>
                </tr>
            </table>
        `;
        panel.appendChild(messageDiv);
        panel.scrollTop = panel.scrollHeight;
        
        // 입력 필드 초기화
        document.getElementById('question').value = '';
    },
    
    /**
     * AI 답변 플레이스홀더 추가
     */
    addAnswerPlaceHolder: function(panelId) {
        const panel = document.getElementById(panelId);
        const uuid = 'answer_' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'd-flex justify-content-start border-bottom m-2';
        messageDiv.innerHTML = `
            <table>
                <tr>
                    <td><img src="/image/assistant.png" width="50" onerror="this.style.display='none'" /></td>
                    <td><span id="${uuid}" class="chat-message ai-message">답변을 생성중...</span></td>
                </tr>
            </table>
        `;
        panel.appendChild(messageDiv);
        panel.scrollTop = panel.scrollHeight;
        return uuid;
    },
    
    /**
     * AI 답변 텍스트 출력
     */
    printAnwerText: async function(responseBody, elementId, panelId) {
        const element = document.getElementById(elementId);
        const reader = responseBody.getReader();
        const decoder = new TextDecoder();
        
        element.textContent = '';
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                element.textContent += chunk;
                
                // 스크롤 자동 이동
                const panel = document.getElementById(panelId);
                panel.scrollTop = panel.scrollHeight;
            }
        } catch (error) {
            element.textContent = '답변을 받는 중 오류가 발생했습니다.';
            console.error('스트리밍 오류:', error);
        }
    },
    
    /**
     * 스피너 표시/숨김
     */
    setSpinner: function(spinnerId, show) {
        const spinner = document.getElementById(spinnerId);
        if (show) {
            spinner.classList.remove('d-none');
        } else {
            spinner.classList.add('d-none');
        }
    },
    
    /**
     * 스피너 숨김 (오타 수정)
     */
    getSpionner: function(spinnerId, show) {
        this.setSpinner(spinnerId, !show);
    }
};