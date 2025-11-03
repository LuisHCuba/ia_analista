# ⚙️ Configuração do N8N

> 2 minutos para ter o workflow funcionando

---

## 🎯 **Pré-requisito**

- ✅ Conta N8N (cloud ou self-hosted)
- ✅ API Key do Google Gemini ([obter aqui](https://ai.google.dev/))

---

## 📥 **Passo 1: Importar Workflow**

### **No N8N:**

1. **Clique em** `Workflows` → `Import from File`
2. **Selecione** o arquivo `flux.json` deste repositório
3. **Clique** `Import`

✅ **Workflow importado com 9 nodes!**

---

## 🔑 **Passo 2: Configurar Google Gemini**

### **Node 1: "Google Gemini Chat Model"**

1. **Clique no node** (conectado a "IA: Generate HTML")
2. **Em "Credentials":**
   - Clique `Create New`
   - Tipo: `Google PaLM API`
3. **Cole sua API Key**
4. **Salve**

### **Node 2: Segundo "Google Gemini Chat Model"**

1. **Clique no node** (conectado a "IA: Analysis")
2. **Selecione** a credencial já criada
3. **Ou crie nova** (mesmo processo)

---

## ✅ **Passo 3: Ativar Workflow**

1. **Toggle** `Inactive` → `Active` (topo direito)
2. **Webhook é ativado automaticamente**

---

## 📋 **Passo 4: Copiar URL do Webhook**

1. **Clique no node** `Webhook`
2. **Copie a URL** mostrada (ex: `https://seu-n8n.com/webhook/app`)
3. **Guarde** - vai usar no frontend

---

## 🧪 **Testar (Opcional)**

No node `Webhook`:
- Clique `Listen for Test Event`
- Envie um POST de teste
- Veja dados chegando

---

## ✅ **Pronto!**

Workflow configurado e funcionando! 

**Próximo passo:** [Configurar Frontend](SETUP_APP.md)

