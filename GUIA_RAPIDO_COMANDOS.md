# ⚡ GUIA RÁPIDO - COMANDOS ESSENCIAIS

---

## 🖥️ COMO USAR O TERMINAL

### Abrir Terminal no VS Code
- Aperte: **Ctrl + ~** (til)
- Ou: **View > Terminal** no menu

---

## 📋 COMANDOS PARA EXECUTAR

### 1️⃣ Instalar dependências (PRIMEIRO COMANDO)
```bash
npm install
```
- ⏱️ Demora: 2-5 minutos
- 📝 Faz: Baixa todas as bibliotecas listadas no `package.json`
- ✅ Resultado: Cria pasta `node_modules` com 1000+ arquivos

---

### 2️⃣ Iniciar servidor de desenvolvimento (DEPOIS)
```bash
npm run dev
```
- ⏱️ Demora: 10-20 segundos
- 📝 Faz: Liga o servidor na porta 3000
- ✅ Resultado: Aparecem 2 URLs no terminal

---

### 3️⃣ Abrir no navegador
Clique em uma das URLs que aparecer (normalmente):
```
http://localhost:3000
```

Ou mantenha Ctrl pressionado e clique na URL no terminal

---

## 🔴 PROBLEMAS COMUNS

### Problema 1: "npm: comando não encontrado"
```
❌ 'npm' is not recognized as an internal or external command...
```

**Causa:** Node.js não está instalado

**Solução:**
1. Baixe Node.js: https://nodejs.org/ (LTS)
2. Instale normalmente (next, next, next)
3. Reinicie o VS Code
4. Tente de novo

---

### Problema 2: Porta 3000 já está em uso
```
❌ Error: listen EADDRINUSE: address already in use :::3000
```

**Solução (escolha uma):**

**Opção A:** Matar o processo anterior
```bash
npm run dev -- -p 3001
```
(Vai usar porta 3001 em vez de 3000)

**Opção B:** Fechar outras aplicações que usam porta 3000
- Skype, Teams, Discord às vezes usam

---

### Problema 3: Erros de módulos ainda aparecem
```
❌ Cannot find module 'react'...
```

**Solução:**
1. Feche o VS Code completamente
2. Abra novamente
3. Aperte: Ctrl + Shift + P
4. Digite: `Developer: Reload Window`
5. Aperte Enter

---

## ✅ VERIFICAR SE FUNCIONOU

### Verificar npm
```bash
npm --version
```
Deve aparecer um número (ex: `10.2.3`)

### Verificar Node.js
```bash
node --version
```
Deve aparecer um número (ex: `v20.10.0`)

### Verificar se dependências estão instaladas
```bash
ls node_modules
```
Deve listar pastas com nomes de bibliotecas

---

## 📱 FLUXO COMPLETO

### 1. Primeira vez que abre o projeto:
```bash
npm install     # Espera terminar ⏳
```

### 2. Toda vez que quer desenvolver:
```bash
npm run dev     # Liga o servidor
```

### 3. Abrir no navegador:
```
Ctrl + clique em: http://localhost:3000
```

### 4. Para parar o servidor:
```bash
Ctrl + C
```

---

## 🎯 DICA IMPORTANTE

**Não feche o terminal enquanto está desenvolvendo!**

- Deixe ele rodando com `npm run dev`
- Faça mudanças nos arquivos `.tsx`
- O site atualiza AUTOMATICAMENTE no navegador (Hot Reload)

---

## 🔧 OUTROS COMANDOS ÚTEIS

### Build para produção
```bash
npm run build
```
Cria versão otimizada para servidor

### Checker de erros (Lint)
```bash
npm run lint
```
Verifica se tem erros no código

### Iniciar servidor de produção
```bash
npm start
```
Depois de fazer `npm run build`

