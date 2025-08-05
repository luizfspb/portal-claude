# 🤖 Portal Claude

> Uma interface moderna e elegante para conversar com Claude AI usando sua própria API Key

## 🌟 Demonstração

**🔗 Acesse agora:** [portal-claude.vercel.app](https://portal-claude.vercel.app/)

## ✨ Características

### 🎨 **Interface Moderna**
- **Design Dark Theme** com gradientes e animações suaves
- **Responsivo** - Funciona perfeitamente no desktop e mobile
- **Animações elegantes** com transições suaves
- **Glassmorphism** e efeitos visuais modernos

### 🚀 **Funcionalidades Avançadas**
- ✅ **Chat em tempo real** com Claude AI
- ✅ **Upload de arquivos** via drag & drop
- ✅ **Contador de caracteres** com limite inteligente (50.000)
- ✅ **Cálculo de custo** em tempo real
- ✅ **Formatação markdown** básica nas respostas
- ✅ **Notificações toast** para feedback
- ✅ **API Key segura** (armazenada localmente)

### 🔒 **Segurança & Privacidade**
- 🔐 Sua API Key nunca sai do seu navegador
- 🔐 Sem banco de dados - tudo é processado em tempo real
- 🔐 Comunicação direta com a API da Anthropic

## 🛠 Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Python + Flask
- **Deploy:** Vercel (Serverless Functions)
- **API:** Anthropic Claude API
- **Styling:** CSS Custom Properties, Font Awesome

## 📦 Instalação Local

### Pré-requisitos
- Python 3.8+
- Conta na Anthropic com API Key

### 1. Clone o repositório
```bash
git clone https://github.com/luizfspb/portal-claude.git
cd portal-claude
```

### 2. Instale as dependências
```bash
pip install -r requirements.txt
```

### 3. Execute localmente
```bash
python api/chat.py
```

### 4. Acesse no navegador
```
http://localhost:5000
```

## 🚀 Deploy na Vercel

### Opção 1: Deploy Automático
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/luizfspb/portal-claude)

### Opção 2: Deploy Manual
1. Fork este repositório
2. Conecte sua conta Vercel ao GitHub
3. Importe o projeto na Vercel
4. Deploy automático! 🎉

## 📋 Como Usar

### 1. **Configure sua API Key**
- Acesse [console.anthropic.com](https://console.anthropic.com/)
- Gere sua API Key
- Cole no campo "API Key" no portal
- Clique em "Salvar" (fica salva no seu navegador)

### 2. **Comece a conversar**
- Digite sua mensagem no campo de texto
- Use **Shift + Enter** para quebra de linha
- Clique **Enviar** ou pressione **Enter**

### 3. **Anexe arquivos** (opcional)
- Arraste arquivos de código para a área indicada
- Ou clique na área para selecionar arquivos
- **Formatos suportados:**
  - **Gerais:** `.txt`, `.md`, `.json`, `.xml`
  - **Web:** `.html`, `.css`, `.js`
  - **Python:** `.py`
  - **.NET MAUI:** `.cs`, `.xaml`, `.csproj`, `.sln`, `.config`, `.resx`, `.plist`, `.targets`, `.props`

### 4. **Ajuste configurações**
- **Max Tokens:** Controla o tamanho da resposta (1-4096)
- Monitore o **custo estimado** em tempo real

## 💰 Custos

O Portal Claude usa o modelo **Claude 3 Sonnet** com os seguintes preços:

- **Input:** $3.00 por milhão de tokens
- **Output:** $15.00 por milhão de tokens

> **💡 Dica:** O contador de custo é estimativo e atualizado em tempo real para transparência total.

## 🎯 Limitações

- **Caracteres:** Limite de 50.000 caracteres por mensagem (otimização de custo/performance)
- **Arquivos:** Máximo 1MB por arquivo
- **Modelo:** Atualmente usa Claude 3 Sonnet (pode ser expandido)

## 🔧 Estrutura do Projeto

```
portal-claude/
├── 📄 index.html          # Interface principal (CSS/JS inline)
├── 📁 api/
│   └── 🐍 chat.py         # Backend Flask
├── 📄 requirements.txt    # Dependências Python
├── 📄 vercel.json        # Configuração Vercel
├── 📄 .gitignore         # Arquivos ignorados
└── 📖 README.md          # Este arquivo
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

## 📝 Changelog

### v2.0.0 - Interface Redesenhada
- ✨ Design completamente reformulado
- ✨ Contador de caracteres com validação
- ✨ Notificações toast
- ✨ Interface responsiva
- ✨ CSS/JS inline para melhor performance

### v1.0.0 - Versão Inicial
- 🎉 Interface básica funcional
- 🎉 Integração com Claude API
- 🎉 Upload de arquivos
- 🎉 Cálculo de custos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Luiz Fernando**
- GitHub: [@luizfspb](https://github.com/luizfspb)
- Projeto: [Portal Claude](https://github.com/luizfspb/portal-claude)

## 🌟 Agradecimentos

- [Anthropic](https://anthropic.com/) pela incrível API do Claude
- [Vercel](https://vercel.com/) pela plataforma de deploy
- [Font Awesome](https://fontawesome.com/) pelos ícones

---

<div align="center">
  <p><strong>⭐ Se este projeto te ajudou, considere dar uma estrela!</strong></p>
  <p>Feito com ❤️ e ☕ por <a href="https://github.com/luizfspb">Luiz Filipe</a></p>
</div>