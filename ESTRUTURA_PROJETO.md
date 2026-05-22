# 📁 ESTRUTURA DO PROJETO - ORGANIZAÇÃO

---

## 🏗️ ESTRUTURA VISUAL

```
lojadestaque01/
│
├── 📄 package.json                    ← Lista de dependências (IMPORTANTE)
├── 📄 tsconfig.json                   ← Configuração TypeScript
├── 📄 next.config.mjs                 ← Configuração Next.js
├── 📄 postcss.config.mjs              ← Configuração CSS
├── 📄 components.json                 ← Configuração de componentes
│
├── 📁 app/                            ← Páginas do site
│   ├── 📄 layout.tsx                  ← Layout padrão (envolta de todas)
│   ├── 📄 page.tsx                    ← Página inicial (HOME)
│   ├── 📄 globals.css                 ← Estilos globais
│   │
│   ├── 📁 catalogo/                   ← Catálogos de produtos
│   │   ├── 📁 bones-lacoste/
│   │   │   └── page.tsx               ← Página de bonés
│   │   ├── 📁 camisas-time/
│   │   │   └── page.tsx               ← Página de camisas de time
│   │   ├── 📁 chinelos-kenner/
│   │   │   └── page.tsx               ← Página de chinelos
│   │   └── 📁 selecao-brasileira/
│   │       └── page.tsx               ← Página da seleção
│   │
│   └── 📁 produto/                    ← Página dinâmica de produtos
│       └── 📁 [id]/
│           └── page.tsx               ← Mostra detalhes de 1 produto
│
├── 📁 components/                     ← Peças reutilizáveis
│   ├── 📄 header.tsx                  ← Cabeçalho (logo + menu)
│   ├── 📄 footer.tsx                  ← Rodapé (contato + redes)
│   ├── 📄 hero.tsx                    ← Seção inicial grande
│   ├── 📄 featured-products.tsx       ← 6 produtos em destaque
│   ├── 📄 collections.tsx             ← 4 categorias de produtos
│   ├── 📄 instagram-feed.tsx          ← Feed do Instagram
│   ├── 📄 cart-drawer.tsx             ← Carrinho/Sacola
│   ├── 📄 whatsapp-cta.tsx            ← Botão WhatsApp
│   ├── 📄 theme-provider.tsx          ← Temas (claro/escuro)
│   └── 📁 ui/                         ← Componentes básicos
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ... (muitos mais)
│
├── 📁 contexts/                       ← Gerenciar dados globais
│   └── 📄 cart-context.tsx            ← Contexto do carrinho
│
├── 📁 hooks/                          ← Funções reutilizáveis
│   ├── 📄 use-mobile.ts
│   └── 📄 use-toast.ts
│
├── 📁 lib/                            ← Funções auxiliares
│   └── 📄 utils.ts
│
├── 📁 public/                         ← Imagens e arquivos públicos
│
└── 📁 styles/                         ← Estilos adicionais
    └── 📄 globals.css
```

---

## 🎯 O QUE CADA PASTA FAZ

### `app/` - Páginas do site
- **Cada arquivo `.tsx` é uma página diferente**
- Exemplo: `app/page.tsx` = página inicial
- Exemplo: `app/catalogo/bones-lacoste/page.tsx` = página de bonés

### `components/` - Peças reutilizáveis
- **Componentes que usamos em várias páginas**
- Header, Footer, Botões, Cards, etc
- `ui/` = componentes básicos (botão, input, etc)

### `contexts/` - Dados compartilhados
- **Informações que todo o site precisa acessar**
- Atualmente: lista de produtos no carrinho
- Exemplo: quantos itens no carrinho

### `public/` - Imagens e assets
- **Tudo que é servido "como está"**
- Imagens dos produtos (quando adicionar)
- Ícones

---

## 🔄 COMO FUNCIONA O FLUXO

```
1. Usuário entra no site
   ↓
2. Carrega app/layout.tsx (envolta de tudo)
   ↓
3. Carrega app/page.tsx (página inicial)
   ↓
4. Components/header.tsx, hero.tsx, featured-products.tsx 
   aparecem na página
   ↓
5. Usuário clica em um produto
   ↓
6. Vai para app/produto/[id]/page.tsx (dinâmico com ID do produto)
   ↓
7. Components/cart-context.tsx gerencia se está no carrinho
```

---

## 📝 ARQUIVOS MAIS IMPORTANTES

| Arquivo | Prioridade | O que faz |
|---------|-----------|----------|
| `package.json` | 🔴 CRÍTICO | Lista de dependências |
| `app/page.tsx` | 🔴 CRÍTICO | Página inicial |
| `components/header.tsx` | 🟠 ALTO | Cabeçalho (logo, menu, carrinho) |
| `components/footer.tsx` | 🟠 ALTO | Rodapé (contato, redes sociais) |
| `contexts/cart-context.tsx` | 🟠 ALTO | Gerencia carrinho |
| `app/produto/[id]/page.tsx` | 🟡 MÉDIO | Detalhe de 1 produto |
| `components/ui/*.tsx` | 🟡 MÉDIO | Componentes básicos prontos |

---

## 🚀 PRÓXIMOS PASSOS DEPOIS DE npm install

1. ✅ Instalar dependências (`npm install`)
2. ✅ Iniciar servidor de desenvolvimento (`npm run dev`)
3. ✅ Abrir `http://localhost:3000` no navegador
4. ✅ Ver o site funcionando
5. ✅ Fazer mudanças e ver atualizar em tempo real

