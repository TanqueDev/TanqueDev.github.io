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



## Animaciones

El movimiento usa [anime.js](https://animejs.com/) v4, incluido en `js/vendor/` (licencia MIT): la entrada del menú con resorte, el salto del triángulo al elegir, el texto que se descifra abajo a la derecha y la entrada de los títulos. Si ese archivo falta, el sitio funciona igual con transiciones CSS.


