// static/script.js
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const promptInput = document.getElementById('prompt');
    const fileUpload = document.getElementById('fileUpload');
    const maxTokensInput = document.getElementById('maxTokens');
    const apiKeyInput = document.getElementById('apiKey');
    const chatContainer = document.getElementById('chat-container');
    const estimatedCostSpan = document.getElementById('estimated-cost');

    // Carrega a chave da API do localStorage se existir
    const storedApiKey = localStorage.getItem('claudeApiKey');
    if (storedApiKey) {
        apiKeyInput.value = storedApiKey;
    }

    apiKeyInput.addEventListener('input', (e) => {
        localStorage.setItem('claudeApiKey', e.target.value);
    });

    const appendMessage = (sender, text) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', `${sender}-message`);
        msgDiv.textContent = text;
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const updateEstimatedCost = () => {
        // Esta é uma estimativa simplificada
        const inputTokens = promptInput.value.length / 4; 
        const outputTokens = maxTokensInput.value;
        const inputPrice = 3.00; // por milhão
        const outputPrice = 15.00; // por milhão
        const estimatedCost = (inputTokens / 1_000_000) * inputPrice + (outputTokens / 1_000_000) * outputPrice;
        estimatedCostSpan.textContent = `$${estimatedCost.toFixed(4)}`;
    };

    promptInput.addEventListener('input', updateEstimatedCost);
    maxTokensInput.addEventListener('input', updateEstimatedCost);
    updateEstimatedCost(); // Inicializa o custo estimado

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const apiKey = apiKeyInput.value;
        if (!apiKey) {
            alert('Por favor, insira sua API Key.');
            return;
        }

        const prompt = promptInput.value;
        const maxTokens = maxTokensInput.value;
        const file = fileUpload.files[0];
        let fileContent = '';

        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                fileContent = `[Início do Script]\n${event.target.result}\n[Fim do Script]`;
                await sendMessage(apiKey, prompt, fileContent, maxTokens);
            };
            reader.readAsText(file);
        } else {
            await sendMessage(apiKey, prompt, fileContent, maxTokens);
        }
    });

    const sendMessage = async (apiKey, prompt, fileContent, maxTokens) => {
        appendMessage('user', prompt);
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey // Envia a chave do usuário no cabeçalho
                },
                body: JSON.stringify({ prompt, file_content: fileContent, max_tokens: maxTokens })
            });

            const data = await response.json();
            
            if (response.ok) {
                appendMessage('claude', data.response);
                alert(`Custo da mensagem: $${data.cost_info.estimated_cost_usd} USD.`);
            } else {
                appendMessage('claude', `Erro: ${data.error || 'Algo deu errado.'}`);
            }

        } catch (error) {
            appendMessage('claude', `Erro de conexão: ${error.message}`);
        }
    };
});