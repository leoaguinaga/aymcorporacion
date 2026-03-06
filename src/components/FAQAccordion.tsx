import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "¿En qué zonas del Perú brindan sus servicios?",
        answer: "Atendemos proyectos a nivel nacional, teniendo nuestra base principal de operaciones y flota prioritaria en Chiclayo y la región norte del Perú."
    },
    {
        question: "¿Sus maquinarias y operadores están certificados?",
        answer: "Sí, todos nuestros equipos reciben mantenimiento preventivo riguroso y nuestros operadores cuentan con sus homologaciones y certificaciones al día garantizando la seguridad en cada proyecto."
    },
    {
        question: "¿Ofrecen venta y transporte de agregados?",
        answer: "Así es, no solo extraemos y procesamos agregados de alta calidad, sino que contamos con volquetes propios para colocar el material directamente en tu obra en los tiempos acordados."
    },
    {
        question: "¿Cuál es el tiempo mínimo para alquiler de maquinaria?",
        answer: "Nuestros contratos de alquiler son flexibles y se adaptan a la magnitud de tu proyecto (por horas, días o meses). Te invitamos a cotizar sin compromiso para darte las mejores condiciones."
    },
    {
        question: "¿Por qué elegirlos frente a intermediarios?",
        answer: "Al ser dueños de nuestra propia maquinaria pesada, eliminamos los sobrecostos de terceros, lo que nos permite ofrecerte control total, capacidad de respuesta inmediata y tarifas muy competitivas."
    }
]

export function FAQAccordion() {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 p-6 md:p-10">
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-gray-100 rounded-xl px-4 md:px-6 bg-gray-50/50 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-200">
                        <AccordionTrigger className="text-left font-bold text-gray-900 text-base md:text-lg hover:no-underline py-5 md:py-6">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-6">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
