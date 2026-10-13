/* =========================================================
   PROYECTOS
   Para agregar uno, copia un bloque { ... } y cambia los campos.

   id        texto corto sin espacios; también es la URL (#/projects/<id>)
   title     { es, en }
   area      { es, en }  categoría corta
   context   { es, en }  curso, grupo o lugar
   year      "2025" (opcional)
   summary   { es, en }  una frase, se ve en la lista
   body      { es, en }  descripción completa; separa párrafos con una línea en blanco (\n\n)
   tools     ["KiCad", "STM32"]                        (opcional)
   glyph     dibujo de reemplazo mientras no hay fotos:
             "boost" | "inverter" | "control" | "eeg" | "vision" | "solar" | "farm" | "pcb"
   cover     imagen de la lista (opcional; si no, se usa la primera foto)
   images    fotos de la galería. Cada una puede ser solo la ruta:
               "assets/projects/<id>/1.webp"
             o un objeto con pie de foto y crédito (para imágenes de terceros):
               { src: "...", caption: { es, en },
                 credit: { author, license, licenseUrl, source } }
   video     id de YouTube, por ejemplo "NS07wASRO8Y"   (opcional)
   pdf       "assets/projects/<id>/informe.pdf"         (opcional)
   repo      "https://github.com/TanqueDev/<repo>"      (opcional)
   links     publicaciones o enlaces extra:
               [{ label: { es, en }, url: "https://..." }]  (opcional)
   rights    { es, en } aviso de derechos (opcional)
   ========================================================= */

window.PROJECTS = [
  {
    id: "inversor-lc",
    title: { es: "Inversor DC/AC con filtro LC", en: "DC/AC inverter with LC filter" },
    area: { es: "Electrónica de potencia", en: "Power electronics" },
    context: { es: "Curso de Electrónica de Potencia, Univalle", en: "Power Electronics course, Universidad del Valle" },
    summary: {
      es: "Inversor con filtro LC a la salida, con simulación y video explicativo.",
      en: "An inverter with an LC output filter, with simulation and a walkthrough video."
    },
    body: {
      es: "Diseño de un inversor DC/AC con filtro LC de salida, como proyecto del curso de Electrónica de Potencia. En la simulación se ven la señal moduladora senoidal, los pulsos de conmutación PWM y la tensión de salida ya filtrada, una senoidal de 60 Hz.\n\nEn el video explico el diseño y los resultados.",
      en: "Design of a DC/AC inverter with an LC output filter, built for the Power Electronics course. The simulation shows the sinusoidal modulating signal, the PWM switching pulses and the filtered output voltage, a 60 Hz sine wave.\n\nThe video walks through the design and the results."
    },
    tools: ["MATLAB", "Simulink"],
    glyph: "inverter",
    images: [
      {
        src: "assets/projects/inversor-lc/simulacion.webp",
        caption: {
          es: "Simulación: moduladora senoidal, pulsos PWM y tensión de salida filtrada.",
          en: "Simulation: sinusoidal modulating signal, PWM pulses and filtered output voltage."
        }
      }
    ],
    video: "NS07wASRO8Y",
    pdf: null,
    repo: null
  },
  {
    id: "boost-pi",
    title: { es: "Convertidor elevador DC/DC con control PI", en: "DC/DC boost converter with PI control" },
    area: { es: "Electrónica de potencia", en: "Power electronics" },
    context: { es: "Curso de Electrónica de Potencia, Univalle", en: "Power Electronics course, Universidad del Valle" },
    summary: {
      es: "Convertidor boost con su lazo de control PI cerrado.",
      en: "A boost converter with a closed-loop PI controller."
    },
    body: {
      es: "Diseño de un convertidor DC/DC elevador (boost) y de su controlador PI en lazo cerrado, como proyecto del curso de Electrónica de Potencia.",
      en: "Design of a DC/DC boost converter and its closed-loop PI controller, built for the Power Electronics course."
    },
    tools: [],
    glyph: "boost",
    images: [],
    pdf: null,
    repo: null
  },
  {
    id: "planta-pi",
    title: { es: "Control PI de una planta física", en: "PI control of a physical plant" },
    area: { es: "Control", en: "Control" },
    context: { es: "Curso Proyecto de Ingeniería, Univalle", en: "Engineering Project course, Universidad del Valle" },
    summary: {
      es: "Modelo identificado con 88 % de exactitud y un PI en Simulink validado sobre la planta real.",
      en: "A plant model identified with 88% accuracy and a Simulink PI controller validated on the real plant."
    },
    body: {
      es: "Identifiqué un modelo discreto de la planta con un 88 % de exactitud y, a partir de él, diseñé un controlador PI que validé sobre la planta real: un módulo de proceso Armfield PCT-9 del laboratorio.\n\nEl controlador se implementó en Simulink, y la comunicación con el actuador real se hizo con una tarjeta NI myDAQ.",
      en: "I identified a discrete-time model of the plant with 88% accuracy and used it to design a PI controller that I validated on the real plant: an Armfield PCT-9 process module in the lab.\n\nThe controller was implemented in Simulink, and an NI myDAQ board handled communication with the real actuator."
    },
    tools: ["MATLAB", "Simulink", "NI myDAQ"],
    glyph: "control",
    images: [
      {
        src: "assets/projects/planta-pi/planta-pct9.webp",
        caption: {
          es: "La planta: módulo de proceso Armfield PCT-9 del laboratorio.",
          en: "The plant: an Armfield PCT-9 process module in the lab."
        }
      },
      {
        src: "assets/projects/planta-pi/simulink.webp",
        caption: {
          es: "Lazo de control en Simulink.",
          en: "The control loop in Simulink."
        }
      }
    ],
    pdf: null,
    repo: null
  },
  {
    id: "ecg-random-forest",
    title: { es: "Detección de enfermedades cardiacas con ECG", en: "Heart disease detection from ECG" },
    area: { es: "Señales e IA", en: "Signals and AI" },
    context: { es: "Curso de Procesamiento Digital de Señales, Univalle", en: "Digital Signal Processing course, Universidad del Valle" },
    summary: {
      es: "Filtrado digital de ECG y un random forest que detecta taquicardia, bradicardia e infarto.",
      en: "Digital ECG filtering and a random forest that detects tachycardia, bradycardia and infarction."
    },
    body: {
      es: "Proyecto del curso de Procesamiento Digital de Señales. Se aplicó procesamiento y filtrado digital a una base de datos de electrocardiogramas de pacientes con enfermedades cardiacas, y de cada señal se extrajeron características como la frecuencia cardiaca, la duración del complejo QRS y los intervalos PR y QT.\n\nCon esas características se entrenó un modelo random forest que clasifica cuatro clases: normal, taquicardia, bradicardia e infarto de miocardio. Todo se desarrolló en Python, incluida la interfaz que muestra las características, el diagnóstico con la probabilidad de cada clase y las métricas del modelo (F1 macro de 0.78 con el conjunto balanceado).",
      en: "A project for the Digital Signal Processing course. Digital processing and filtering were applied to a database of electrocardiograms from patients with heart disease, and features such as heart rate, QRS duration and PR and QT intervals were extracted from each signal.\n\nThose features trained a random forest model that classifies four classes: normal, tachycardia, bradycardia and myocardial infarction. Everything was built in Python, including the interface that shows the features, the diagnosis with each class probability and the model metrics (macro F1 of 0.78 on the balanced dataset)."
    },
    tools: ["Python"],
    glyph: "eeg",
    images: [
      {
        src: "assets/projects/ecg-random-forest/clasificacion.webp",
        caption: {
          es: "Características extraídas de un ECG y resultado de la clasificación.",
          en: "Features extracted from an ECG and the classification result."
        }
      },
      {
        src: "assets/projects/ecg-random-forest/metricas.webp",
        caption: {
          es: "Matriz de confusión y métricas del modelo.",
          en: "Confusion matrix and model metrics."
        }
      }
    ],
    pdf: null,
    repo: null
  },
  {
    id: "pcb-workflow",
    year: "2026",
    title: { es: "Curso PCB Design Workflow", en: "PCB Design Workflow course" },
    area: { es: "Formación", en: "Training" },
    context: { es: "Capítulo Estudiantil IEEE CAS, Univalle", en: "IEEE CAS Student Chapter, Universidad del Valle" },
    summary: {
      es: "Apoyé la organización, la revisión de diseños y el montaje de un curso de PCB para 30 estudiantes.",
      en: "I helped organize a PCB course for 30 students, review designs and assemble the boards."
    },
    body: {
      es: "Participé en la organización y planeación del curso “PCB Design Workflow: Crea tu plataforma de desarrollo”, que tomaron 30 estudiantes en 2026-I. Durante el curso ayudé a resolver problemas, revisé los diseños de los participantes y apoyé la implementación física de las placas, incluida la soldadura.",
      en: "I helped organize and plan the course “PCB Design Workflow: Build your own development board”, taken by 30 students in 2026-I. During the course I helped solve problems, reviewed participants' designs and supported the physical build of the boards, including soldering."
    },
    tools: [],
    glyph: "pcb",
    images: [
      {
        src: "assets/projects/pcb-workflow/placa.webp",
        caption: {
          es: "Placa de desarrollo STK 500 del curso.",
          en: "The course's STK 500 development board."
        }
      }
    ],
    rights: {
      es: "El curso se desarrolló gracias al Capítulo IEEE CAS y a la Universidad del Valle. Todos los derechos reservados a ellos.",
      en: "The course was made possible by the IEEE CAS chapter and Universidad del Valle. All rights reserved to them."
    },
    pdf: null,
    repo: null
  },
  {
    id: "eeg-emociones",
    year: "2024",
    title: { es: "Clasificación de emociones con EEG", en: "Emotion classification from EEG" },
    area: { es: "Señales e IA", en: "Signals and AI" },
    context: { es: "Semillero de Investigación ARES", en: "ARES Research Group" },
    summary: {
      es: "Modelo en Python que distingue dos estados emocionales en señales EEG.",
      en: "A Python model that tells two emotional states apart in EEG signals."
    },
    body: {
      es: "Modelo en Python que clasifica dos estados emocionales a partir de señales EEG. Incluye el procesamiento de la señal y la extracción de características.",
      en: "A Python model that classifies two emotional states from EEG signals, including signal processing and feature extraction."
    },
    tools: ["Python", "NeuroKit"],
    glyph: "eeg",
    images: [
      {
        src: "assets/projects/eeg-emociones/eeg-cap.webp",
        caption: {
          es: "Imagen de referencia: gorro de electrodos para registrar EEG.",
          en: "Reference image: an electrode cap for EEG recording."
        },
        credit: {
          author: "Chris Hope",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
          source: "https://commons.wikimedia.org/wiki/File:EEG_Recording_Cap.jpg"
        }
      }
    ],
    pdf: null,
    repo: null
  },
  {
    id: "nutriplanta",
    title: { es: "Nutriplanta: imágenes y modelos en el borde", en: "Nutriplanta: images and edge models" },
    area: { es: "Señales e IA", en: "Signals and AI" },
    context: { es: "Monitoría de investigación, Univalle", en: "Research assistantship, Universidad del Valle" },
    summary: {
      es: "Conjunto de imágenes de hojas y modelos para computación en el borde.",
      en: "A leaf image dataset and models for edge computing."
    },
    body: {
      es: "Monitoría de investigación en el proyecto Nutriplanta de la Universidad del Valle. Recolecté y procesé imágenes para construir la base de datos e implementé modelos para computación en el borde.",
      en: "Research assistantship on the Nutriplanta project at Universidad del Valle. I collected and processed images to build the dataset and implemented models for edge computing."
    },
    tools: [],
    glyph: "vision",
    images: [
      {
        src: "assets/projects/nutriplanta/hoja.webp",
        caption: {
          es: "Hoja de vid, una de las imágenes del conjunto de datos.",
          en: "A grapevine leaf, one of the images in the dataset."
        }
      }
    ],
    pdf: null,
    repo: null
  },
  {
    id: "fv-hidroponia",
    year: "2022",
    title: { es: "Sistema fotovoltaico para lechuga hidropónica", en: "Photovoltaic system for hydroponic lettuce" },
    area: { es: "Sistemas embebidos", en: "Embedded systems" },
    context: { es: "SENA", en: "SENA" },
    summary: {
      es: "Prototipo solar con firmware de sensórica y adquisición de datos.",
      en: "A solar-powered prototype with sensing firmware and data acquisition."
    },
    body: {
      es: "Prototipo de sistema fotovoltaico para producir lechuga hidropónica. Desarrollé el firmware de sensórica y la adquisición electrónica de datos, y corrimos experimentos en entorno controlado para verificar las condiciones del proveedor de semillas.\n\nLos resultados se presentaron como ponencia en el II Simposio de Innovación e Investigación en Ciencias Básicas y Aplicadas del SENA (2022).",
      en: "A photovoltaic system prototype for hydroponic lettuce production. I developed the sensing firmware and electronic data acquisition, and we ran controlled environment experiments to verify the seed supplier's conditions.\n\nThe results were presented at SENA's 2nd Symposium on Innovation and Research in Basic and Applied Sciences (2022)."
    },
    tools: [],
    glyph: "solar",
    images: [
      {
        src: "assets/projects/fv-hidroponia/hidroponia.webp",
        caption: {
          es: "Imagen de referencia: cultivo hidropónico de lechuga.",
          en: "Reference image: hydroponic lettuce."
        },
        credit: {
          author: "Preston Keres, USDA",
          license: "Dominio público",
          licenseEn: "Public domain",
          source: "https://commons.wikimedia.org/wiki/File:Hydroponic_farming,_USA_(9386).jpg"
        }
      }
    ],
    links: [
      {
        label: {
          es: "Memorias del II Simposio de Innovación e Investigación en Ciencias Básicas y Aplicadas (SENA, 2022)",
          en: "Proceedings of the 2nd Symposium on Innovation and Research in Basic and Applied Sciences (SENA, 2022)"
        },
        url: "https://repositorio.sena.edu.co/handle/11404/8338"
      }
    ],
    pdf: null,
    repo: null
  },
  {
    id: "granja-vertical",
    year: "2021",
    title: { es: "Granja vertical con monitoreo agroclimático", en: "Vertical farm with agroclimatic monitoring" },
    area: { es: "Sistemas embebidos", en: "Embedded systems" },
    context: { es: "SENA", en: "SENA" },
    summary: {
      es: "Cilantro y perejil con sensores, iluminación LED y riego por goteo.",
      en: "Coriander and parsley with sensors, LED lighting and drip irrigation."
    },
    body: {
      es: "Granja vertical para cultivar cilantro y perejil en Cali. Desarrollé el firmware y la adquisición de temperatura, humedad relativa, humedad del suelo e intensidad lumínica, e integré iluminación LED y riego por goteo en el prototipo.\n\nLa revisión bibliográfica se presentó como póster y los resultados como ponencia en el Simposio de Innovación e Investigación en Ciencias Básicas y Aplicadas del SENA (2021).",
      en: "A vertical farm for growing coriander and parsley in Cali. I developed the firmware and acquisition of temperature, relative humidity, soil moisture and light intensity, and integrated LED lighting and drip irrigation into the prototype.\n\nThe literature review was presented as a poster and the results as a talk at SENA's Symposium on Innovation and Research in Basic and Applied Sciences (2021)."
    },
    tools: [],
    glyph: "farm",
    images: [
      {
        src: "assets/projects/granja-vertical/granja-vertical.webp",
        caption: {
          es: "Imagen de referencia: granja vertical con iluminación LED.",
          en: "Reference image: a vertical farm with LED lighting."
        },
        credit: {
          author: "ifarm.fi",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
          source: "https://commons.wikimedia.org/wiki/File:IFarm.fi_Vertical_farm_Finland.jpg"
        }
      }
    ],
    links: [
      {
        label: {
          es: "Memorias del Simposio de Innovación e Investigación en Ciencias Básicas y Aplicadas (SENA, 2021)",
          en: "Proceedings of the Symposium on Innovation and Research in Basic and Applied Sciences (SENA, 2021)"
        },
        url: "https://repositorio.sena.edu.co/handle/11404/8541"
      }
    ],
    pdf: null,
    repo: null
  }
];
