# 📘 Manual Completo de Instalação e Configuração

> Guia detalhado passo a passo para configurar N8N e Aplicação

---

## 📋 **Sumário**

1. [Preparação do Ambiente](#1-preparação-do-ambiente)
2. [Instalação e Configuração do N8N](#2-instalação-e-configuração-do-n8n)
3. [Instalação da Aplicação Frontend](#3-instalação-da-aplicação-frontend)
4. [Configuração da Integração](#4-configuração-da-integração)
5. [Teste Completo do Sistema](#5-teste-completo-do-sistema)
6. [Solução de Problemas](#6-solução-de-problemas)

---

## 1. 🔧 **Preparação do Ambiente**

### **1.1 Instalar Node.js**

**Windows:**
1. Acesse: https://nodejs.org/
2. Baixe versão LTS (18.x ou superior)
3. Execute instalador
4. Marque "Automatically install necessary tools"
5. Conclua instalação

**Verificar:**
```bash
node --version
# Saída esperada: v18.x.x ou superior
```

### **1.2 Instalar Git (Opcional)**

**Se for clonar repositório:**
1. Acesse: https://git-scm.com/
2. Baixe e instale
3. Configure:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### **1.3 Obter API Key do Google Gemini**

1. **Acesse:** https://ai.google.dev/
2. **Faça login** com conta Google
3. **Clique em** "Get API Key"
4. **Crie novo projeto** ou selecione existente
5. **Gere API Key**
6. **Copie e guarde** em local seguro

---

## 2. 🔄 **Instalação e Configuração do N8N**

### **2.1 Opção A: Usar N8N Fornecido (Recomendado)**

**Credenciais do Case:**
- **URL:** https://edt.digital-ai.tech/
- **Email:** produto@rankmyapp.com.br
- **Senha:** Mudar123.

**Passos:**
1. Acesse a URL acima
2. Faça login com as credenciais
3. **Pronto!** N8N já está configurado

### **2.2 Opção B: N8N Self-Hosted (Desenvolvimento Local)**

**Instalar N8N:**
```bash
# Instalação global
npm install -g n8n

# Ou via Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n
```

**Iniciar N8N:**
```bash
n8n start
```

**Acesse:** http://localhost:5678

**Criar conta:**
1. Primeira vez: criar usuário administrador
2. Defina email e senha
3. Faça login

---

### **2.3 Importar Workflow**

**Passo 1: Acessar área de Workflows**
1. No N8N, clique em **"Workflows"** (menu lateral)
2. Clique no botão **"+"** ou **"Import from File"**

**Passo 2: Selecionar arquivo**
1. Clique em **"Select file to import"**
2. Navegue até a pasta do projeto
3. Selecione **`flux.json`**
4. Clique **"Abrir"**

**Passo 3: Confirmar importação**
1. Workflow será carregado
2. Você verá 9 nodes conectados
3. Nome do workflow: "Dashboard Analysis"

**Passo 4: Salvar**
1. Clique no botão **"Save"** (topo direito)
2. Confirme nome do workflow

---

### **2.4 Configurar Credenciais do Google Gemini**

**Node 1: "Google Gemini Chat Model" (conectado a IA: Generate HTML)**

1. **Clique no node** `Google Gemini Chat Model`
2. **Na aba "Parameters":**
   - Clique em **"Credential to connect with"**
   - Selecione **"+ Create New Credential"**

3. **Preencha:**
   - **Name:** "Google Gemini API"
   - **API Key:** Cole sua API Key do Google
   - Clique **"Save"**

4. **Teste conexão:**
   - Node deve ficar verde se OK
   - Vermelho se erro

**Repetir para segundo Google Gemini node** (conectado a IA: Analysis):
- Mesmo processo
- Ou selecione credencial já criada

---

### **2.5 Ativar Workflow**

1. **Toggle "Inactive" → "Active"** (topo direito)
2. **Webhook é ativado automaticamente**
3. **URL do webhook aparece** no node "Webhook"

**Copiar URL:**
1. Clique no node `Webhook`
2. Veja campo **"Webhook URLs"**
3. Copie a URL (ex: `https://edt.digital-ai.tech/webhook-test/app`)
4. **Guarde esta URL** - Você vai usar na aplicação

---

### **2.6 Testar N8N Manualmente**

**Via Interface do N8N:**
1. Clique no node `Webhook`
2. Clique em **"Listen for Test Event"**
3. Envie um POST de teste
4. Veja dados chegando

**Via Postman/Insomnia:**
```http
POST https://edt.digital-ai.tech/webhook-test/app
Content-Type: application/json

{
  "timestamp": "2025-11-03T12:00:00Z",
  "files_count": 1,
  "data": [{
    "filename": "test.json",
    "content": {
      "name": "Teste",
      "kind": "bar",
      "data": {"app": [{"x": "A", "value": 10}]}
    }
  }]
}
```

**Resposta esperada:**
```json
{
  "charts": [...],
  "analysis": {...}
}
```

---

## 3. 💻 **Instalação da Aplicação Frontend**

### **3.1 Obter o Código**

**Método 1: Git Clone**
```bash
git clone <repository-url>
cd "Case Rank My App"
```

**Método 2: Download Manual**
1. Baixe ZIP do repositório
2. Extraia para pasta desejada
3. Abra terminal na pasta

### **3.2 Instalar Dependências**

```bash
npm install
```

**Tempo:** ~1 minuto

**Pacotes instalados:**
- react
- react-dom
- recharts
- typescript
- vite

**Total:** ~160 pacotes

---

### **3.3 Verificar Arquivos**

**Arquivos essenciais devem existir:**
```bash
# Código
src/App.tsx
src/main.tsx
src/index.css

# Configuração
package.json
vite.config.ts
tsconfig.json

# Assets
public/cute-robot.gif

# Documentação
README.md
flux.json
```

**Se algum faltar:** Re-baixe do repositório

---

### **3.4 Iniciar Servidor de Desenvolvimento**

```bash
npm run dev
```

**Saída esperada:**
```
VITE v5.0.8  ready in 246 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Acesse:** http://localhost:5173

---

## 4. ⚙️ **Configuração da Integração**

### **4.1 Configurar Proxy (Desenvolvimento Local)**

**Se N8N está em localhost:**

Edite `vite.config.ts`:
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:5678',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/webhook-test/app')
  }
}
```

**Reinicie servidor:**
```bash
# Ctrl+C para parar
npm run dev
```

---

### **4.2 Configurar Webhook na Aplicação**

**No navegador:**

1. **Acesse:** http://localhost:5173
2. **Clique em** `⚙️` (botão Webhook N8N)
3. **Modal de configuração abre**

**Configure URL:**

**Para N8N local:**
```
/api
```

**Para N8N remoto (case):**
```
https://edt.digital-ai.tech/webhook-test/app
```

**Ou N8N próprio:**
```
https://seu-n8n.com/webhook/app
```

4. **Clique em** `💾 Salvar Configuração`

**Confirmação:** Mensagem verde "✅ Configuração salva!"

---

### **4.3 Testar Conexão**

**Teste rápido:**

1. **Crie arquivo** `ping.json`:
```json
{"name": "Ping", "kind": "bar", "data": {"test": [{"x":"A","value":1}]}}
```

2. **Faça upload**
3. **Clique "Gerar Dashboard"**
4. **Se funcionar:** ✅ Conexão OK

**Se der erro:**
- Verifique URL do webhook
- Confirme N8N está ativo
- Veja Console (F12) para detalhes

---

## 5. 🧪 **Teste Completo do Sistema**

### **Cenário de Teste Completo:**

**Dados:** Use arquivos JSON fornecidos no case

**Passos:**

1. **Abra aplicação:** http://localhost:5173

2. **Leia avisos informativos:**
   - 💡 Nota sobre Supabase (MVP)

3. **Upload de arquivos:**
   - Clique na área de upload
   - Selecione 3-5 arquivos JSON
   - Veja lista de arquivos
   - Teste botão ✕ para remover

4. **Processar:**
   - Clique `🚀 Gerar Dashboard`
   - Popup fullscreen aparece
   - Robô anima
   - Timer conta: ⏱️ 0:00, 0:01, 0:02...
   - Aviso: "~10 arquivos = 1-2 min"

5. **Aguarde:**
   - 10-120 segundos
   - Barra de progresso anima

6. **Resultado:**
   - 🔊 Som de sucesso
   - Popup fecha
   - **Análise da IA aparece:**
     - 📋 Resumo
     - 💡 Insights
     - ⚠️ Alertas
   - **Gráficos renderizam:**
     - Com rótulos
     - Com % nos gráficos de pizza
     - Valores formatados

7. **Interaja:**
   - Hover nos gráficos
   - Veja tooltips
   - Scroll pela página

**Se tudo funcionou:** 🎉 **Sistema completo operacional!**

---

## 6. 🐛 **Solução de Problemas Comuns**

### **Erro: "Cannot find module"**

```bash
# Reinstalar
rm -rf node_modules
npm install
```

### **Erro: "Port 5173 already in use"**

```bash
# Matar processo na porta
npx kill-port 5173

# Ou usar outra porta
npm run dev -- --port 3000
```

### **Erro: "Failed to fetch"**

**Causa:** N8N não acessível

**Verificar:**
1. N8N está rodando?
2. Workflow está ativo?
3. URL do webhook está correta?
4. Há CORS configurado (se URL direta)?

### **Erro: "Invalid JSON"**

**Causa:** Arquivo JSON malformado

**Solução:**
1. Valide JSON em: https://jsonlint.com/
2. Corrija erros de sintaxe
3. Faça upload novamente

### **Aviso: "Resposta inválida"**

**Causa:** N8N não retornou formato esperado

**Verificar no N8N:**
1. Execute workflow manualmente
2. Veja output do node "Respond to Webhook"
3. Deve ter: `{charts: [...], analysis: {...}}`

---

## 📞 **Suporte e Contato**

**Dúvidas técnicas:**
- Email: produto@rankmyapp.com.br

**Problemas com credenciais N8N:**
- Solicite acesso via email acima

---

## ✅ **Checklist de Instalação Completa**

Use esta lista para garantir que tudo está configurado:

### **N8N:**
- [ ] N8N acessível e funcionando
- [ ] Workflow `flux.json` importado
- [ ] Google Gemini API Key configurada (2x)
- [ ] Workflow ativado (toggle Active)
- [ ] Webhook URL copiada
- [ ] Teste manual do workflow OK

### **Aplicação:**
- [ ] Node.js 18+ instalado
- [ ] Código baixado/clonado
- [ ] `npm install` executado sem erros
- [ ] `npm run dev` iniciando corretamente
- [ ] http://localhost:5173 acessível
- [ ] Webhook configurado na aplicação
- [ ] Teste com arquivo JSON OK

### **Integração:**
- [ ] Upload de arquivo funciona
- [ ] Processamento inicia
- [ ] Popup de loading aparece
- [ ] N8N recebe dados
- [ ] IA processa e retorna
- [ ] Gráficos renderizam
- [ ] Análise aparece
- [ ] Som toca (opcional)

**Se todos marcados:** 🎉 **Sistema 100% configurado!**

---

## 🚀 **Próximos Passos Após Instalação**

1. **Teste com dados reais** do case
2. **Explore todas as funcionalidades**
3. **Leia documentação técnica** (ARQUITETURA.md)
4. **Prepare demonstração** (APRESENTACAO.md)
5. **Customize se necessário**

---

## 📊 **Validação Final**

### **Sistema está funcionando se:**

✅ Você consegue fazer upload de JSON  
✅ Processamento inicia e mostra robô  
✅ Timer conta segundos  
✅ Após 10-120s, gráficos aparecem  
✅ Análise da IA é exibida  
✅ Som de sucesso toca  
✅ Dados mostrados estão corretos  

---

## 🎓 **Dicas para Apresentação**

1. **Teste antes** com 3-5 arquivos
2. **Tenha fallback** caso internet caia
3. **Prepare dados interessantes** para demo
4. **Explique otimizações** (amostra vs dados completos)
5. **Mostre análise da IA** - é o destaque!

---

## 📞 **Ajuda Adicional**

**Ainda com problemas?**

1. Revise este manual do início
2. Veja [Troubleshooting](#6-solução-de-problemas)
3. Consulte logs:
   - N8N: Interface web
   - App: Console do browser (F12)
4. Contate: produto@rankmyapp.com.br

---

**📘 Manual criado para Case Técnico - Rank My App**  
**Versão:** 1.0  
**Última atualização:** Novembro 2025
