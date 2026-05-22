-- ============================================================
-- DestaquedoSurf — Schema do banco (Supabase / PostgreSQL)
-- Execute no SQL Editor do painel Supabase
-- ============================================================

-- Perfil do cliente (nome na loja, vinculado ao auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índice para busca por e-mail
create index if not exists profiles_email_idx on public.profiles (email);

-- Atualiza updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Cria perfil ao cadastrar novo usuário
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', null)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;

-- Usuário só lê/edita o próprio perfil
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================================
-- GUEST SESSIONS — Rastreamento de usuários anônimos
-- ============================================================

create table if not exists public.guest_sessions (
  id uuid primary key default gen_random_uuid(),
  guest_id text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 days')
);

create index if not exists guest_sessions_guest_id_idx on public.guest_sessions(guest_id);
create index if not exists guest_sessions_user_id_idx on public.guest_sessions(user_id);
create index if not exists guest_sessions_expires_at_idx on public.guest_sessions(expires_at);

drop trigger if exists guest_sessions_updated_at on public.guest_sessions;
create trigger guest_sessions_updated_at
  before update on public.guest_sessions
  for each row execute function public.handle_updated_at();

alter table public.guest_sessions enable row level security;

-- Qualquer pessoa pode ler/inserir sua própria sessão (via guest_id)
create policy "guest_sessions_insert"
  on public.guest_sessions for insert
  with check (true);

-- Qualquer pessoa pode atualizar sua própria sessão
create policy "guest_sessions_update"
  on public.guest_sessions for update
  using (true)
  with check (true);

-- ============================================================
-- CARTS — Carrinhos de compra (guest ou autenticado)
-- ============================================================

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  guest_session_id uuid references public.guest_sessions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  status text not null default 'active' check(status in ('active', 'abandoned', 'completed', 'merged')),
  subtotal_cents integer not null default 0,
  item_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 days'),
  constraint cart_has_owner check (
    (guest_session_id is not null and user_id is null) or
    (guest_session_id is null and user_id is not null)
  )
);

create index if not exists carts_guest_session_id_idx on public.carts(guest_session_id);
create index if not exists carts_user_id_idx on public.carts(user_id);
create index if not exists carts_status_idx on public.carts(status);
create index if not exists carts_created_at_idx on public.carts(created_at);
create index if not exists carts_expires_at_idx on public.carts(expires_at);

drop trigger if exists carts_updated_at on public.carts;
create trigger carts_updated_at
  before update on public.carts
  for each row execute function public.handle_updated_at();

alter table public.carts enable row level security;

-- Guests podem ler/atualizar seus carrinhos
create policy "carts_guest_access"
  on public.carts for select
  using (
    guest_session_id in (
      select id from public.guest_sessions where guest_id = current_setting('app.guest_id', true)::text
    ) or user_id = auth.uid()
  );

create policy "carts_guest_insert"
  on public.carts for insert
  with check (
    (guest_session_id is not null) or
    (user_id = auth.uid())
  );

create policy "carts_guest_update"
  on public.carts for update
  using (
    (guest_session_id is not null) or
    (user_id = auth.uid())
  );

-- Users podem ler/atualizar seus carrinhos
create policy "carts_user_access"
  on public.carts for select
  using (user_id = auth.uid());

create policy "carts_user_update"
  on public.carts for update
  using (user_id = auth.uid());

-- ============================================================
-- CART ITEMS — Itens no carrinho
-- ============================================================

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id text not null,
  name text not null,
  price_cents integer not null,
  quantity integer not null default 1,
  size text not null,
  color text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cart_items_cart_id_idx on public.cart_items(cart_id);
create index if not exists cart_items_product_id_idx on public.cart_items(product_id);
create index if not exists cart_items_created_at_idx on public.cart_items(created_at);

drop trigger if exists cart_items_updated_at on public.cart_items;
create trigger cart_items_updated_at
  before update on public.cart_items
  for each row execute function public.handle_updated_at();

alter table public.cart_items enable row level security;

-- Users e guests podem ler seus próprios itens (via carteira)
create policy "cart_items_select"
  on public.cart_items for select
  using (
    cart_id in (
      select id from public.carts where user_id = auth.uid() or guest_session_id in (
        select id from public.guest_sessions where guest_id = current_setting('app.guest_id', true)::text
      )
    )
  );

create policy "cart_items_insert"
  on public.cart_items for insert
  with check (
    cart_id in (
      select id from public.carts where user_id = auth.uid() or guest_session_id is not null
    )
  );

create policy "cart_items_update"
  on public.cart_items for update
  using (
    cart_id in (
      select id from public.carts where user_id = auth.uid() or guest_session_id is not null
    )
  );

create policy "cart_items_delete"
  on public.cart_items for delete
  using (
    cart_id in (
      select id from public.carts where user_id = auth.uid() or guest_session_id is not null
    )
  );

-- ============================================================
-- ORDERS — Pedidos (preparado para fase 4)
-- ============================================================

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cart_id uuid references public.carts(id) on delete set null,
  status text not null default 'pending' check(status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  payment_status text not null default 'pending' check(payment_status in ('pending', 'approved', 'failed', 'refunded')),
  payment_method text check(payment_method in ('pix', 'credit_card', 'boleto')),
  mercado_pago_id text,
  subtotal_cents integer not null,
  shipping_cost_cents integer not null default 0,
  tax_cents integer not null default 0,
  total_cents integer not null,
  shipping_address jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_payment_status_idx on public.orders(payment_status);
create index if not exists orders_created_at_idx on public.orders(created_at);
create index if not exists orders_mercado_pago_id_idx on public.orders(mercado_pago_id);

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.handle_updated_at();

alter table public.orders enable row level security;

-- Users podem ler seus próprios pedidos
create policy "orders_select"
  on public.orders for select
  using (user_id = auth.uid());

create policy "orders_insert"
  on public.orders for insert
  with check (user_id = auth.uid());

create policy "orders_update"
  on public.orders for update
  using (user_id = auth.uid());

-- ============================================================
-- ORDER ITEMS — Itens do pedido
-- ============================================================

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  name text not null,
  price_cents integer not null,
  quantity integer not null,
  size text not null,
  color text not null,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);

alter table public.order_items enable row level security;

-- Users podem ler itens de seus pedidos
create policy "order_items_select"
  on public.order_items for select
  using (
    order_id in (
      select id from public.orders where user_id = auth.uid()
    )
  );

create policy "order_items_insert"
  on public.order_items for insert
  with check (
    order_id in (
      select id from public.orders where user_id = auth.uid()
    )
  );

-- ============================================================
-- PRODUCTS — Catálogo de produtos (escalável)
-- ============================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  slug text unique not null,
  title text not null,
  description text not null,
  price_cents integer not null,
  promotional_price_cents integer,
  category text not null,
  stock integer not null default 100,
  active boolean not null default true,
  featured_image text,
  gallery_images jsonb default '[]'::jsonb,
  sizes jsonb not null default '[]'::jsonb,
  colors jsonb not null default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_legacy_id_idx on public.products(legacy_id);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_active_idx on public.products(active);
create index if not exists products_created_at_idx on public.products(created_at);

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

alter table public.products enable row level security;

-- Qualquer pessoa pode ler produtos ativos
create policy "products_select_active"
  on public.products for select
  using (active = true);

-- Admins podem fazer tudo (preparado para fase 8)
-- TO DO: Implementar role-based access após admin system estar pronto
