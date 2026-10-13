# Portafolio de Joan Esteban Lopez Narvaez

Sitio personal estilo Persona 3, en azul noche y cobre. HTML, CSS y JavaScript sin dependencias ni compilación: se sube tal cual a GitHub Pages.

## Estructura

```
index.html            estructura de la página
css/tokens.css        design tokens: colores, tipografía, espaciado, movimiento
css/base.css          reset, barra superior, botones, skeleton de carga, transición
css/home.css          inicio: menú inclinado y pistas de PCB
css/pages.css         acerca de mí, proyectos, ventana de proyecto, contacto
js/app.js             rutas, idioma, menú, ventana de proyecto
js/glyphs.js          dibujos de reemplazo para proyectos sin fotos
data/content.js       TODOS los textos (español e inglés), correo, LinkedIn, GitHub
data/projects.js      lista de proyectos
assets/fonts/         fuentes locales (Big Shoulders Display, Barlow, Barlow Condensed; licencia OFL)
assets/img/           tu foto
assets/projects/      fotos y PDFs de cada proyecto
```

## Publicar en GitHub Pages

1. Crea un repositorio. Si lo llamas `TanqueDev.github.io`, el sitio queda en `https://tanquedev.github.io`. Con cualquier otro nombre queda en `https://tanquedev.github.io/<nombre>`.
2. Sube todo el contenido de esta carpeta a la rama `main` (incluido el archivo `.nojekyll`).
3. En el repositorio: **Settings > Pages > Build and deployment > Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
4. En uno o dos minutos el sitio está en línea. Cada `git push` lo actualiza.

## Ver el sitio en tu computador

Abre `index.html` con doble clic, o mejor, desde la carpeta del proyecto:

```
python -m http.server 8000
```

y entra a `http://localhost:8000`.

## Tu foto

Hay dos versiones en `assets/img/`, hechas a partir de tu foto con el fondo negro recortado:

- `joan-persona.webp`: en azul y blanco con contorno blanco, estilo Persona. Va en el inicio.
- `joan.webp`: a color. Va en Acerca de mí, dentro del paralelogramo cobre.

Para cambiarla, reemplaza esos archivos (PNG o WebP con fondo transparente, vertical, de unos 1200 a 1500 px de alto) o cambia las rutas en `data/content.js`:

```js
photo: {
  src: "assets/img/joan.webp",
  hero: "assets/img/joan-persona.webp",
  cutout: true
}
```

Si la foto nueva no tiene el fondo recortado, pon `cutout: false` y se enmarca en un paralelogramo. Si una ruta no existe, aparece una silueta.

La cifra de la caja blanca de arriba a la izquierda (tu promedio) también se cambia en `data/content.js`, en `wallet`.

## Repositorios de GitHub

Al final de Proyectos aparece "En GitHub", que lee en vivo tus repositorios públicos de `github.com/TanqueDev` (sin forks ni archivados, máximo 8, primero los de más estrellas). No hay que configurar nada: cuando subas un repo, aparece solo. GitHub permite 60 consultas por hora por visitante y el sitio guarda la respuesta 10 minutos, así que no hay problema con el límite.

## Animaciones

El movimiento usa [anime.js](https://animejs.com/) v4, incluido en `js/vendor/` (licencia MIT): la entrada del menú con resorte, el salto del triángulo al elegir, el texto que se descifra abajo a la derecha y la entrada de los títulos. Si ese archivo falta, el sitio funciona igual con transiciones CSS.

## Agregar un proyecto

1. Crea una carpeta `assets/projects/<id>/` con tus fotos (JPG o PNG, horizontales se ven mejor) y, si tienes, el PDF.
2. En `data/projects.js` copia un bloque `{ ... }` y llénalo:

```js
{
  id: "fuente-buck",
  year: "2026",
  title:   { es: "Fuente buck síncrona", en: "Synchronous buck supply" },
  area:    { es: "Electrónica de potencia", en: "Power electronics" },
  context: { es: "Proyecto personal", en: "Personal project" },
  summary: { es: "Una frase para la lista.", en: "One line for the list." },
  body:    { es: "Descripción completa.\n\nOtro párrafo.", en: "Full description.\n\nAnother paragraph." },
  tools: ["KiCad", "STM32"],
  glyph: "boost",
  cover: "assets/projects/fuente-buck/portada.jpg",
  images: [
    "assets/projects/fuente-buck/pcb-frente.jpg",
    "assets/projects/fuente-buck/pcb-atras.jpg"
  ],
  pdf: "assets/projects/fuente-buck/informe.pdf",
  repo: "https://github.com/TanqueDev/fuente-buck"
}
```

- Todo lo que no tengas (fotos, PDF, repo) déjalo vacío (`[]` o `null`) y el botón correspondiente no aparece.
- `glyph` es el dibujo que se muestra si no hay fotos: `boost`, `inverter`, `control`, `eeg`, `vision`, `solar`, `farm` o `pcb`.
- El orden del arreglo es el orden en la lista.
- Cada proyecto tiene su propia dirección: `tusitio/#/projects/<id>`. Sirve para mandar un proyecto directo a alguien.

Campos extra que también puedes usar (todos opcionales, el detalle está al inicio de `data/projects.js`):

- **Fotos con pie y crédito:** en `images` cada foto puede ser un objeto `{ src, caption: { es, en }, credit: { author, license, licenseUrl, source } }`. El crédito se muestra debajo de la foto; úsalo siempre que la imagen no sea tuya.
- **Video:** `video: "NS07wASRO8Y"` (el id de YouTube) agrega la pestaña Video y un botón a YouTube.
- **Publicaciones:** `links: [{ label: { es, en }, url }]` muestra la lista "Publicación".
- **Derechos:** `rights: { es, en }` agrega un aviso de derechos al final.

Las imágenes de referencia de EEG, hidroponía y granja vertical vienen de Wikimedia Commons, con su autor y licencia citados en el sitio.

Los proyectos que vienen cargados salen de tu CV. Revisa sus descripciones y agrega detalles (valores de diseño, resultados, fotos) cuando los tengas.

## Cambiar textos o colores

- Textos en ambos idiomas: `data/content.js`.
- Colores: `css/tokens.css`. La jerarquía está en los tokens semánticos (`--bg`, `--text-cool`, `--accent`, `--highlight`); cambia los primitivos (`--night-*`, `--cyan-*`, `--copper-*`) y todo el sitio se ajusta.

## Navegación

- Inicio: flechas ↑ ↓ (o W / S) para elegir, Enter para entrar. También con el mouse o tocando.
- Dentro de una sección: Esc para volver al inicio.
- Proyectos: ↑ ↓ recorren la lista, Enter abre. En la ventana, ← → cambian de foto y Esc la cierra.
- El idioma se elige con ES / EN arriba a la derecha y se recuerda en ese navegador. La primera vez se toma el idioma del navegador.
