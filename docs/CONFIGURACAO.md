# Configuração — Destaque premium

## 1. Instalar dependências

No terminal, na pasta do projeto:

```bash
npm install
npm run dev
```

Se aparecer erro `Cannot find module '@supabase/ssr'`, é porque o `npm install` não foi executado.

---

## 2. Banco profissional (Supabase) — recomendado

1. Crie conta em [supabase.com](https://supabase.com) → **New project**
2. **Settings → API** → copie:
   - Project URL
   - anon public key
3. Crie o arquivo `.env.local` na raiz (copie de `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

4. No Supabase, abra **SQL Editor** e execute todo o arquivo:

`supabase/schema.sql`

5. **Authentication → Providers → Email** → deixe ativo  
   Para testar rápido: desative **Confirm email**

6. Reinicie: `npm run dev`

---

## 3. Modo local (sem Supabase)

Se você **não** criou o `.env.local`, o site usa login no **navegador** (localStorage).  
Funciona para testar, mas **não é banco profissional**. Configure o Supabase quando puder.

---

## 4. Login

- Apenas **e-mail e senha** (Google foi removido)
- `/conta` → Entrar ou Cadastrar
- Sacola só funciona logado
