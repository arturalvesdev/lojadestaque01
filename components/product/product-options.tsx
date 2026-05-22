"use client"

/**
 * Seletor de especificações do produto (tamanho e cor).
 * Obrigatório antes de adicionar à sacola.
 */

import type { StoreProduct } from "@/lib/types/product"

type ProductOptionsProps = {
  product: StoreProduct
  selectedSize: string | null
  selectedColor: string | null
  onSizeChange: (size: string) => void
  onColorChange: (color: string) => void
}

export function ProductOptions({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
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

      {/* Cor */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">
          Cor <span className="text-destructive">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => onColorChange(color.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedColor === color.name
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {color.hex && (
                <span
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                />
              )}
              {color.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Valida se tamanho e cor foram selecionados */
export function areOptionsSelected(
  size: string | null,
  color: string | null
): boolean {
  return Boolean(size?.trim() && color?.trim())
}
