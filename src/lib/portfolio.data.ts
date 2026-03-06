export interface Project {
    title: string;
    location: string;
    service: string;
    result: string;
    image: string;
    gallery: string[];
}

export const portfolio: Project[] = [
    {
        title: "H.U. ALAMEDA REAL DE LAMBAYEQUE - XIV: CONSTRUCCIÓN DE PARQUES 1 Y 2.",
        location: "Lambayeque, Perú",
        service: "Ejecución de parques",
        result: "Construcción integral de parques finalizada exitosamente cumpliendo con altos estándares de calidad y seguridad.",
        image: "project.jpg",
        gallery: [
            "project.jpg",
            "carretera1.jpg",
            "carretera2.jpeg"
        ]
    },
    {
        title: "REVESTIMIENTO DE CANAL DESAGUADERO H.U. ESTANCIA DE CHICLAYO X.",
        location: "Chiclayo, Perú",
        service: "Ejecución de canal",
        result: "Revestimiento de canal hidráulico asegurando un flujo eficiente con materiales de alta durabilidad.",
        image: "project.jpg",
        gallery: [
            "project.jpg",
            "carretera1.jpg",
            "carretera2.jpeg"
        ]
    }
];
