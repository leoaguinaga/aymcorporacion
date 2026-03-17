import { useState } from "react";
import { MapPin, Briefcase, CircleCheck } from "lucide-react";
import type { ProjectImages } from "@/lib/projects.data";

interface Props {
    title: string;
    location: string;
    service: string;
    result: string;
    images: ProjectImages;
}

export function ProjectCard({ title, location, service, result, images }: Props) {
    const gallery = [images.main, ...images.secondary];
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const selectedImage = gallery[selectedImageIndex];

    return (
        <article className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-xl w-full">
            <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full lg:w-1/2 h-[300px] lg:h-auto object-cover"
                loading="lazy"
                decoding="async"
            />
            <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-8 w-full lg:w-1/2 bg-white justify-center">
                <div className="flex flex-col gap-4 text-sm md:text-base">
                    <h3 className="font-black text-xl md:text-2xl">
                        {title}
                    </h3>
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
                    {gallery.map((image, index) => (
                        <button
                            key={image.src}
                            type="button"
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-[calc(100%/3-8px)] md:w-[calc(100%/3-11px)] overflow-hidden rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer transition-colors ${
                                selectedImageIndex === index
                                    ? "border-primary"
                                    : "border-transparent"
                            }`}
                            aria-label={`Ver imagen del proyecto ${title}`}
                            aria-pressed={selectedImageIndex === index}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-20 sm:h-28 lg:h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </article>
    );
}
