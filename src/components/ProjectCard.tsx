import { MapPin, Briefcase, CircleCheck } from "lucide-react";
import Project from "@/assets/project.jpg";
import Carretera1 from "@/assets/carretera1.jpg";
import Carretera2 from "@/assets/carretera2.jpeg";

interface Props {
    title: string;
    location: string;
    service: string;
    result: string;
}

export function ProjectCard({ title, location, service, result }: Props) {
    return (
        <article className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-xl w-full">
            <img
                src={Project.src}
                alt=""
                className="w-full lg:w-1/2 h-[300px] lg:h-auto object-cover"
            />
            <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-8 w-full lg:w-1/2 bg-white justify-center">
                <div className="flex flex-col gap-4 text-sm md:text-base">
                    <h2 className="font-black text-xl md:text-2xl">
                        {title}
                    </h2>
                    <div className="flex flex-row items-start gap-3">
                        <MapPin className="size-5 md:size-6 text-accent shrink-0 mt-0.5" />
                        <div>
                            <p className="text-gray-700">Ubicación</p>
                            <strong>{location}</strong>
                        </div>
                    </div>
                    <div className="flex flex-row items-start gap-3">
                        <Briefcase className="size-5 md:size-6 text-accent shrink-0 mt-0.5" />
                        <div>
                            <p className="text-gray-700">Servicio</p>
                            <strong>{service}</strong>
                        </div>
                    </div>
                    <div className="flex flex-row items-start gap-3">
                        <CircleCheck className="size-5 md:size-6 text-accent shrink-0 mt-0.5" />
                        <div>
                            <p className="text-gray-700">Resultado</p>
                            <strong>{result}</strong>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3 md:gap-4 mt-2 lg:mt-0">
                    <img
                        src={Project.src}
                        alt=""
                        className="w-[calc(100%/3-8px)] md:w-[calc(100%/3-11px)] h-20 sm:h-28 lg:h-full object-cover rounded-lg"
                    />
                    <img
                        src={Carretera1.src}
                        alt=""
                        className="w-[calc(100%/3-8px)] md:w-[calc(100%/3-11px)] h-20 sm:h-28 lg:h-full object-cover rounded-lg"
                    />
                    <img
                        src={Carretera2.src}
                        alt=""
                        className="w-[calc(100%/3-8px)] md:w-[calc(100%/3-11px)] h-20 sm:h-28 lg:h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </article>
    );
}
