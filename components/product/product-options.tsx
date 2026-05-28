"use client"

import type { StoreProduct } from "@/lib/types/product"

type ProductOptionsProps = {
  product: StoreProduct
  selectedSize: string | null
  onSizeChange: (size: string) => void
}

export function ProductOptions({
  product,
  selectedSize,
  onSizeChange,
}: ProductOptionsProps) {
  const { sizes, colors } = product.variants

  return (
    <div className="space-y-5 mb-6">
      {/* Tamanho */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">
            Tamanho
            {selectedSize ? (
              <span className="ml-1.5 text-primary">{selectedSize}</span>
            ) : (
              <span className="ml-1 text-destructive text-xs font-normal">*obrigatório</span>
            )}
          </p>
          <span className="text-xs text-muted-foreground">
            {selectedSize ? "Selecionado ✓" : "Selecione seu tamanho"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
              className={`min-w-[2.75rem] h-11 px-3.5 rounded-xl border text-sm font-semibold transition-all ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/60 bg-secondary/50 text-muted-foreground hover:border-primary/60 hover:bg-primary/5 hover:text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Cor — informativo, sem seleção */}
      {colors.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Cor disponível</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color.name}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/40 bg-secondary/40 text-sm text-muted-foreground select-none"
              >
                {color.hex && (
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-border/40 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                )}
                {color.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** Valida se o tamanho foi selecionado */
export function areOptionsSelected(size: string | null): boolean {
  return Boolean(size?.trim())
}
