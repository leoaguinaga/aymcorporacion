import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serviceType, setServiceType] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);

            const payload = {
                name: String(formData.get("name") ?? ""),
                company: String(formData.get("company") ?? ""),
                service: serviceType || String(formData.get("serviceType") ?? ""),
                phone: String(formData.get("phone") ?? ""),
                message: String(formData.get("message") ?? ""),
            };

            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || data?.ok === false) {
                throw new Error(
                    data?.error || "Error en el envío. Por favor, inténtalo de nuevo."
                );
            }

            toast.success("¡Solicitud enviada con éxito!", {
                description: "Nos pondremos en contacto a la brevedad."
            });

            form.reset();
            setServiceType("");
        } catch (error: any) {
            console.error("Submit error:", error);
            toast.error("Ocurrió un error", {
                description: error?.message || "No pudimos enviar tu solicitud. Intenta nuevamente o contáctanos vía WhatsApp."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-6 md:px-0">
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulario de cotización">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Nombre completo *"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                        disabled={isSubmitting}
                        autoComplete="name"
                        aria-required="true"
                        aria-label="Nombre completo"
                    />
                    <Input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Empresa"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                        disabled={isSubmitting}
                        autoComplete="organization"
                        aria-label="Empresa"
                    />

                    <div>
                        <input type="hidden" name="serviceType" value={serviceType} />
                        <Select value={serviceType} onValueChange={setServiceType} disabled={isSubmitting}>
                            <SelectTrigger id="serviceType" aria-label="Tipo de servicio" className="w-full h-14 bg-[#111827] border-[#1f2937] text-slate-400 px-4 shadow-none focus:ring-1 focus:ring-slate-600">
                                <SelectValue placeholder="Tipo de servicio" className="h-14" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#111827] border-[#1f2937] text-white">
                                <SelectItem value="construccion">Construcción</SelectItem>
                                <SelectItem value="maquinaria">Alquiler de Maquinaria</SelectItem>
                                <SelectItem value="agregados">Venta de Agregados</SelectItem>
                                <SelectItem value="movimiento_tierras">Movimiento de Tierras</SelectItem>
                                <SelectItem value="otros">Otros Servicios</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="Teléfono *"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                        disabled={isSubmitting}
                        autoComplete="tel"
                        inputMode="tel"
                        aria-required="true"
                        aria-label="Teléfono"
                    />
                </div>

                <textarea
                    id="message"
                    name="message"
                    placeholder="Describe brevemente tu proyecto"
                    className="w-full h-32 px-4 py-4 rounded-md border border-[#1f2937] bg-[#111827] text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-transparent resize-none"
                    disabled={isSubmitting}
                    aria-label="Describe brevemente tu proyecto"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label="Enviar solicitud de cotización"
                        className="w-full h-14 bg-accent hover:bg-accent/90 text-black font-bold text-[15px] rounded-md uppercase tracking-wider gap-2 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar solicitud"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.open('https://wa.me/51979626232', '_blank')}
                        aria-label="Abrir WhatsApp directo para cotizar"
                        className="w-full h-14 bg-transparent border-2 border-[#00E676] text-[#00E676] hover:bg-[#00E676]/10 hover:text-[#00E676] font-bold text-[15px] rounded-md uppercase tracking-wider gap-2 transition-transform hover:scale-[1.02]"
                    >
                        WhatsApp Directo
                    </Button>
                </div>
            </form>
        </div>
    );
}
