export interface ProjectImage {
    src: string;
    alt: string;
}

export interface ProjectImages {
    main: ProjectImage;
    secondary: [ProjectImage, ProjectImage];
}

export interface Project {
    title: string;
    location: string;
    service: string;
    result: string;
    images: ProjectImages;
}

export const projects: Project[] = [
    {
        title: "H.U. ALAMEDA REAL DE LAMBAYEQUE - XIV: CONSTRUCCIÓN DE PARQUES 1 Y 2.",
        location: "Lambayeque, Perú",
        service: "Ejecución de parques",
        result: "Construcción integral de parques finalizada exitosamente cumpliendo con altos estándares de calidad y seguridad.",
        images: {
            main: {
                src: "/projects/parks/main.webp",
                alt: "Vista principal del proyecto de construcción de parques en Lambayeque",
            },
            secondary: [
                {
                    src: "/projects/parks/parque-1.webp",
                    alt: "Avance del parque 1 en el proyecto Alameda Real de Lambayeque",
                },
                {
                    src: "/projects/parks/parque-2.webp",
                    alt: "Resultado del parque 2 en el proyecto Alameda Real de Lambayeque",
                },
            ],
        },
    },
    {
        title: "REVESTIMIENTO DE CANAL DESAGUADERO H.U. ESTANCIA DE CHICLAYO X.",
        location: "Chiclayo, Perú",
        service: "Ejecución de canal",
        result: "Revestimiento de canal hidráulico asegurando un flujo eficiente con materiales de alta durabilidad.",
        images: {
            main: {
                src: "/projects/drain/main.webp",
                alt: "Vista principal del revestimiento de canal en Chiclayo",
            },
            secondary: [
                {
                    src: "/projects/drain/alt-1.webp",
                    alt: "Detalle del avance del canal revestido en Chiclayo",
                },
                {
                    src: "/projects/drain/alt-2.webp",
                    alt: "Resultado final del proyecto de canal desaguadero en Chiclayo",
                },
            ],
        },
    },
];
