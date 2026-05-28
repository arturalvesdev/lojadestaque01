import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Troca e Devolução | Destaque Premium",
  description:
    "Entenda nossa política de troca e devolução. Produtos com defeito ou que não atendam às expectativas podem ser trocados em até 7 dias.",
}

export default function PoliticaDeTrocaPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
          Política
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Troca e Devolução
        </h1>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Sua satisfação é nossa prioridade. Confira abaixo como funciona nossa
          política de trocas e devoluções.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Prazo para troca
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Você tem até <strong className="text-foreground">7 dias corridos</strong> após
              o recebimento do produto para solicitar a troca ou devolução,
              conforme o Código de Defesa do Consumidor (Art. 49).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Condições para troca
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Produto com etiqueta original e sem sinais de uso
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Embalagem original ou equivalente para proteção no transporte
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Nota fiscal ou comprovante de compra
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Produto sem avarias causadas por mau uso
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Como solicitar
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Entre em contato conosco pelo WhatsApp informando:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">1.</span>
                Seu nome e número do pedido
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">2.</span>
                Motivo da troca (tamanho, cor, defeito, etc.)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">3.</span>
                Foto do produto caso seja defeito de fabricação
              </li>
            </ul>
            <a
              href="https://wa.me/5511947824035?text=Olá!%20Gostaria%20de%20solicitar%20uma%20troca%20de%20produto."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar troca pelo WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Produtos com defeito
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Em caso de defeito de fabricação, fazemos a troca ou reembolso
              integral sem custo algum para você. O frete de devolução fica por
              nossa conta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Troca por tamanho
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Trocas por tamanho são realizadas mediante disponibilidade em
              estoque. Caso o tamanho desejado não esteja disponível, oferecemos
              crédito ou reembolso. O frete de envio para troca é de
              responsabilidade do cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Reembolso
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Reembolsos são realizados em até{" "}
              <strong className="text-foreground">5 dias úteis</strong> após
              recebimento e aprovação do produto devolvido, via PIX ou estorno
              no cartão de crédito.
            </p>
          </section>

          <div className="border border-border/50 rounded-2xl p-6 bg-card/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dúvidas? Fale conosco pelo WhatsApp{" "}
              <a
                href="https://wa.me/5511947824035"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                +55 11 94782-4035
              </a>{" "}
              de segunda a sábado, das 10h às 19h.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
