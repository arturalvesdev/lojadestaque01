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
    <div className="space-y-6 mb-8">
      {/* Tamanho */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">
          Tamanho <span className="text-destructive">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
              className={`min-w-[3rem] px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Cor — informativo apenas, sem seleção */}
      {colors.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Cor</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground select-none"
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
