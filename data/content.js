/* =========================================================
   CONTENIDO DEL SITIO (ES / EN)
   Edita aquí tus textos. No hace falta tocar el HTML.
   ========================================================= */

window.SITE = {
  person: {
    name: "Joan Esteban Lopez Narvaez",
    first: "Joan",
    last: "Lopez",
    email: "joan.lopeznarvaez@gmail.com",
    linkedin: "https://www.linkedin.com/in/joan-esteban-lopez-narvaez-492543411/",
    linkedinLabel: "Joan Esteban Lopez Narvaez",
    github: "https://github.com/TanqueDev",
    githubLabel: "TanqueDev",
    /* Fotos
       src:    foto a color, con el fondo recortado (Acerca de mí)
       hero:   versión en azul y blanco con contorno, para el inicio
       cutout: true si las fotos tienen fondo transparente;
               false si es una foto normal (se enmarca en un paralelogramo) */
    photo: {
      src: "assets/img/joan.webp",
      hero: "assets/img/joan-persona.webp",
      cutout: true
    },
    /* La caja blanca de arriba a la izquierda del inicio muestra
       accesos directos a correo, LinkedIn y GitHub */
  },

  i18n: {
    /* ------------------------------------------------------ ES */
    es: {
      htmlLang: "es",
      docTitle: "Joan Lopez | Ingeniería Electrónica",
      metaDescription:
        "Portafolio de Joan Esteban Lopez Narvaez, estudiante de Ingeniería Electrónica en la Universidad del Valle. Electrónica de potencia, control, sistemas embebidos y PCB.",

      menu: { about: "Acerca de mí", projects: "Proyectos", contact: "Contacto" },
      menuDesc: {
        about: "Quién soy y qué he hecho",
        projects: "Placas, firmware y código",
        contact: "Escríbeme"
      },
      command: "Comando",
      wallet: { label: "Contacto directo", mail: "Correo" },
      hint: { move: "Elegir", enter: "Entrar", back: "Volver" },
      langLabel: "Idioma",

      hud: {
        days: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        parts: {
          dark: "Hora oscura",
          dawn: "Madrugada",
          morning: "Mañana",
          afternoon: "Tarde",
          evening: "Noche"
        }
      },

      idcard: {
        role: "Ingeniería Electrónica, Universidad del Valle",
        line: "Me gradúo en 2027"
      },

      about: {
        title: "Acerca de mí",
        lead:
          "Estudio Ingeniería Electrónica en la Universidad del Valle, en Cali, y me gradúo en 2027. Trabajo entre el hardware y los datos: diseño PCBs, escribo firmware para sistemas de adquisición y entreno modelos con señales reales.",
        body:
          "Hoy mi trabajo se mueve entre la electrónica de potencia, el control y las energías renovables. Diseño convertidores y sus lazos de control, y mi trabajo de grado va por esa línea. Lo siguiente es llevar todo eso a microrredes en un posgrado.",
        facts: [
          ["Universidad", "Universidad del Valle"],
          ["Programa", "Ingeniería Electrónica, 8.º semestre"],
          ["Promedio", "4.36 de 5.00"],
          ["Graduación", "2027"]
        ],
        pathTitle: "Trayectoria",
        path: [
          {
            when: "2026",
            role: "Vicepresidente",
            org: "Capítulo Estudiantil IEEE Circuits and Systems (CAS), Univalle",
            points: [
              "Coordino las actividades académicas del capítulo.",
              "Apoyé la organización y planeación del curso “PCB Design Workflow: Crea tu plataforma de desarrollo” (2026-I, 30 estudiantes): resolución de problemas, revisión de diseños y montaje físico de las placas."
            ]
          },
          {
            when: "2024 a hoy",
            role: "Integrante",
            org: "Semillero de Investigación ARES, Univalle",
            points: [
              "Modelo en Python que clasifica dos estados emocionales a partir de señales EEG, con extracción de características.",
              "Monitor de investigación en Nutriplanta: recolección y procesamiento de imágenes para el dataset e implementación de modelos de computación en el borde.",
              "Revisiones de literatura en IA, aprendizaje automático y procesamiento de señales, y una propuesta de investigación para monitorear variables agroclimáticas en cultivos de uva."
            ]
          },
          {
            when: "2022",
            role: "Investigador y desarrollador de sistemas embebidos",
            org: "SENA, prototipo fotovoltaico para lechuga hidropónica",
            points: [
              "Firmware de sensórica y adquisición electrónica de datos para seguir las condiciones del cultivo.",
              "Experimentos en entorno controlado para verificar las condiciones de producción del proveedor de semillas. Resultados presentados en ponencia."
            ]
          },
          {
            when: "2022",
            role: "Monitor de robótica, 120 horas",
            org: "SENA",
            points: [
              "Acompañé un curso de robótica de más de 20 estudiantes en electrónica práctica, programación y depuración."
            ]
          },
          {
            when: "2021",
            role: "Investigador y desarrollador de sistemas embebidos",
            org: "SENA, granja vertical de cilantro y perejil",
            points: [
              "Firmware y adquisición de temperatura, humedad relativa, humedad del suelo e intensidad lumínica.",
              "Integración de iluminación LED y riego por goteo. Revisión bibliográfica presentada en póster y resultados en ponencia."
            ]
          }
        ],
        eduTitle: "Formación",
        edu: [
          ["Universidad del Valle", "Ingeniería Electrónica", "2027"],
          ["SENA", "Técnico en Asistencia Administrativa, promedio 4.50", "2022"],
          ["Centro Educativo Senderitos y Sebastián de Belalcázar", "Técnico en Electrónica Analógica", "2020"]
        ],
        skillsTitle: "Con qué trabajo",
        advanced: "avanzado",
        basic: "básico",
        skills: [
          {
            group: "Control y simulación",
            items: [["MATLAB y Simulink", "adv"], ["Controladores PID"], ["Espacio de estados"], ["Identificación de plantas"], ["Proteus"]]
          },
          {
            group: "Sistemas embebidos",
            items: [["Arduino", "adv"], ["Microchip Studio", "adv"], ["STM32"], ["ESP32"], ["Raspberry Pi"], ["Firmware"]]
          },
          {
            group: "Diseño de hardware",
            items: [["KiCad"], ["Altium Designer"], ["Diseño de PCB"], ["Instrumentación y metrología"], ["Adquisición de datos"]]
          },
          {
            group: "Programación y datos",
            items: [["Python"], ["NumPy, Pandas, Matplotlib"], ["TensorFlow y TF Lite"], ["NeuroKit"], ["C++"], ["Verilog"], ["CUDA", "basic"]]
          },
          {
            group: "IA y señales",
            items: [["Aprendizaje automático"], ["Redes convolucionales"], ["Clasificación de señales"], ["EEG"]]
          },
          {
            group: "Herramientas",
            items: [["Git y GitHub"], ["Jira"], ["Linux"]]
          }
        ],
        awardTitle: "Reconocimientos",
        award: "Estímulo Académico, Universidad del Valle",
        awardNote: "Cinco semestres seguidos",
        awardTerms: ["2024-I", "2024-II", "2025-I", "2025-II", "2026-I"],
        langTitle: "Idiomas",
        langs: [
          ["Español", "Nativo", 5],
          ["Inglés", "Avanzado", 4],
          ["Francés", "Básico", 2]
        ]
      },

      projects: {
        title: "Proyectos",
        intro: "Placas, firmware, control e investigación. Elige uno para ver fotos, video, publicaciones y código.",
        open: "Ver proyecto",
        repo: "Ver código en GitHub",
        pdf: "Abrir PDF",
        tabPhotos: "Fotos",
        tabDoc: "Documento",
        noPhotos: "Este proyecto todavía no tiene fotos.",
        tools: "Herramientas",
        close: "Cerrar",
        prev: "Anterior",
        next: "Siguiente",
        empty: "Aún no hay proyectos cargados. Agrégalos en data/projects.js.",
        ghTitle: "En GitHub",
        ghRepos: (n) => (n === 1 ? "1 repositorio público" : `${n} repositorios públicos`),
        ghStars: "estrellas",
        ghUpdated: "Actualizado",
        ghEmpty: "Todavía no hay repositorios públicos.",
        ghError: "No se pudieron cargar los repositorios en este momento.",
        ghVisit: "Verlos en GitHub",
        ghNoDesc: "Sin descripción.",
        tabVideo: "Video",
        video: "Ver video en YouTube",
        links: "Publicación",
        photo: "Foto",
        via: "vía Wikimedia Commons"
      },

      contact: {
        title: "Contacto",
        lead: "La forma más rápida de hablar conmigo es por correo. Respondo en español o en inglés.",
        mail: "Correo",
        copy: "Copiar",
        copied: "Copiado",
        linkedin: "LinkedIn",
        github: "GitHub",
        where: "Cali, Colombia. Hora de Colombia (UTC−5)."
      },

      notFound: "Esa sección no existe. Volviendo al inicio."
    },

    /* ------------------------------------------------------ EN */
    en: {
      htmlLang: "en",
      docTitle: "Joan Lopez | Electronic Engineering",
      metaDescription:
        "Portfolio of Joan Esteban Lopez Narvaez, Electronic Engineering student at Universidad del Valle. Power electronics, control, embedded systems and PCB design.",

      menu: { about: "About me", projects: "Projects", contact: "Contact" },
      menuDesc: {
        about: "Who I am and what I've done",
        projects: "Boards, firmware and code",
        contact: "Write to me"
      },
      command: "Command",
      wallet: { label: "Reach me", mail: "Email" },
      hint: { move: "Select", enter: "Enter", back: "Back" },
      langLabel: "Language",

      hud: {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        parts: {
          dark: "Dark hour",
          dawn: "Late night",
          morning: "Morning",
          afternoon: "Afternoon",
          evening: "Evening"
        }
      },

      idcard: {
        role: "Electronic Engineering, Universidad del Valle",
        line: "Graduating in 2027"
      },

      about: {
        title: "About me",
        lead:
          "I study Electronic Engineering at Universidad del Valle in Cali, Colombia, and graduate in 2027. I work between hardware and data: I design PCBs, write firmware for data acquisition systems and train models on real signals.",
        body:
          "Right now my work sits between power electronics, control and renewable energy. I design converters and their control loops, and my undergraduate thesis is heading the same way. Next, I want to bring all of that to microgrids through graduate study.",
        facts: [
          ["University", "Universidad del Valle"],
          ["Program", "B.S. Electronic Engineering, 8th semester"],
          ["GPA", "4.36 out of 5.00"],
          ["Graduation", "2027"]
        ],
        pathTitle: "Experience",
        path: [
          {
            when: "2026",
            role: "Vice Chair",
            org: "IEEE Circuits and Systems (CAS) Student Chapter, Universidad del Valle",
            points: [
              "I coordinate the chapter's academic activities.",
              "Helped organize and plan the course “PCB Design Workflow” (2026-I, 30 students): troubleshooting, design reviews and physical assembly of the boards."
            ]
          },
          {
            when: "2024 to now",
            role: "Member",
            org: "ARES Research Group, Universidad del Valle",
            points: [
              "Python model that classifies two emotional states from EEG signals, including feature extraction.",
              "Research assistant on Nutriplanta: image collection and processing for the dataset, and edge computing models.",
              "Literature reviews in AI, machine learning and signal processing, plus a research proposal on agroclimatic monitoring for grape crops."
            ]
          },
          {
            when: "2022",
            role: "Researcher and embedded systems developer",
            org: "SENA, photovoltaic prototype for hydroponic lettuce",
            points: [
              "Firmware for the sensing system and electronic data acquisition to track crop conditions.",
              "Controlled environment experiments to verify the seed supplier's production conditions. Results presented at an academic conference."
            ]
          },
          {
            when: "2022",
            role: "Robotics teaching assistant, 120 hours",
            org: "SENA",
            points: [
              "Supported a robotics course of 20+ students in hands-on electronics, programming and troubleshooting."
            ]
          },
          {
            when: "2021",
            role: "Researcher and embedded systems developer",
            org: "SENA, vertical farm for coriander and parsley",
            points: [
              "Firmware and acquisition of temperature, relative humidity, soil moisture and light intensity.",
              "Integrated LED lighting and drip irrigation. Literature review presented as a poster and results at a conference."
            ]
          }
        ],
        eduTitle: "Education",
        edu: [
          ["Universidad del Valle", "B.S. Electronic Engineering", "2027"],
          ["SENA", "Technical degree in Administrative Assistance, GPA 4.50", "2022"],
          ["Centro Educativo Senderitos y Sebastián de Belalcázar", "Technical degree in Analog Electronics", "2020"]
        ],
        skillsTitle: "What I work with",
        advanced: "advanced",
        basic: "basic",
        skills: [
          {
            group: "Control and simulation",
            items: [["MATLAB and Simulink", "adv"], ["PID controllers"], ["State space"], ["Plant identification"], ["Proteus"]]
          },
          {
            group: "Embedded systems",
            items: [["Arduino", "adv"], ["Microchip Studio", "adv"], ["STM32"], ["ESP32"], ["Raspberry Pi"], ["Firmware"]]
          },
          {
            group: "Hardware design",
            items: [["KiCad"], ["Altium Designer"], ["PCB design"], ["Instrumentation and metrology"], ["Data acquisition"]]
          },
          {
            group: "Programming and data",
            items: [["Python"], ["NumPy, Pandas, Matplotlib"], ["TensorFlow and TF Lite"], ["NeuroKit"], ["C++"], ["Verilog"], ["CUDA", "basic"]]
          },
          {
            group: "AI and signals",
            items: [["Machine learning"], ["Convolutional networks"], ["Signal classification"], ["EEG"]]
          },
          {
            group: "Tools",
            items: [["Git and GitHub"], ["Jira"], ["Linux"]]
          }
        ],
        awardTitle: "Recognition",
        award: "Academic Incentive Award, Universidad del Valle",
        awardNote: "Five semesters in a row",
        awardTerms: ["2024-I", "2024-II", "2025-I", "2025-II", "2026-I"],
        langTitle: "Languages",
        langs: [
          ["Spanish", "Native", 5],
          ["English", "Advanced", 4],
          ["French", "Basic", 2]
        ]
      },

      projects: {
        title: "Projects",
        intro: "Boards, firmware, control and research. Pick one to see photos, video, publications and code.",
        open: "View project",
        repo: "View code on GitHub",
        pdf: "Open PDF",
        tabPhotos: "Photos",
        tabDoc: "Document",
        noPhotos: "No photos for this project yet.",
        tools: "Tools",
        close: "Close",
        prev: "Previous",
        next: "Next",
        empty: "No projects loaded yet. Add them in data/projects.js.",
        ghTitle: "On GitHub",
        ghRepos: (n) => (n === 1 ? "1 public repository" : `${n} public repositories`),
        ghStars: "stars",
        ghUpdated: "Updated",
        ghEmpty: "No public repositories yet.",
        ghError: "The repositories couldn't be loaded right now.",
        ghVisit: "See them on GitHub",
        ghNoDesc: "No description.",
        tabVideo: "Video",
        video: "Watch on YouTube",
        links: "Publication",
        photo: "Photo",
        via: "via Wikimedia Commons"
      },

      contact: {
        title: "Contact",
        lead: "Email is the fastest way to reach me. I reply in English or Spanish.",
        mail: "Email",
        copy: "Copy",
        copied: "Copied",
        linkedin: "LinkedIn",
        github: "GitHub",
        where: "Cali, Colombia. Colombia time (UTC−5)."
      },

      notFound: "That section doesn't exist. Going back to the start."
    }
  }
};
