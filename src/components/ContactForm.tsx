import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        service: "",
        phone: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleServiceChange = (value: string) => {
        setFormData(prev => ({ ...prev, service: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone) {
            toast.error("Por favor completa tu nombre y teléfono");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error en el envío");
            }

            toast.success("¡Solicitud enviada con éxito!", {
                description: "Nos pondremos en contacto a la brevedad."
            });

            setFormData({ name: "", company: "", service: "", phone: "", message: "" });
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("Ocurrió un error", {
                description: "No pudimos enviar tu solicitud. Intenta nuevamente o contáctanos vía WhatsApp."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-6 md:px-0">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre completo *"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                        disabled={isLoading}
                    />
                    <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Empresa"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                        disabled={isLoading}
                    />

                    <Select value={formData.service} onValueChange={handleServiceChange} disabled={isLoading}>
                        <SelectTrigger className="w-full h-14 bg-[#111827] border-[#1f2937] text-slate-400 px-4 shadow-none focus:ring-1 focus:ring-slate-600">
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

                    <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Teléfono *"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                        disabled={isLoading}
                    />
                </div>

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe brevemente tu proyecto"
                    className="w-full h-32 px-4 py-4 rounded-md border border-[#1f2937] bg-[#111827] text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-transparent resize-none"
                    disabled={isLoading}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-accent hover:bg-accent/90 text-black font-bold text-[15px] rounded-md uppercase tracking-wider gap-2 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar solicitud"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.open('https://wa.me/51979626232', '_blank')}
                        className="w-full h-14 bg-transparent border-2 border-[#00E676] text-[#00E676] hover:bg-[#00E676]/10 hover:text-[#00E676] font-bold text-[15px] rounded-md uppercase tracking-wider gap-2 transition-transform hover:scale-[1.02]"
                    >
                        WhatsApp Directo
                    </Button>
                </div>
            </form>
        </div>
    );
}
