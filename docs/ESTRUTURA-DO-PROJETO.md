# Estrutura do projeto — Destaque premium

Loja Next.js 16 com catálogo, sacola, login e pedido via WhatsApp.

```
lojadestaque01/
│
├── app/                          # Páginas (rotas do site)
│   ├── layout.tsx                # Layout global (fontes, providers, sacola)
│   ├── page.tsx                  # Página inicial
│   ├── globals.css               # Estilos globais (cores, tema)
│   ├── conta/
│   │   └── page.tsx              # Login e cadastro
│   ├── produto/[id]/
│   │   └── page.tsx              # Página do produto (tamanho, cor, sacola)
│   ├── catalogo/                 # Listagens por categoria
│   │   ├── chinelos-kenner/
│   │   ├── bones-lacoste/
│   │   ├── camisas-time/
│   │   └── selecao-brasileira/
│   └── api/
│       └── instagram-thumbnail/  # API: capa dos reels do Instagram
│
├── components/                   # Interface (React)
│   ├── auth/                     # Login, cadastro, nome na loja
│   ├── product/                  # Seletor tamanho/cor
│   ├── header.tsx                # Menu superior + busca
│   ├── footer.tsx                # Rodapé
│   ├── cart-drawer.tsx           # Sacola lateral
│   ├── product-search.tsx        # Busca de produtos
│   ├── providers.tsx             # Auth + Carrinho + notificações
│   ├── hero.tsx, collections.tsx # Seções da home
│   ├── featured-products.tsx
│   ├── instagram-feed.tsx
│   └── whatsapp-cta.tsx
│
├── contexts/                     # Estado global (React Context)
│   ├── auth-context.tsx          # Usuário logado
│   └── cart-context.tsx          # Itens da sacola (exige login)
│
├── lib/                          # Lógica reutilizável
│   ├── types/                    # Tipos TypeScript
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   └── auth.ts
│   ├── products/                 # Catálogo de produtos
│   │   ├── catalog.ts            # Todos os produtos
│   │   ├── variants.ts           # Tamanhos/cores por categoria
│   │   └── index.ts
│   ├── whatsapp/
│   │   └── messages.ts           # Mensagens personalizadas
│   ├── supabase/                 # Banco (quando configurado)
│   │   ├── client.ts             # Browser
│   │   ├── server.ts             # Servidor
│   │   ├── middleware.ts
│   │   └── config.ts
│   ├── auth/
│   │   └── local-store.ts        # Login local (sem Supabase)
│   └── utils.ts                  # Utilitários CSS (cn)
│
├── supabase/
│   └── schema.sql                # SQL do banco (executar no Supabase)
│
├── public/                       # Imagens e ícones estáticos
├── middleware.ts                 # Sessão Supabase nas requisições
├── package.json                  # Dependências
├── .env.example                  # Modelo das variáveis de ambiente
└── docs/                         # Documentação
```

## Fluxo principal

1. **Visitante** navega na home e catálogos.
2. **Produto** → escolhe tamanho e cor → adiciona à sacola (precisa estar logado).
3. **Conta** (`/conta`) → cadastro com e-mail → define nome na loja.
4. **Sacola** → finalizar → WhatsApp com lista completa do pedido.

## O que foi removido (limpeza)

- Login com Google (causava erros sem configurar OAuth)
- Pasta `components/ui/` — componentes shadcn não usados na loja
- Pasta `hooks/` — duplicata não usada
- Pasta `styles/` — CSS duplicado
- Rota `app/auth/callback` — só servia o Google
