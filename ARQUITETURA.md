# 🏗️ Arquitetura do Projeto

## 📁 Estrutura Simplificada

```
Case Rank My App/
├── src/
│   ├── App.tsx          # Componente principal (upload + visualização)
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
├── flux.json            # Workflow N8N otimizado
├── package.json         # Dependências mínimas
├── vite.config.ts       # Config com proxy
└── index.html           # HTML base
```

## 🔄 Fluxo Completo

### 1️⃣ **Frontend (React)**
```
Upload JSON → Envia para /api → Recebe HTML → Renderiza em iframe
```

### 2️⃣ **N8N Workflow**
```
Webhook
  ↓
Split Files (separa cada arquivo)
  ↓  
Extract Sample (pega 10 primeiros itens)
  ↓
IA (analisa amostra, gera HTML com Chart.js)
  ↓
Aggregate (junta todos os HTMLs)
  ↓
Build Dashboard (monta página final + injeta dados)
  ↓
Respond (retorna HTML completo)
```

### 3️⃣ **O que a IA faz**
- Recebe **amostra** (10 itens) do JSON
- Identifica tipo de dados (temporal, categórico, etc)
- Gera **HTML + Chart.js** que busca dados de `window.allData`
- Retorna HTML puro (sem markdown)

### 4️⃣ **O que o JavaScript faz**
- Injeta dados completos em `window.allData`
- Monta dashboard final
- Retorna para frontend

## 🎯 Otimizações

### **Por que é rápido:**
- ✅ IA processa só 10 itens (não 200+)
- ✅ HTML gerado por template (não por IA)
- ✅ Dados completos injetados uma vez
- ✅ Gráficos executam no browser

### **Por que é escalável:**
- ✅ Funciona com 1 ou 100 arquivos
- ✅ IA não sobrecarrega
- ✅ Frontend leve (sem bibliotecas pesadas)
- ✅ N8N processa em paralelo

## 📊 Formato de Dados Esperado

```json
{
  "filename": "metricas.json",
  "content": {
    "name": "Instalações",
    "kind": "area",
    "xField": "createdAt",
    "yField": "maxinstalls",
    "data": {
      "com.acme.myapp": [
        {"createdAt": "2025-01-01", "maxinstalls": 100000},
        {"createdAt": "2025-01-02", "maxinstalls": 110000}
      ]
    }
  }
}
```

## 🔧 Troubleshooting

### Gráficos não aparecem?
- Verifique Console (F12)
- Confira se `window.allData` está definido
- Veja se Chart.js carregou

### CORS error?
- Use `/api` como URL (proxy configurado)
- Não use URL direta do flux.lhcx.tech

### IA demorando?
- Verifique tamanho da amostra (deve ser só 10 itens)
- Confirme que Extract Sample está funcionando

## 🎉 Resultado Final

Dashboard profissional com:
- Gráficos Chart.js interativos
- Dados reais dos JSONs
- Design responsivo
- Filtros e interatividade (gerados pela IA)

