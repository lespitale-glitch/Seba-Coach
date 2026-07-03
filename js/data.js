/* ===================================================
   js/data.js — ARCHIVO EXCLUSIVO DE DATOS (MÓDULO)
=================================================== */

// Array de Testimonios
export const testimoniosData = [
    {
        nombre: "Juan Fernando",
        disciplina: "Triatlón",
        avatar: "img/testimonios/juan_fernando.png",
        estrellas: 5,
        highlight: false,
        cita: "Llegué a Sebastián con más miedos e impedimentos psicológicos que no me dejaban pasar de nivel. Gracias a su paciencia, enseñanza y su forma de ser, hizo que yo desbloqueara mi cabeza y ya haya hecho 4 triatlones en 4 meses, y ahora apuntando a mucho más.",
        logro: "Cuatro triatlones en cuatro meses"
    },
    {
        nombre: "Ximena",
        disciplina: "Triatlón 70.3 · Maratón",
        avatar: "img/testimonios/ximena.png",
        estrellas: 5,
        highlight: true,
        cita: "Vengo del hockey y empecé triatlón en diciembre de 2023. En pocos meses, Sebas logró ver en mí un potencial que yo todavía no podía imaginar. En abril de 2025 ya estaba cruzando la meta de mi primer Ironman 70.3 en San Juan. Más allá de su planificación profesional impecable, valoro muchísimo su capacidad para acompañar, motivar y sacar lo mejor de cada atleta.",
        logro: "Ironman 70.3 en San Juan"
    },
    {
        nombre: "Alan",
        disciplina: "Triatón",
        avatar: "img/testimonios/alan.png",
        estrellas: 5,
        highlight: false,
        cita: "Nos conocemos desde hace 20 años... Yo dejé de entrenar estos últimos 8 años y, cuando quise volver, no dudé en hablarle. porqué sabía que iba a respetar un proceso acorde y que, además de ser un gran entrenador, es una excelente persona.",
        logro: "Volvio al triatlón despues de mas de 10 años"
    },
    {
        nombre: "Nacho",
        disciplina: "Triatlón · 70.3",
        avatar: "img/testimonios/nacho.png",
        estrellas: 5,
        highlight: false,
        cita: "Sebastián está siempre pendiente del resultado de los entrenamientos; la consulta y el feedback son permanentes. El resultado es un programa que se adapta a tus necesidades y la seguridad de sentirte acompañado en el proceso.",
        logro: "Clasificación al Mundial de Niza 2026 - 2.º puesto en su categoría en el IRONMAN 70.3 Cap Cana"
    },
    {
        nombre: "Felipe",
        disciplina: "Triatlón · 70.3",
        avatar: "img/testimonios/felipe.png",
        estrellas: 5,
        highlight: false,
        cita: "Gran entrenador y gran persona. De manera súper responsable me llevó de la nada a completar dos 70.3 y tres olímpicos con pocos meses de entrenamiento. Los planes están buenos y, si hay alguna duda, Seba está siempre a mano respondiendo con toda su experiencia en deportes de resistencia.",
        logro: "dos 70.3 y tres olímpicos con pocos meses de entrenamiento"
    },
    {
        nombre: "Cristian",
        disciplina: "Natacion · Aguas abiertas",
        avatar: "img/testimonios/cristian.png",
        estrellas: 5,
        highlight: true,
        cita: "Mi nombre es Cristian Fernández, soy nadador de aguas abiertas y triatleta. [...] Entreno con Seba desde mediados de 2024 y, desde el principio, hubo muy buena comunicación y conexión. El trabajo que ha hecho Seba ha sido excelente; fui mejorando muchísimo con el correr del tiempo [...]. Siento que evolucioné muchísimo en todas las disciplinas, logrando bajar mis tiempos personales y obteniendo excelentes resultados. Hoy estoy preparando un gran reto: una travesía de 10 km de aguas abiertas [...] y también el gran objetivo del año: bajar las 5 horas en el Ironman 70.3 de Cozumel. ¡Muchas gracias, Seba! ¡Vamos por más!",
        logro: "Triatlón Olímpico - 3.º puesto Gral."
    },
    {
        nombre: "Lucas",
        disciplina: "Triatlón · 70.3",
        avatar: "img/testimonios/lucas.png",
        estrellas: 5,
        highlight: true,
        cita: "Entreno con Seba desde hace varios años y siempre logré alcanzar mis objetivos en carreras de calle y triatlones, mejorando año a año los tiempos y sin lesiones. Más allá de su gran predisposición y la calidad de los planes, lo que realmente lo distingue es su interés genuino por la persona detrás del atleta, entendiendo los tiempos y motivaciones de cada alumno para sacar su mejor versión.",
        logro: "Finisher IRONMAN 70.3"
    }
];

// Nuevo Array de Planes Premium Renovados (3 Pilares directos en Español)
export const planesData = [
    {
        id: "svc-natacion",
        iconClass: "bi-water",
        iconModifier: "", // Icono normal azul
        tag: "Técnica · Resistencia · Aguas Abiertas",
        titulo: "Plan Técnico de<br />Natación",
        desc: "Diseñado para nadadores de pileta o atletas de aguas abiertas que buscan perfeccionar su brazada, mejorar su eficiencia hidrodinámica y ganar confianza en distancias largas.",
        features: [
            "Análisis biomecánico inicial de brazada",
            "Entrenamientos estructurados de pileta y aguas abiertas",
            "Optimización de ritmos críticos (CSS)",
            "Monitoreo semanal mediante TrainingPeaks"
        ],
        highlight: false,
        btnText: "Consultar"
    },
    {
        id: "svc-triatlon",
        iconClass: "bi-diagram-3",
        iconModifier: "svc-card__icon--gold", // Mantiene el color rosa/dorado de acento para el plan estrella
        tag: "Sprint · Short · 70.3 · Full Ironman",
        titulo: "Preparación<br />Triatlón Integral",
        desc: "El programa insignia. Planificación unificada de las 3 disciplinas adaptada a tu zona de potencia, umbrales y tiempos disponibles, maximizando la asimilación del estímulo.",
        features: [
            "Natación, ciclismo y running integrados en un solo bloque",
            "Transiciones técnicas (T1/T2) y estrategia de carrera",
            "Gestión avanzada de carga acumulada (TSS)",
            "Soporte prioritario y análisis de rendimiento diario"
        ],
        highlight: true, // Activa la tarjeta premium y su de destaque visual
        btnText: "Empezar ahora"
    },
    {
        id: "svc-running",
        iconClass: "bi-lightning-charge",
        iconModifier: "", // Icono normal azul
        tag: "10K · Media Maratón · Maratón",
        titulo: "Performance<br />Running Plan",
        desc: "Pensado para corredores que quieren colgarse su primera medalla o pulverizar sus marcas personales en distancias de calle o trail, estructurando pasadas, fondos y fuerza.",
        features: [
            "Periodización inteligente basada en tus umbrales de ritmo",
            "Pasadas de pista, cuestas y fuerza específica",
            "Estrategia de ritmos milimétrica para el día de la carrera",
            "Análisis de datos de carrera en TrainingPeaks"
        ],
        highlight: false,
        btnText: "Consultar"
    }
];

// En js/data.js
export const galeriaData = [
    { src: "img/Principal.jpeg", alt: "Atleta cruzando la meta en triatlón", clase: "galeria__item--wide", caption: "Mundial · 70.3" },
    { src: "img/galeria/corredor.png", alt: "Corredor en maratón", clase: "", caption: "Triatlón · T1" },
    { src: "img/galeria/ciclismo1.jpeg", alt: "Ciclista en carrera", clase: "", caption: "70.3· San Juán" },
    { src: "img/galeria/pileta.jpg", alt: "Nadadores en pileta", clase: "", caption: "Alumnos · Pileta técnica" },
    { src: "img/galeria/aguas_abiertas.jpeg", alt: "Grupo nadando en lago", clase: "", caption: "Saliendo del agua · T1" },
    { src: "img/galeria/planificacion.jpg", alt: "Plan de entrenamiento", clase: "", caption: "Planificación" },
    { src: "img/galeria/equipamiento.jpg", alt: "Equipamiento de natación", clase: "", caption: "Equipamiento · Técnica" }
];