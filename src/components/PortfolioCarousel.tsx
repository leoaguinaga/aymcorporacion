import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectCard } from "@/components/ProjectCard"
import { portfolio } from "@/lib/portfolio.data"

export function PortfolioCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full flex flex-col gap-6 md:gap-4"
        >
            <div className="flex flex-col gap-2">
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                    <div className="flex flex-col items-start gap-2">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                            Proyectos destacados
                        </h2>
                        <h1 className="uppercase font-black text-3xl md:text-4xl max-w-lg tracking-wide text-black">
                            Resultados que hablan por sí solos
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-auto relative">
                        <CarouselPrevious
                            className="static transform-none h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white border-0 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <ChevronLeft className="size-6 text-white" />
                        </CarouselPrevious>
                        <CarouselNext
                            className="static transform-none h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white border-0 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <ChevronRight className="size-6 text-white" />
                        </CarouselNext>
                    </div>
                </div>
            </div>

            <div className="w-full mt-4 md:mt-4 cursor-grab active:cursor-grabbing">
                <CarouselContent>
                    {portfolio.map((item, index) => (
                        <CarouselItem key={index}>
                            <ProjectCard
                                title={item.title}
                                location={item.location}
                                service={item.service}
                                result={item.result}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </div>
        </Carousel>
    )
}
