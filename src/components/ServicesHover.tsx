import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ChevronDown } from "lucide-react"

export function ServicesHover() {
    return (
        <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
                <button
                    type="button"
                    className="hover:text-primary transition-colors duration-300 flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
                    aria-label="Ver servicios disponibles"
                >
                    Servicios <ChevronDown className="size-4" />
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-64 flex-col gap-2 z-9999" align="start">
                <a href="/venta-transporte-agregados" className="hover:text-primary transition-colors duration-300 font-medium">Venta y transporte de agregados</a>
                <a href="/alquiler-maquinaria-pesada" className="hover:text-primary transition-colors duration-300 font-medium">Alquiler de maquinaria pesada</a>
                <a href="/movimiento-tierras" className="hover:text-primary transition-colors duration-300 font-medium">Movimiento de tierras</a>
                <a href="/servicios-construccion" className="hover:text-primary transition-colors duration-300 font-medium">Servicios para construcción</a>
            </HoverCardContent>
        </HoverCard>
    )
}
