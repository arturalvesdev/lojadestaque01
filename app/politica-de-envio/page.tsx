import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Envio | Destaque Premium",
  description:
    "Saiba mais sobre nossa política de envio e entrega. Enviamos para todo o Brasil com prazo de postagem em até 24h úteis após confirmação do pedido.",
}

export default function PoliticaDeEnvioPage() {
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
          Política de Envio
        </h1>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Aqui você encontra todas as informações sobre como funciona nosso processo de envio e
          entrega para todo o Brasil.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Abrangência de entrega
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Enviamos para <strong className="text-foreground">todo o território nacional</strong>,
              incluindo capitais, interior e regiões remotas. O frete é calculado de acordo com o
              CEP de destino e exibido antes da finalização do pedido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Prazo de postagem
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Após a confirmação do pagamento, postamos seu pedido em até{" "}
              <strong className="text-foreground">24 horas úteis</strong>. Pedidos confirmados em
              dias úteis até as 14h são priorizados para envio no mesmo dia, sujeito a
              disponibilidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Prazo de entrega
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O prazo de entrega varia conforme a região de destino e o serviço de entrega
              escolhido. Prazos estimados após a postagem:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Grande São Paulo:</strong> 1 a 3 dias úteis
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Interior de SP e capitais próximas:</strong>{" "}
                  3 a 7 dias úteis
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Demais regiões do Brasil:</strong> 5 a 15
                  dias úteis
                </span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Estes são prazos estimados. A Destaque Premium não se responsabiliza por atrasos
              causados pelos Correios ou transportadoras, especialmente em períodos de alta demanda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Código de rastreio
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Quando disponível, o código de rastreio é enviado via WhatsApp após a postagem do
              pedido. Você pode acompanhar o status da entrega diretamente no site dos Correios ou
              da transportadora responsável.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Embalagem
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos os pedidos são embalados com cuidado para garantir que o produto chegue em
              perfeitas condições. Utilizamos embalagens adequadas para proteger o produto durante
              o transporte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Conferência do endereço
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              É responsabilidade do cliente conferir o endereço de entrega antes de finalizar o
              pedido. A Destaque Premium não se responsabiliza por entregas não realizadas devido a
              endereço incorreto ou incompleto informado pelo cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Pedido extraviado ou com avaria
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Em caso de extravio ou avaria no produto durante o transporte, entre em contato
              conosco pelo WhatsApp em até{" "}
              <strong className="text-foreground">7 dias corridos</strong> após a data prevista de
              entrega. Analisaremos cada caso e providenciaremos o reenvio ou reembolso conforme a
              situação.
            </p>
          </section>

          <div className="border border-border/50 rounded-2xl p-6 bg-card/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dúvidas sobre seu pedido? Fale conosco pelo WhatsApp{" "}
              <a
                href="https://wa.me/5511947824035?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20o%20envio%20do%20meu%20pedido."
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
