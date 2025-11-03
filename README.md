# 📊 Dashboard Inteligente - Case Rank My App

> Sistema automatizado de análise de métricas com IA

![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6?style=flat&logo=typescript)
![N8N](https://img.shields.io/badge/N8N-Workflow-ff6d5a?style=flat)
![Gemini](https://img.shields.io/badge/IA-Google%20Gemini-4285f4?style=flat)

---

## 🎯 **O Que Faz**

Painel que recebe arquivos JSON com métricas de apps e gera automaticamente:
- 📊 **Gráficos interativos** (pizza, barras, linhas)
- 🤖 **Análise executiva por IA** (insights + alertas)
- ⏱️ **Processamento em tempo real** (1-2min para 10 arquivos)

---

## 🚀 **Acesso Rápido**

### **🌐 Versão Online (Deploy Netlify):**
**[https://analistarank.netlify.app](https://analistarank.netlify.app)**

### **💻 Rodar Localmente:**
```bash
npm install
npm run dev
# Acesse: http://localhost:5173
```

---

## 📖 **Documentação**

1. **[⚙️ Configurar N8N](SETUP_N8N.md)** - Importar workflow (2 minutos)
2. **[💻 Instalar Projeto](SETUP_APP.md)** - Rodar local ou deploy (5 minutos)
3. **[🏗️ Arquitetura](ARQUITETURA.md)** - Como funciona tecnicamente

---

## 🎬 **Como Usar**

1. **Acesse** o painel (online ou local)
2. **Configure webhook** N8N (botão ⚙️)
3. **Faça upload** de arquivos JSON
4. **Clique** "🚀 Gerar Dashboard"
5. **Aguarde** análise da IA (popup com robô)
6. **Visualize** gráficos + insights

---

## 🛠️ **Stack**

- **Frontend:** React + TypeScript + Recharts
- **Backend:** N8N + Google Gemini
- **Deploy:** Netlify (frontend) + N8N Cloud

---

## 📦 **Estrutura**

```
├── src/              # Código React (3 arquivos)
├── public/           # Assets (GIF)
├── flux.json         # Workflow N8N
├── README.md         # Este arquivo
├── SETUP_N8N.md      # Config N8N
└── SETUP_APP.md      # Install App
```

---

## 🏆 **Case Técnico**

Desenvolvido para demonstrar automação No/Low Code com IA.

**Autor:** Luis Cuba  
**Data:** Novembro 2025  
**Status:** ✅ Completo e Funcionando

---

⭐ **[Ver projeto no GitHub](https://github.com/LuisHCuba/ia_analista)**
