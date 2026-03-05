import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";

const links = [
    { href: "#nosotros", label: "Nosotros" },
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#flota", label: "Flota" },
    { href: "#proyectos", label: "Proyectos" },
];

export function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden p-2 text-slate-900 flex items-center justify-center hover:bg-slate-100 rounded-md transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú de navegación</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] z-999999">
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <nav className="flex flex-col gap-6 mt-12 uppercase font-bold text-sm p-4">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-slate-900 transition-colors hover:text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="flex flex-col gap-4 pt-6 border-t border-slate-200">
                        <a
                            href=""
                            className="text-slate-900 transition-colors hover:text-primary"
                        >
                            +51 979 626 232
                        </a>
                        <a
                            href=""
                            className="bg-primary py-3 px-4 text-center text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            COTIZA
                        </a>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
