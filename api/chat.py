# api/chat.py
from flask import Flask, request, jsonify
import anthropic
import os
import tiktoken  # Para contagem de tokens

app = Flask(__name__)

# Preços da Anthropic (por milhão de tokens)
INPUT_PRICE = 3.00
OUTPUT_PRICE = 15.00

def count_tokens(text):
    """Conta os tokens de um texto usando uma aproximação."""
    try:
        encoding = tiktoken.encoding_for_model("cl100k_base") # Usando um encoding comum
        return len(encoding.encode(text))
    except Exception as e:
        print(f"Erro ao contar tokens: {e}")
        return len(text.split()) * 2 # Estimativa simples em caso de erro

@app.route('/api/chat', methods=['POST'])
def chat():
    # Obtém a chave da API do corpo da requisição (do usuário)
    user_api_key = request.headers.get('x-api-key')
    
    if not user_api_key:
        return jsonify({"error": "API Key not provided"}), 401

    try:
        data = request.json
        prompt = data.get('prompt')
        file_content = data.get('file_content', '')
        max_tokens = int(data.get('max_tokens', 1024))
        
        full_prompt = f"{prompt}\n\n{file_content}"
        
        # Calcular custo estimado
        input_tokens = count_tokens(full_prompt)
        output_tokens = max_tokens
        
        estimated_cost_usd = (input_tokens / 1_000_000 * INPUT_PRICE) + (output_tokens / 1_000_000 * OUTPUT_PRICE)

        # Conecta-se à API usando a chave fornecida pelo usuário
        client = anthropic.Anthropic(api_key=user_api_key)

        message = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=max_tokens,
            messages=[
                {"role": "user", "content": full_prompt}
            ]
        )

        response_text = message.content[0].text
        
        return jsonify({
            "response": response_text,
            "cost_info": {
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "estimated_cost_usd": f"{estimated_cost_usd:.4f}"
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)