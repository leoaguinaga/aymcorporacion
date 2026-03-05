import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContactForm() {
    return (
        <div className="w-full max-w-4xl mx-auto px-6 md:px-0">
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Nombre completo"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                    />
                    <Input
                        type="text"
                        placeholder="Empresa"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                    />

                    <Select>
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
                        placeholder="Teléfono"
                        className="bg-[#111827] border-[#1f2937] text-white placeholder:text-slate-400 h-14 px-4 shadow-none focus-visible:ring-1 focus-visible:ring-slate-600"
                    />
                </div>

                <textarea
                    placeholder="Describe brevemente tu proyecto"
                    className="w-full h-32 px-4 py-4 rounded-md border border-[#1f2937] bg-[#111827] text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-transparent resize-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                        type="submit"
                        className="w-full h-14 bg-accent hover:bg-accent/90 text-black font-bold text-[15px] rounded-md uppercase tracking-wider gap-2 transition-transform hover:scale-[1.02]"
                    >
                        Enviar solicitud
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-14 bg-transparent border-2 border-[#00E676] text-[#00E676] hover:bg-[#00E676]/10 hover:text-[#00E676] font-bold text-[15px] rounded-md uppercase tracking-wider gap-2 transition-transform hover:scale-[1.02]"
                    >
                        WhatsApp Directo
                    </Button>
                </div>
            </form>
        </div>
    );
}
