/* ===================================================
   js/data.js — ARCHIVO EXCLUSIVO DE DATOS (MÓDULO)
=================================================== */

// Array de Testimonios
export const testimoniosData = [
    {
        nombre: "Juan Fernando",
        disciplina: "Triatlón · Larga distancia",
        avatar: "img/testimonios/juan_fernando.png",
        estrellas: 5,
        highlight: false,
        cita: "Llegué a Sebastián con más miedos e impedimentos psicológicos que no me dejaban pasar de nivel. Gracias a su paciencia, enseñanza y su forma de ser, hizo que yo desbloqueara mi cabeza y ya haya hecho 4 triatlones en 4 meses, y ahora apuntando a mucho más.",
        logro: "Cuatro triatlones en cuatro meses"
    },
    {
        nombre: "Ximena",
        disciplina: "Running · Maratón",
        avatar: "img/testimonios/ximena.png",
        estrellas: 5,
        highlight: true,
        cita: "Vengo del hockey y empecé triatlón en diciembre de 2023. En pocos meses, Sebas logró ver en mí un potencial que yo todavía no podía imaginar. En abril de 2025 ya estaba cruzando la meta de mi primer Ironman 70.3 en San Juan. Más allá de su planificación profesional impecable, valoro muchísimo su capacidad para acompañar, motivar y sacar lo mejor de cada atleta.",
        logro: "Ironman 70.3 en San Juan"
    },
    {
        nombre: "Diego R.",
        disciplina: "Natación · Aguas abiertas",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
        estrellas: 5,
        highlight: false,
        cita: "Nos conocemos hace 20 años. Yo dejé de entrenar estos últimos 8 años y, cuando quise volver, no dudé en hablarle. Porque sabía que iba a respetar un proceso acorde y porque, además de ser un gran entrenador, es una excelente persona.",
        logro: "Primera competencia aguas abiertas 2K — Tigre 2024"
    },
    {
        nombre: "Valeria M.",
        disciplina: "Triatlón · 70.3",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
        estrellas: 5,
        highlight: false,
        cita: "Lo que más me sorprendió fue el trabajo de transiciones y la estrategia de nutrición. Llegué al 70.3 sintiéndome fuerte hasta el final. Eso no pasa por casualidad.",
        logro: "Finish 70.3 Pucón · 5h12 — Diciembre 2023"
    },
    {
        nombre: "Lucas T.",
        disciplina: "Ciclismo · Gran Fondo",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80",
        estrellas: 5,
        highlight: false,
        cita: "Nunca pensé que a mis 47 años iba a completar un gran fondo de 180km. El trabajo de base que hicimos con Seba fue clave. La periodización que propone es muy inteligente.",
        logro: "Gran Fondo 180K · Mendoza — Octubre 2024"
    },
    {
        nombre: "Carolina S.",
        disciplina: "Running · Media maratón",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
        estrellas: 5,
        highlight: true,
        cita: "Empecé sin poder correr 5km seguidos y 5 meses después terminé mi primera media maratón. Seba supo exactamente cuándo exigirme y cuándo frenarme. Eso es lo que marca la diferencia.",
        logro: "1ra media maratón 2h04 · Buenos Aires — Agosto 2024"
    },
    {
        nombre: "Chango Spasiuk.",
        disciplina: "Running · Media maratón",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
        estrellas: 5,
        highlight: true,
        cita: "Empecé sin poder correr 5km seguidos y 5 meses después terminé mi primera media maratón. Seba supo exactamente cuándo exigirme y cuándo frenarme. Eso es lo que marca la diferencia.",
        logro: "1ra media maratón 2h04 · Buenos Aires — Agosto 2024"
    }
];

// Nuevo Array de Planes Premium (Mapeado exacto de tu HTML)
export const planesData = [
    {
        id: "svc-base",
        iconClass: "bi bi-water",
        iconModifier: "", // Clase vacía para icono normal
        tag: "Natación · Running · Ciclismo",
        titulo: "Endurance<br />Base Plan",
        desc: "El punto de partida ideal. Un plan de base aeróbica para quien empieza o quiere construir una base sólida en una o más disciplinas de resistencia.",
        features: [
            "12 semanas de base aeróbica",
            "1 o 2 disciplinas a elección",
            "Análisis técnico inicial",
            "Plan PDF + TrainingPeaks"
        ],
        highlight: false,
        btnText: "Consultar"
    },
    {
        id: "svc-media",
        iconClass: "bi bi-speedometer2",
        iconModifier: "svc-card__icon--gold", // Mantiene el color dorado de tu CSS
        tag: "Triatlón · 70.3 · Media distancia",
        titulo: "Preparación<br />Media Distancia",
        desc: "El plan más elegido. 20 a 24 semanas de preparación integral para completar tu primer 70.3 o mejorar tu marca. Las tres disciplinas integradas con trabajo de transiciones.",
        features: [
            "Natación + Ciclismo + Running",
            "Transiciones T1 y T2",
            "Nutrición e hidratación en carrera",
            "Soporte 5 días / semana",
            "Análisis de carga semanal (TSS)"
        ],
        highlight: true, // Activa la tarjeta premium y su badge superior
        btnText: "Empezar ahora"
    },
    {
        id: "svc-larga",
        iconClass: "bi bi-trophy-fill",
        iconModifier: "svc-card__icon--alt",
        tag: "Full · Larga distancia",
        titulo: "Preparación<br />Larga Distancia",
        desc: "El programa más exigente y completo. Cruzar la meta de una larga distancia requiere planificación anual, experiencia real y acompañamiento permanente.",
        features: [
            "Plan de 28 a 36 semanas",
            "Estrategia de carrera personalizada",
            "Nutrición + hidratación completa",
            "Soporte directo 7 días / semana"
        ],
        highlight: false,
        btnText: "Consultar"
    }
];

// En js/data.js
export const galeriaData = [
    { src: "img/Principal.jpeg", alt: "Atleta cruzando la meta en triatlón", clase: "galeria__item--wide", caption: "Triatlón · Llegada a meta" },
    { src: "img/galeria/corredor.png", alt: "Corredor en maratón", clase: "", caption: "Running · Maratón" },
    { src: "img/galeria/ciclismo1.jpeg", alt: "Ciclista en carrera", clase: "", caption: "Ciclismo · Gran Fondo" },
    { src: "img/galeria/pileta.jpg", alt: "Nadadores en pileta", clase: "", caption: "Alumnos · Pileta técnica" },
    { src: "img/galeria/aguas_abiertas.jpeg", alt: "Grupo nadando en lago", clase: "", caption: "Aguas abiertas · Comunidad" },
    { src: "img/galeria/planificacion.jpg", alt: "Plan de entrenamiento", clase: "", caption: "Planificación" },
    { src: "img/galeria/equipamiento.jpg", alt: "Equipamiento de natación", clase: "", caption: "Equipamiento · Técnica" }
];