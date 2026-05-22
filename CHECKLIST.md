# ✅ CHECKLIST - PASSO A PASSO

---

## 📌 O QUE VOCÊ PRECISA FAZER AGORA

### ☐ PASSO 1: Instalar Node.js (se não tiver)
- [ ] Verifique se tem Node.js instalado
  - Abra terminal e digite: `node --version`
  - Se aparecer um número (ex: v20.10.0) = Já tem ✅
  - Se aparecer erro = Vai precisar instalar

- [ ] Se precisar instalar:
  - Baixe em: https://nodejs.org/
  - Escolha versão **LTS** (mais estável)
  - Clique em downloads para seu sistema (Windows)
  - Instale normalmente (next, next, next, finish)
  - Reinicie o computador
  - Verifique novamente: `node --version`

---

### ☐ PASSO 2: Abrir Terminal no VS Code
- [ ] Aperte: **Ctrl + ~** (til)
- [ ] Deve abrir terminal na parte inferior

---

### ☐ PASSO 3: Instalar Dependências
- [ ] No terminal, digite exatamente isto:
```bash
npm install
```

- [ ] Aperte Enter
- [ ] **Vai demorar 2-5 minutos** (é normal ficar quiet)
- [ ] Vai aparecer muitas linhas (não se preocupe)
- [ ] Espere aparecer: `added XXX packages` (sem erros)

---

### ☐ PASSO 4: Verificar se funcionou
- [ ] Abra pasta `node_modules` no explorador
  - Deve ter centenas de pastas
  - Se não tem = Não funcionou, tente outra vez

- [ ] Arquivo `package-lock.json` deve ter sido criado

---

### ☐ PASSO 5: Iniciar Servidor
- [ ] No terminal, digite:
```bash
npm run dev
```

- [ ] Espere 10-20 segundos
- [ ] Deve aparecer algo como:
```
> next dev

  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.3s
```

---

### ☐ PASSO 6: Abrir no Navegador
- [ ] Abra navegador (Chrome, Firefox, Edge)
- [ ] Digite na barra de endereço: `http://localhost:3000`
- [ ] Ou mantenha Ctrl e clique na URL no terminal

- [ ] Deve aparecer seu site com:
  - Logo "DESTAQUE PREMIUM"
  - Menu no topo
  - Produtos em destaque
  - Rodapé com contato

---

## 🎉 PRONTO! Você conseguiu!

Se chegou até aqui, todos os erros sumiram e o site está funcionando!

---

## 🔴 ALGO DEU ERRADO?

### Erro durante `npm install`:
- [ ] Feche o terminal
- [ ] Aperte: Ctrl + Shift + P
- [ ] Digite: `Terminal: Kill Terminal`
- [ ] Abra novamente
- [ ] Tente `npm install` outra vez

### Erro durante `npm run dev`:
- [ ] Aperte: Ctrl + C (no terminal)
- [ ] Tente novamente: `npm run dev`

### Erros de módulos ainda aparecem no VS Code:
- [ ] Feche o VS Code completamente
- [ ] Abra novamente
- [ ] Aperte: Ctrl + Shift + P
- [ ] Digite: `Developer: Reload Window`

### Nada funcionou:
- [ ] Verifique se Node.js está instalado: `node --version`
- [ ] Verifique se npm está instalado: `npm --version`
- [ ] Reinicie o computador
- [ ] Tente tudo de novo

---

## 💡 DEPOIS QUE FUNCIONAR

### Desenvolvendo o projeto:
1. Terminal rodando `npm run dev` (sempre)
2. Site aberto em `http://localhost:3000`
3. Faça mudanças nos arquivos `.tsx`
4. Site atualiza automaticamente no navegador

### Parar de desenvolver:
- No terminal: Aperte **Ctrl + C**
- Isso desliga o servidor

### Voltar a desenvolver depois:
- Terminal: Digite `npm run dev` novamente
- Aguarde 10-20 segundos
- Abra `http://localhost:3000` novamente

---

## 📂 ARQUIVO DESTA DOCUMENTAÇÃO

Todas essas explicações estão em 3 arquivos:
- 📄 **ERROS_EXPLICADOS.md** ← Entender os erros
- 📄 **ESTRUTURA_PROJETO.md** ← Organização do projeto  
- 📄 **GUIA_RAPIDO_COMANDOS.md** ← Comandos que usar
- ✅ **CHECKLIST.md** ← Este arquivo (passo a passo)

Se tiver dúvida, leia um desses arquivos!

---

## 🎯 RESUMO EM 4 COMANDOS

```bash
# 1. Primeira vez que abre o projeto
npm install

# 2. Sempre que quer trabalhar
npm run dev

# 3. Abra no navegador
http://localhost:3000

# 4. Para parar
Ctrl + C
```

Pronto! Você sabe tudo que precisa! 🚀

