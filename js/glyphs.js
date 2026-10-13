/* Dibujos de reemplazo para proyectos sin fotos.
   Trazos en cian, el elemento protagonista en cobre (.cu). */
(function () {
  const wrap = (inner) =>
    `<svg class="glyph" viewBox="0 0 320 200" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  window.GLYPHS = {
    /* Convertidor boost: fuente, inductor, interruptor, diodo, condensador, carga */
    boost: wrap(`
      <g class="ln">
        <circle cx="48" cy="104" r="16"/><path d="M42 100h12M48 94v12M42 112h12" stroke-width="2"/>
        <path d="M48 88V58h34M48 120v34h232M152 58h28M210 58h70v18M280 128v26M240 58v32M240 102v52M166 58v34M166 120v34"/>
        <path d="M226 90h28M226 102h28"/>
        <path d="M280 76l9 6-18 10 18 10-18 10 18 10-9 6"/>
        <path d="M166 92l12 22"/>
        <path d="M180 46l22 12-22 12z"/><path d="M202 46v24"/>
      </g>
      <path class="cu" d="M82 58c0-16 17-16 17 0c0-16 17-16 17 0c0-16 17-16 17 0c0-16 17-16 17 0"/>
    `),

    /* Inversor: onda cuadrada, filtro LC, seno */
    inverter: wrap(`
      <g class="ln">
        <path d="M24 130h20V70h26v60h26V70h26v60h12"/>
        <path d="M136 100h10"/>
        <path d="M146 100c0-14 12-14 12 0c0-14 12-14 12 0c0-14 12-14 12 0"/>
        <path d="M182 100h12M194 100v14M184 114h20M184 122h20M194 122v16"/>
      </g>
      <path class="cu" d="M210 100c10-46 22-46 32 0s22 46 32 0s22-46 32 0"/>
    `),

    /* Lazo de control: sumador, C(z), G(z), realimentación */
    control: wrap(`
      <g class="ln">
        <path d="M20 90h40"/><circle cx="72" cy="90" r="12"/><path d="M66 90h12M72 84v12" stroke-width="2"/>
        <path d="M84 90h26"/>
        <rect x="200" y="66" width="70" height="48"/>
        <path d="M180 90h20M270 90h34M290 90v62H72v-50"/>
      </g>
      <rect class="cu" x="110" y="66" width="70" height="48"/>
      <text x="145" y="97" class="gtxt cu-fill" text-anchor="middle">C(z)</text>
      <text x="235" y="97" class="gtxt" text-anchor="middle">G(z)</text>
    `),

    /* Tres canales EEG, una ventana de análisis en cobre */
    eeg: wrap(`
      <g class="ln">
        <path d="M16 56l14-6 10 10 12-14 10 12 14-4 12 8 10-12 14 10 12-6 14 8 12-10 14 12 12-8 14 6 12-10 14 12 12-8 14 6 10-6 12 8 14-6 12 4"/>
        <path d="M16 104l12 6 12-12 14 10 10-6 14 12 12-14 12 8 14-4 12 10 14-12 12 6 14-4 10 10 14-8 12 4 14-10 12 12 12-6 14 4 12-8 14 6"/>
        <path d="M16 150l14-4 12 10 10-12 14 8 12-6 14 12 12-10 14 4 12-8 14 12 12-6 14-4 10 8 14-10 12 12 14-8 12 4 12-6 14 10 12-4"/>
      </g>
      <rect class="cu" x="132" y="28" width="66" height="148" stroke-dasharray="6 6"/>
    `),

    /* Visión: hoja dentro de un recuadro de detección */
    vision: wrap(`
      <g class="ln">
        <path d="M40 40h30M40 40v30M280 40h-30M280 40v30M40 160h30M40 160v-30M280 160h-30M280 160v-30"/>
        <path d="M120 140c-6-46 30-84 92-90c-2 58-38 96-92 90z"/><path d="M120 140c22-28 46-50 76-74"/>
      </g>
      <rect class="cu" x="104" y="44" width="122" height="110"/>
      <path class="cu" d="M104 44h54v-16h-54z"/>
    `),

    /* Panel solar y sol */
    solar: wrap(`
      <g class="ln">
        <path d="M70 160l40-80h150l-40 80z"/>
        <path d="M120 80l-40 80M160 80l-40 80M200 80l-40 80M240 80l-40 80M90 120h150"/>
        <path d="M150 160v22M120 182h60"/>
      </g>
      <circle class="cu" cx="72" cy="52" r="18"/>
      <path class="cu" d="M72 22v-8M72 90v-8M42 52h-8M110 52h-8M51 31l-6-6M99 79l-6-6M93 31l6-6M45 79l6-6"/>
    `),

    /* Estantes con plantas, goteo y sensor */
    farm: wrap(`
      <g class="ln">
        <path d="M60 30v150M260 30v150M60 70h200M60 120h200M60 170h200"/>
        <path d="M100 70c-4-18 6-26 14-26c0 14-6 22-14 26zM100 70c6-12 16-14 24-10M160 70c-4-18 6-26 14-26c0 14-6 22-14 26zM220 70c-4-18 6-26 14-26c0 14-6 22-14 26z"/>
        <path d="M100 120c-4-18 6-26 14-26c0 14-6 22-14 26zM160 120c-4-18 6-26 14-26c0 14-6 22-14 26zM220 120c-4-18 6-26 14-26c0 14-6 22-14 26z"/>
      </g>
      <path class="cu" d="M60 22h200"/>
      <path class="cu" d="M100 28v6M160 28v6M220 28v6" stroke-dasharray="2 5"/>
      <rect class="cu" x="272" y="96" width="26" height="40"/><path class="cu" d="M260 116h12"/>
    `),

    /* Fragmento de PCB: integrado, pistas a 45° y vías */
    pcb: wrap(`
      <g class="ln">
        <rect x="120" y="60" width="80" height="80"/>
        <path d="M130 60v-12M146 60v-12M162 60v-12M178 60v-12M190 60v-12M130 152v-12M146 152v-12M162 152v-12M178 152v-12M190 152v-12"/>
        <path d="M146 48V30l14-14h80M130 152v18l-14 14H40M200 100h40l24-24h30"/>
        <circle cx="244" cy="16" r="5"/><circle cx="36" cy="184" r="5"/>
      </g>
      <path class="cu" d="M120 100H80L56 76H24M178 48V36l12-12h30M178 152v14l14 14h70"/>
      <circle class="cu" cx="20" cy="76" r="5"/><circle class="cu" cx="266" cy="180" r="5"/><circle class="cu" cx="224" cy="24" r="5"/>
    `)
  };
})();
