# 📊 Dashboard Inteligente de Análise de Métricas

> Painel automatizado com IA para análise de dados de aplicativos móveis

![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6?style=flat&logo=typescript)
![N8N](https://img.shields.io/badge/N8N-Workflow-ff6d5a?style=flat)
![Google Gemini](https://img.shields.io/badge/IA-Google%20Gemini-4285f4?style=flat)

---

## 🎯 **Visão Geral**

Sistema completo de análise automatizada que transforma dados brutos de métricas de aplicativos em **visualizações dinâmicas** e **insights acionáveis** gerados por IA.

### **Funcionalidades Principais:**

✅ **Upload Múltiplo** - Processa vários arquivos JSON simultaneamente  
✅ **Visualizações Automáticas** - Gera gráficos adaptados aos dados  
✅ **Análise de IA** - Google Gemini gera insights executivos  
✅ **Interface Profissional** - Modo dark com animações  
✅ **Processamento Otimizado** - IA rápida e eficiente  

---

## 🚀 **Início Rápido**

```bash
# 1. Instale dependências
npm install

# 2. Inicie o servidor
npm run dev

# 3. Acesse
http://localhost:5173
```

📘 **Primeira vez?** Veja o [Manual de Instalação Completo](MANUAL_INSTALACAO.md)

---

## 📸 **Como Funciona**

1. **📁 Upload** - Carregue arquivos JSON com métricas
2. **🤖 Processamento** - N8N + Google Gemini analisam dados
3. **📊 Visualização** - Gráficos interativos são gerados
4. **💡 Insights** - IA apresenta análise executiva

---

## 🛠️ **Stack Tecnológica**

### **Frontend:**
- **React 18** + TypeScript
- **Recharts** - Gráficos nativos
- **Vite** - Build tool

### **Backend/Automação:**
- **N8N** - Orquestração de workflow
- **Google Gemini** - Inteligência Artificial

---

## 📖 **Documentação**

- 📘 **[Manual de Instalação](MANUAL_INSTALACAO.md)** - Guia passo a passo completo
- 🏗️ **[Arquitetura](ARQUITETURA.md)** - Decisões técnicas e fluxo
- 🎬 **[Guia de Apresentação](APRESENTACAO.md)** - Roteiro para demo

---

## 🎨 **Recursos**

### **Interface:**
- 🌙 Modo dark profissional
- 🤖 Animação de loading com robô
- ⏱️ Timer em tempo real
- 🔊 Notificação sonora de sucesso
- 📱 Design responsivo

### **Visualizações:**
- 🥧 Gráficos de pizza com % e valores
- 📊 Gráficos de barras com rótulos
- 📈 Gráficos de linha com pontos
- 🎨 7 cores automáticas
- 🖱️ Tooltips interativos

### **Análise de IA:**
- 📋 Resumo executivo
- 💡 Insights acionáveis
- ⚠️ Alertas críticos
- 🎯 Linguagem clara

---

## 🔧 **Configuração**

### **Webhook N8N:**
1. Clique no botão ⚙️ (topo direito)
2. Configure URL: `/api` ou `https://seu-n8n.com/webhook/app`
3. Salve

---

## 📦 **Scripts**

```bash
npm run dev      # Desenvolvimento (localhost:5173)
npm run build    # Build de produção
npm run preview  # Preview da build
```

---

## 🐛 **Troubleshooting**

**Gráficos não aparecem?**
- Verifique Console (F12) para erros
- Confirme que N8N retorna JSON correto

**Erro de CORS?**
- Use `/api` como URL (proxy configurado)

**IA demorando?**
- Normal: 1-2min para ~10 arquivos
- Veja logs do N8N

---

## 🏆 **Case Técnico - Rank My App**

Desenvolvido para demonstrar habilidades em:
- Automação No/Low Code
- Integração de IA
- Desenvolvimento Full Stack
- Arquitetura de Soluções

**Desenvolvido por:** Luis Cuba  
**Data:** Novembro 2025

---

## 📧 **Contato**

Para dúvidas sobre o projeto: produto@rankmyapp.com.br

---

## 📄 **Licença**

Projeto desenvolvido exclusivamente para processo seletivo da Rank My App.
