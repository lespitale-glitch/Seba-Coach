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
        nombre: "Alan",
        disciplina: "Natación · Aguas abiertas",
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
        logro: "Clasificacion mundial Nisa 2026 - "
    },
    {
        nombre: "Felipe",
        disciplina: "Ciclismo · Gran Fondo",
        avatar: "img/testimonios/felipe.png",
        estrellas: 5,
        highlight: false,
        cita: "Gran entrenador y gran persona. De manera súper responsable me llevó de la nada a completar dos 70.3 y tres olímpicos con pocos meses de entrenamiento. Los planes están buenos y, si hay alguna duda, Seba está siempre a mano respondiendo con toda su experiencia en deportes de resistencia.",
        logro: "Gran Fondo 180K · Mendoza — Octubre 2024"
    },
    {
        nombre: "Cristian",
        disciplina: "Natacion · Aguas abiertas",
        avatar: "img/testimonios/cristian.png",
        estrellas: 5,
        highlight: true,
        cita: "Mi nombre es Cristian Fernández, soy nadador de aguas abiertas y triatleta. [...] Entreno con Seba desde mediados de 2024 y, desde el principio, hubo muy buena comunicación y conexión. El trabajo que ha hecho Seba ha sido excelente; fui mejorando muchísimo con el correr del tiempo [...]. Siento que evolucioné muchísimo en todas las disciplinas, logrando bajar mis tiempos personales y obteniendo excelentes resultados. Hoy estoy preparando un gran reto: una travesía de 10 km de aguas abiertas [...] y también el gran objetivo del año: bajar las 5 horas en el Ironman 70.3 de Cozumel. ¡Muchas gracias, Seba! ¡Vamos por más!",
        logro: "1ra media maratón 2h04 · Buenos Aires — Agosto 2024"
    },
    {
        nombre: "Lucas",
        disciplina: "Running · Media maratón",
        avatar: "img/testimonios/lucas.png",
        estrellas: 5,
        highlight: true,
        cita: "Entreno con Seba desde hace varios años y siempre logré alcanzar mis objetivos en carreras de calle y triatlones, mejorando año a año los tiempos y sin lesiones. Más allá de su gran predisposición y la calidad de los planes, lo que realmente lo distingue es su interés genuino por la persona detrás del atleta, entendiendo los tiempos y motivaciones de cada alumno para sacar su mejor versión.",
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
            "Un deporte a elección",
            "12 semanas de base aeróbica",
            "1 o 2 disciplinas a elección",
            "Análisis técnico inicial",
            "TrainingPeaks"
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
            "Orientación en nutrición e hidratación en carrera",
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