document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const promptInput = document.getElementById('prompt-input');
    const sendButton = document.getElementById('send-button');
    const apiKeyInput = document.getElementById('api-key-input');
    const maxTokensInput = document.getElementById('max-tokens-input');
    const saveSettingsButton = document.getElementById('save-settings-button');
    const costInfo = document.getElementById('cost-info');
    const dropZone = document.getElementById('drop-zone');

    let userApiKey = localStorage.getItem('claudeApiKey') || '';
    if (userApiKey) {
        apiKeyInput.value = userApiKey;
    }

    let fileContent = '';
    let fileName = '';

    saveSettingsButton.addEventListener('click', () => {
        userApiKey = apiKeyInput.value;
        localStorage.setItem('claudeApiKey', userApiKey);
        alert('Configurações salvas!');
    });

    // Lógica para drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drop-zone-dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drop-zone-dragover'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            const file = files[0];
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = (event) => {
                fileContent = event.target.result;
                alert(`Arquivo "${fileName}" anexado com sucesso!`);
            };
            reader.readAsText(file);
        }
    }

    // Função para adicionar mensagens ao chat
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'message-user' : 'message-bot');
        messageDiv.innerHTML = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Função para enviar a mensagem
    sendButton.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) return;

        addMessage('user', prompt);
        promptInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': userApiKey
                },
                body: JSON.stringify({
                    prompt: prompt,
                    file_content: fileContent,
                    max_tokens: parseInt(maxTokensInput.value)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido da API');
            }

            const data = await response.json();
            addMessage('bot', data.response);
            costInfo.textContent = `Custo Estimado: $${data.cost_info.estimated_cost_usd}`;

            // Limpa o conteúdo do arquivo após o uso
            fileContent = '';
            fileName = '';

        } catch (error) {
            addMessage('bot', `Erro: ${error.message}`);
            costInfo.textContent = 'Custo Estimado: $0.0000';
        }
    });

    // Permite enviar com a tecla Enter
    promptInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendButton.click();
        }
    });
});