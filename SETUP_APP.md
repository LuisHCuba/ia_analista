# 💻 Instalação do Projeto

> 5 minutos para ter o sistema rodando

---

## 🌐 **Opção 1: Usar Versão Online (Mais Fácil)**

### **Acesse:**
**https://analistarank.netlify.app**

### **Configure:**
1. **Clique em** `⚙️` (canto superior direito - "Webhook N8N")
2. **Cole a URL** do seu webhook N8N
3. **Salve**

✅ **Pronto para usar!**

---

## 💻 **Opção 2: Rodar Localmente**

### **Pré-requisitos:**
- Node.js 18+ instalado

### **Instalação:**

```bash
# 1. Clone
git clone https://github.com/LuisHCuba/ia_analista.git
cd ia_analista

# 2. Instale
npm install

# 3. Rode
npm run dev
```

**Acesse:** http://localhost:5173

### **Configure Webhook:**
1. Clique em `⚙️`
2. URL: `/api` (desenvolvimento) ou `https://seu-n8n.com/webhook/app`
3. Salve

---

## 🚀 **Deploy Próprio (Netlify)**

### **Passo 1: Fork no GitHub**
- Fork deste repositório

### **Passo 2: Conectar no Netlify**
1. Acesse [netlify.com](https://netlify.com)
2. New Site → Import from Git
3. Selecione seu fork
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

### **Passo 3: Configure Variáveis (Opcional)**

Se quiser proxy pré-configurado:
- Edite `vite.config.ts`
- Coloque URL do seu N8N
- Commit e redeploy

---

## 🧪 **Testar**

1. **Abra a aplicação**
2. **Faça upload** de um JSON
3. **Clique** "Gerar Dashboard"
4. **Aguarde** robô processar
5. **Veja** gráficos + análise

---

## 🐛 **Problemas?**

**Erro de CORS:**
- Use `/api` como URL (se rodando local)
- Ou configure CORS no N8N

**Gráficos não aparecem:**
- Abra Console (F12)
- Veja se N8N retornou dados

**IA muito lenta:**
- Normal: 1-2min para 10 arquivos

---

## ✅ **Pronto!**

Sistema instalado e funcionando!

**Dúvidas?** Veja [README.md](README.md)

