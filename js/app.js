/* =========================================================
   Portafolio de Joan Lopez
   Sin dependencias ni compilación: se publica tal cual en GitHub Pages.
   ========================================================= */
(function () {
  "use strict";

  const SITE = window.SITE;
  const PROJECTS = window.PROJECTS || [];
  const GLYPHS = window.GLYPHS || {};
  const P = SITE.person;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const isNarrow = () => window.matchMedia("(max-width: 760px)").matches;

  /* anime.js (opcional): si no carga, todo funciona con las transiciones CSS */
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const A = window.anime && !reduced ? window.anime : null;
  if (A) document.documentElement.classList.add("has-anime");
  const springy = A ? A.createSpring({ stiffness: 260, damping: 16 }) : null;

  /* ---------------------------------------------------------
     Estado
     --------------------------------------------------------- */
  const ROUTES = ["about", "projects", "contact"];
  const state = {
    lang: "es",
    route: "home",
    menuIndex: 0,
    projIndex: 0,
    openProject: null,
    galleryIndex: 0,
    ready: false,
    busy: false
  };

  /* ---------------------------------------------------------
     Idioma
     --------------------------------------------------------- */
  function storedLang() {
    try { return localStorage.getItem("jl-lang"); } catch (e) { return null; }
  }
  function saveLang(l) {
    try { localStorage.setItem("jl-lang", l); } catch (e) { /* sin almacenamiento */ }
  }
  function initialLang() {
    const s = storedLang();
    if (s === "es" || s === "en") return s;
    return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  }
  const T = () => SITE.i18n[state.lang];
  function t(path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), T());
  }
  const L = (obj) => (obj && typeof obj === "object" ? obj[state.lang] ?? obj.es : obj);

  function applyLang() {
    const tr = T();
    document.documentElement.lang = tr.htmlLang;
    const md = $('meta[name="description"]');
    if (md) md.setAttribute("content", tr.metaDescription);
    $$("[data-t]").forEach((el) => { el.textContent = t(el.dataset.t); });
    $$("[data-t-attr]").forEach((el) => {
      const [attr, key] = el.dataset.tAttr.split(":");
      el.setAttribute(attr, t(key));
    });
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang)));

    const wm = $("#w-mail"), wl = $("#w-linkedin"), wg = $("#w-github");
    if (wm) { wm.href = "mailto:" + P.email; wm.title = P.email; wm.setAttribute("aria-label", t("wallet.mail")); }
    if (wl) { wl.href = P.linkedin; wl.setAttribute("aria-label", "LinkedIn"); }
    if (wg) { if (P.github) wg.href = P.github; else wg.hidden = true; }
    buildMenu();
    renderAbout();
    renderProjects();
    renderContact();
    updateHud();
    setTitle();
    if (state.openProject) renderModal(state.openProject);
    requestAnimationFrame(() => drawTraces(false));
  }

  function setLang(l) {
    if (l === state.lang) return;
    state.lang = l;
    saveLang(l);
    applyLang();
  }

  /* ---------------------------------------------------------
     HUD: fecha y momento del día, como en Persona 3
     --------------------------------------------------------- */
  function updateHud() {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    $("#hud-date").firstChild.nodeValue = state.lang === "es" ? `${dd}/${mm}` : `${mm}/${dd}`;
    $("#hud-day").textContent = t("hud.days")[d.getDay()];
    const h = d.getHours();
    const key = h === 0 ? "dark" : h < 6 ? "dawn" : h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";
    const part = $("#hud-part");
    part.textContent = t("hud.parts")[key];
    part.classList.toggle("is-dark", key === "dark");
  }

  /* ---------------------------------------------------------
     Foto (con silueta mientras no exista)
     --------------------------------------------------------- */
  const photo = { hero: false, about: false };
  function probe(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }
  async function loadPhoto() {
    const heroSrc = P.photo.hero || P.photo.src;
    const [h, a] = await Promise.all([probe(heroSrc), probe(P.photo.src)]);
    photo.hero = h;
    photo.about = a;
  }
  function applyPhoto(fig, which) {
    if (!fig) return;
    const ok = photo[which];
    const src = which === "hero" ? P.photo.hero || P.photo.src : P.photo.src;
    const img = $("img", fig);
    fig.classList.toggle("has-photo", ok);
    // En Acerca de mí la foto a color va siempre dentro del paralelogramo
    fig.classList.toggle("is-framed", ok && (which === "about" || !P.photo.cutout));
    if (ok && img && !img.getAttribute("src")) img.src = src;
  }

  /* ---------------------------------------------------------
     Menú principal
     --------------------------------------------------------- */
  const MENU_SHAPE = [
    { rot: "-7deg", size: 1, shift: "0px" },
    { rot: "4deg", size: 0.86, shift: "5vw" },
    { rot: "-3deg", size: 0.95, shift: "1.5vw" }
  ];

  function triLabel(text) {
    const s = esc(text);
    return `<span class="mi__skew">
        <span class="mi__shadow"></span>
        <span class="mi__hl"></span>
        <span class="mi__label">${s}</span>
        <span class="mi__inv" aria-hidden="true"><span class="mi__label">${s}</span></span>
      </span>`;
  }

  function buildMenu() {
    const menu = $("#menu");
    menu.innerHTML = ROUTES.map((r, i) => {
      const sh = MENU_SHAPE[i];
      return `<a class="mi" href="#/${r}" data-i="${i}" style="--i:${i};--rot:${sh.rot};--size:${sh.size};--shift:${sh.shift}">${triLabel(t("menu." + r))}</a>`;
    }).join("");
    $$(".mi", menu).forEach((a) => {
      a.addEventListener("mouseenter", () => activateMenu(+a.dataset.i));
      a.addEventListener("focus", () => activateMenu(+a.dataset.i));
    });
    activateMenu(state.menuIndex, true);
  }

  function activateMenu(i, silent) {
    const items = $$("#menu .mi");
    if (!items.length) return;
    i = Math.max(0, Math.min(items.length - 1, i));
    const changed = i !== state.menuIndex;
    state.menuIndex = i;
    items.forEach((el, k) => {
      el.classList.toggle("is-active", k === i);
      if (k === i) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
    $("#menu").classList.add("has-active");
    if (!silent || changed) lightTrace(i);
    setCommand(i, !silent && changed);

    if (A && changed && !silent) {
      // El triángulo de sombra salta con resorte, el retrato se mueve un poco
      A.animate($(".mi__shadow", items[i]), { scale: { from: 0.55, to: 1 }, ease: springy });
      A.animate(items[i], { x: { from: -16, to: 0 }, ease: springy });
      A.animate("#portrait", { x: i * -14, ease: springy });
    }
  }

  function setCommand(i, animate) {
    const el = $("#cmd-text");
    if (!el) return;
    const text = t("menuDesc." + ROUTES[i]);
    if (A && animate) {
      A.animate(el, {
        innerHTML: A.scrambleText({ text, duration: 380, chars: "uppercase", cursor: "▌" }),
        duration: 380
      });
    } else {
      el.textContent = text;
    }
  }

  /* ---------------------------------------------------------
     Pistas de PCB: del retrato a cada opción del menú, a 45°
     --------------------------------------------------------- */
  const SVGNS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function drawTraces(animateAll) {
    const svg = $("#traces");
    if (!svg) return;
    svg.innerHTML = "";
    if (isNarrow() || state.route !== "home") return;

    const home = $("#screen-home").getBoundingClientRect();
    const w = home.width, h = home.height;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

    /* Pistas de fondo (decorativas, tono bajo) */
    const bg = [
      `M${w * 0.56} ${h * 0.9} H${w * 0.66} L${w * 0.66 + 46} ${h * 0.9 - 46} H${w * 0.8}`,
      `M${w * 0.54} ${h * 0.14} V${h * 0.24} L${w * 0.54 + 34} ${h * 0.24 + 34} H${w * 0.6}`,
      `M${w * 0.6} ${h * 0.97} H${w * 0.74} L${w * 0.74 + 30} ${h * 0.97 - 30} H${w * 0.86} L${w * 0.86 + 24} ${h * 0.97 - 54}`
    ];
    bg.forEach((d) => {
      svg.appendChild(svgEl("path", { d, class: "tr tr--bg" }));
      const pts = d.match(/-?[\d.]+/g).map(Number);
      svg.appendChild(svgEl("circle", { cx: pts[0], cy: pts[1], r: 5, class: "via via--bg" }));
    });

    /* Pistas al menú */
    const pr = $(".portrait__art").getBoundingClientRect();
    const x0 = pr.left - home.left + pr.width * 0.8;
    const pc = pr.top - home.top + pr.height * 0.46;

    $$("#menu .mi").forEach((mi, i) => {
      const lab = $(".mi__label", mi).getBoundingClientRect();
      const fs = parseFloat(getComputedStyle($(".mi__skew", mi)).fontSize);
      const x1 = lab.left - home.left - fs * 0.24 - 16;
      const y1 = lab.top - home.top + lab.height / 2;
      const y0 = pc + (y1 - pc) * 0.45;
      const ady = Math.abs(y1 - y0);
      const dir = y1 > y0 ? 1 : -1;
      let xA = x0 + 34 + i * 30;
      if (xA + ady > x1 - 24) xA = Math.max(x0 + 12, x1 - 24 - ady);
      const d = `M${x0} ${y0} H${xA} L${xA + ady} ${y0 + dir * ady} H${x1}`;

      const path = svgEl("path", { d, class: "tr", "data-i": i });
      svg.appendChild(path);
      svg.appendChild(svgEl("circle", { cx: x0, cy: y0, r: 6, class: "via" }));
      svg.appendChild(svgEl("rect", { x: x1 - 4, y: y1 - 9, width: 12, height: 18, class: "pad", "data-i": i }));

      if (animateAll) {
        const len = path.getTotalLength();
        path.style.setProperty("--len", len);
        path.style.strokeDasharray = len;
        path.style.animationDelay = `${i * 70}ms`;
        path.classList.add("tr--draw");
      }
    });
    lightTrace(state.menuIndex, animateAll);
  }

  function lightTrace(i, skipAnim) {
    const svg = $("#traces");
    if (!svg) return;
    $$(".tr[data-i]", svg).forEach((p) => {
      const on = +p.dataset.i === i;
      p.classList.toggle("tr--on", on);
      if (on && !skipAnim) {
        const len = p.getTotalLength();
        p.style.setProperty("--len", len);
        p.style.strokeDasharray = len;
        p.style.animationDelay = "0ms";
        p.classList.remove("tr--draw");
        void p.getBoundingClientRect();
        p.classList.add("tr--draw");
      }
    });
    $$(".pad[data-i]", svg).forEach((r) => r.classList.toggle("pad--on", +r.dataset.i === i));
  }

  /* ---------------------------------------------------------
     Página: Acerca de mí
     --------------------------------------------------------- */
  function pageTitle(text) {
    return `<header class="ptitle"><h1 class="mi is-active">${triLabel(text)}</h1></header>`;
  }

  function figurePhoto(cls) {
    return `<figure class="${cls}">
      <div class="portrait__panel" aria-hidden="true"></div>
      <img alt="${esc(P.name)}" decoding="async">
      <svg class="portrait__ghost" viewBox="0 0 300 420" aria-hidden="true"><path d="M150 40c40 0 66 32 66 76c0 30-10 56-26 72c-6 8-6 18 2 24c44 16 90 36 104 78l4 130H0l4-130c14-42 60-62 104-78c8-6 8-16 2-24c-16-16-26-42-26-72c0-44 26-76 66-76z"/></svg>
    </figure>`;
  }

  function pips(n, total) {
    let s = "";
    for (let k = 0; k < total; k++) s += `<i class="${k < n ? "on" : ""}"></i>`;
    return `<span class="pips" aria-label="${n}/${total}">${s}</span>`;
  }

  function renderAbout() {
    const a = t("about");
    const el = $("#screen-about");
    el.innerHTML = `<div class="page__inner">
      ${pageTitle(a.title)}

      <div class="about-intro">
        ${figurePhoto("about-photo")}
        <div>
          <p class="lead">${esc(a.lead)}</p>
          <p>${esc(a.body)}</p>
          <dl class="facts">
            ${a.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
          </dl>
        </div>
      </div>

      <section class="block">
        <h2 class="block__h">${esc(a.pathTitle)}</h2>
        <ol class="timeline">
          ${a.path.map((p) => `<li class="tl">
              <div class="tl__when">${esc(p.when)}</div>
              <div class="tl__via" aria-hidden="true"></div>
              <div class="tl__body">
                <p class="tl__role">${esc(p.role)}</p>
                <p class="tl__org">${esc(p.org)}</p>
                <ul class="tl__pts">${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
              </div>
            </li>`).join("")}
        </ol>
      </section>

      <section class="block">
        <h2 class="block__h">${esc(a.eduTitle)}</h2>
        <ul class="edu">
          ${a.edu.map(([o, d, y]) => `<li><b>${esc(o)}</b><span>${esc(d)}</span><em>${esc(y)}</em></li>`).join("")}
        </ul>
      </section>

      <section class="block">
        <h2 class="block__h">${esc(a.skillsTitle)}</h2>
        <div class="skills">
          ${a.skills.map((g) => `<div>
              <h3>${esc(g.group)}</h3>
              <ul>${g.items.map(([name, lvl]) => `<li class="${lvl === "adv" ? "is-adv" : lvl === "basic" ? "is-basic" : ""}">${esc(name)}${
                lvl === "adv" ? ` <small>${esc(a.advanced)}</small>` : lvl === "basic" ? ` <small>${esc(a.basic)}</small>` : ""
              }</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
      </section>

      <div class="duo block">
        <section class="block">
          <h2 class="block__h">${esc(a.awardTitle)}</h2>
          <p class="award__name">${esc(a.award)}</p>
          <p class="award__note">${esc(a.awardNote)}</p>
          <div class="pips pips--terms">
            ${a.awardTerms.map((x) => `<span><i class="on"></i>${esc(x)}</span>`).join("")}
          </div>
        </section>
        <section class="block">
          <h2 class="block__h">${esc(a.langTitle)}</h2>
          <ul class="langs">
            ${a.langs.map(([n, l, v]) => `<li><b>${esc(n)}</b><span>${esc(l)}</span>${pips(v, 5)}</li>`).join("")}
          </ul>
        </section>
      </div>
    </div>`;
    applyPhoto($(".about-photo", el), "about");
  }

  /* ---------------------------------------------------------
     Página: Proyectos
     --------------------------------------------------------- */
  function mediaHTML(p, src) {
    if (src) {
      return `<div class="media is-loading"><img src="${esc(src)}" alt="${esc(L(p.title))}" decoding="async"></div>`;
    }
    return `<div class="media">${GLYPHS[p.glyph] || GLYPHS.pcb || ""}</div>`;
  }

  function wireImageSkeletons(root) {
    $$(".media.is-loading img", root).forEach((img) => {
      const done = () => img.parentElement.classList.remove("is-loading");
      if (img.complete && img.naturalWidth) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", () => {
          img.parentElement.classList.remove("is-loading");
          img.remove();
        }, { once: true });
      }
    });
  }

  function projectMeta(p) {
    return [L(p.context), p.year].filter(Boolean).map(esc).join(", ");
  }

  function renderProjects() {
    const tp = t("projects");
    const el = $("#screen-projects");
    if (!PROJECTS.length) {
      el.innerHTML = `<div class="page__inner">${pageTitle(tp.title)}<p class="empty">${esc(tp.empty)}</p></div>`;
      return;
    }
    el.innerHTML = `<div class="page__inner">
      ${pageTitle(tp.title)}
      <p class="proj-intro">${esc(tp.intro)}</p>
      <div class="proj">
        <ul class="plist" id="plist">
          ${PROJECTS.map((p, i) => `<li>
              <a class="prow" href="#/projects/${esc(p.id)}" data-i="${i}">
                <span class="prow__t">${esc(L(p.title))}</span>
                <span class="prow__a">${esc(L(p.area))}</span>
              </a>
            </li>`).join("")}
        </ul>
        <aside class="ppreview" id="ppreview" aria-live="polite"></aside>
      </div>
      ${githubSection()}
    </div>`;

    renderRepos();
    $$(".prow", el).forEach((a) => {
      a.addEventListener("mouseenter", () => setProject(+a.dataset.i));
      a.addEventListener("focus", () => setProject(+a.dataset.i));
    });
    setProject(state.projIndex);
  }

  /* ---------------------------------------------------------
     Repositorios de GitHub en vivo (idea de gitfolio)
     --------------------------------------------------------- */
  const LANG_COLORS = {
    Python: "#3572A5", C: "#555555", "C++": "#f34b7d", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    HTML: "#e34c26", CSS: "#663399", MATLAB: "#e16737", "Jupyter Notebook": "#DA5B0B", Verilog: "#b2b7f8",
    VHDL: "#adb2cb", Shell: "#89e051", Assembly: "#6E4C13", Java: "#b07219", Rust: "#dea584", Go: "#00ADD8"
  };
  const gh = { status: "idle", repos: [], user: null };

  function githubUser() {
    const m = /github\.com\/([^/?#]+)/i.exec(P.github || "");
    return m ? m[1] : null;
  }

  function githubSection() {
    if (!githubUser()) return "";
    const tp = t("projects");
    return `<section class="gh" id="gh">
      <div class="gh__head">
        <h2 class="block__h">${esc(tp.ghTitle)}</h2>
        <p class="gh__meta" id="gh-meta"><a href="${esc(P.github)}" target="_blank" rel="noopener">@${esc(githubUser())}</a></p>
      </div>
      <ul class="gh__list" id="gh-list"></ul>
    </section>`;
  }

  function relDate(iso) {
    const d = new Date(iso);
    try {
      return new Intl.DateTimeFormat(state.lang === "es" ? "es-CO" : "en-US", { day: "numeric", month: "short", year: "numeric" }).format(d);
    } catch (e) {
      return d.toISOString().slice(0, 10);
    }
  }

  function renderRepos() {
    const list = $("#gh-list");
    if (!list) return;
    const tp = t("projects");
    const meta = $("#gh-meta");
    const userLink = `<a href="${esc(P.github)}" target="_blank" rel="noopener">@${esc(githubUser())}</a>`;

    if (gh.status === "idle" || gh.status === "loading") {
      list.innerHTML = Array.from({ length: 4 }, () =>
        `<li class="repo repo--sk" aria-hidden="true"><span class="sk"></span><span class="sk" style="width:92%"></span><span class="sk" style="width:64%"></span></li>`
      ).join("");
      if (gh.status === "idle") loadRepos();
      return;
    }
    if (gh.status === "error") {
      list.innerHTML = `<li class="gh__msg">${esc(tp.ghError)} <a href="${esc(P.github)}" target="_blank" rel="noopener">${esc(tp.ghVisit)}</a></li>`;
      return;
    }
    meta.innerHTML = `${userLink}, ${esc(tp.ghRepos(gh.repos.length))}`;
    if (!gh.repos.length) {
      list.innerHTML = `<li class="gh__msg">${esc(tp.ghEmpty)} <a href="${esc(P.github)}" target="_blank" rel="noopener">${esc(tp.ghVisit)}</a></li>`;
      return;
    }
    list.innerHTML = gh.repos.map((r) => `<li>
        <a class="repo" href="${esc(r.html_url)}" target="_blank" rel="noopener">
          <span class="repo__n">${esc(r.name)}</span>
          <span class="repo__d">${esc(r.description || tp.ghNoDesc)}</span>
          <span class="repo__m">
            ${r.language ? `<span class="repo__lang" style="--c:${LANG_COLORS[r.language] || "var(--night-400)"}">${esc(r.language)}</span>` : ""}
            <span>${r.stargazers_count} ${esc(tp.ghStars)}</span>
            <span>${esc(tp.ghUpdated)} ${esc(relDate(r.pushed_at || r.updated_at))}</span>
          </span>
        </a>
      </li>`).join("");
  }

  async function loadRepos() {
    const user = githubUser();
    if (!user || gh.status === "loading") return;
    gh.status = "loading";
    const key = "jl-gh-" + user;
    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || "null");
      if (cached && Date.now() - cached.t < 10 * 60 * 1000) {
        gh.repos = cached.repos;
        gh.status = "ok";
        renderRepos();
        return;
      }
    } catch (e) { /* sin almacenamiento */ }
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      gh.repos = data
        .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== `${user.toLowerCase()}.github.io`)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 8);
      gh.status = "ok";
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), repos: gh.repos })); } catch (e) { /* nada */ }
    } catch (e) {
      gh.status = "error";
    }
    renderRepos();
  }

  function setProject(i) {
    i = Math.max(0, Math.min(PROJECTS.length - 1, i));
    state.projIndex = i;
    $$(".prow").forEach((r, k) => r.classList.toggle("is-active", k === i));
    const p = PROJECTS[i];
    const pv = $("#ppreview");
    if (!pv || !p) return;
    const tp = t("projects");
    const cover = p.cover || (p.images && p.images[0] && imgOf(p.images[0]).src);
    pv.innerHTML = `
      ${mediaHTML(p, cover)}
      <h2 class="ppreview__t">${esc(L(p.title))}</h2>
      <p class="ppreview__c">${projectMeta(p)}</p>
      <p class="ppreview__s">${esc(L(p.summary))}</p>
      <div class="actions">
        <a class="btn" href="#/projects/${esc(p.id)}">${esc(tp.open)}</a>
        ${p.repo ? `<a class="btn btn--line" href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(tp.repo)}</a>` : ""}
      </div>`;
    wireImageSkeletons(pv);
  }

  /* ---------------------------------------------------------
     Ventana de proyecto
     --------------------------------------------------------- */
  const ICON_PREV = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 2L4 8l6 6"/></svg>`;
  const ICON_NEXT = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2l6 6-6 6"/></svg>`;

  /* Una foto puede ser solo la ruta o un objeto { src, caption, credit } */
  function imgOf(x) {
    return typeof x === "string" ? { src: x } : x || {};
  }

  function creditHTML(c) {
    if (!c) return "";
    const tp = t("projects");
    const lic = state.lang === "en" && c.licenseEn ? c.licenseEn : c.license;
    const licHTML = c.licenseUrl
      ? `<a href="${esc(c.licenseUrl)}" target="_blank" rel="noopener">${esc(lic)}</a>`
      : esc(lic || "");
    const via = c.source
      ? `<a href="${esc(c.source)}" target="_blank" rel="noopener">${esc(tp.via)}</a>`
      : "";
    return `<span class="credit">${esc(tp.photo)}: ${esc(c.author)}, ${licHTML}${via ? ", " + via : ""}.</span>`;
  }

  function renderModal(p) {
    const tp = t("projects");
    const m = $("#modal");
    const imgs = (p.images || []).map(imgOf);
    const gi = Math.min(state.galleryIndex, Math.max(0, imgs.length - 1));
    const cur = imgs[gi];

    const panes = ["photos"];
    if (p.video) panes.push("video");
    if (p.pdf) panes.push("doc");
    const tabLabel = { photos: tp.tabPhotos, video: tp.tabVideo, doc: tp.tabDoc };

    const photos = imgs.length
      ? `<figure class="gallery">
           <div class="gallery__main">
             ${mediaHTML(p, cur.src)}
             ${imgs.length > 1 ? `<div class="gallery__nav">
                 <button type="button" data-g="-1" aria-label="${esc(tp.prev)}">${ICON_PREV}</button>
                 <button type="button" data-g="1" aria-label="${esc(tp.next)}">${ICON_NEXT}</button>
               </div>` : ""}
           </div>
           ${cur.caption || cur.credit ? `<figcaption class="caption">${cur.caption ? `<span>${esc(L(cur.caption))}</span>` : ""}${creditHTML(cur.credit)}</figcaption>` : ""}
           ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((x, k) => `<button type="button" data-gi="${k}" aria-current="${k === gi}"><img src="${esc(x.src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
         </figure>`
      : `<div class="gallery__main"><div class="media">${GLYPHS[p.glyph] || ""}<p class="media__note">${esc(tp.noPhotos)}</p></div></div>`;

    const body = String(L(p.body) || "").split(/\n\s*\n/).map((x) => `<p>${esc(x)}</p>`).join("");
    const links = (p.links || []).filter((l) => l && l.url);

    m.innerHTML = `
      <div class="modal__bar">
        <span class="tag">${esc(L(p.area))}</span>
        <button type="button" class="close" data-close><span>${esc(tp.close)}</span><span class="key">Esc</span></button>
      </div>
      <div class="modal__grid">
        <div class="mmedia">
          ${panes.length > 1 ? `<div class="mtabs" role="tablist">
              ${panes.map((k, n) => `<button type="button" role="tab" data-tab="${k}" aria-selected="${n === 0}">${esc(tabLabel[k])}</button>`).join("")}
            </div>` : ""}
          <div data-pane="photos">${photos}</div>
          ${p.video ? `<div data-pane="video" hidden><div class="video is-loading"><iframe title="${esc(L(p.title))}" data-src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(p.video)}?rel=0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div></div>` : ""}
          ${p.pdf ? `<div data-pane="doc" hidden><div class="doc is-loading"><iframe title="${esc(L(p.title))}" data-src="${esc(p.pdf)}"></iframe></div></div>` : ""}
        </div>
        <div class="minfo">
          <h2>${esc(L(p.title))}</h2>
          <p class="minfo__c">${projectMeta(p)}</p>
          <div class="minfo__b">${body}</div>
          ${p.tools && p.tools.length ? `<h3>${esc(tp.tools)}</h3><ul class="tools">${p.tools.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
          ${links.length ? `<h3>${esc(tp.links)}</h3><ul class="mlinks">${links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(L(l.label))}</a></li>`).join("")}</ul>` : ""}
          ${p.repo || p.pdf || p.video ? `<div class="actions">
              ${p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(tp.repo)}</a>` : ""}
              ${p.video ? `<a class="btn${p.repo ? " btn--line" : ""}" href="https://www.youtube.com/watch?v=${encodeURIComponent(p.video)}" target="_blank" rel="noopener">${esc(tp.video)}</a>` : ""}
              ${p.pdf ? `<a class="btn btn--line" href="${esc(p.pdf)}" target="_blank" rel="noopener">${esc(tp.pdf)}</a>` : ""}
            </div>` : ""}
          ${p.rights ? `<p class="rights">${esc(L(p.rights))}</p>` : ""}
        </div>
      </div>`;

    wireImageSkeletons(m);

    $("[data-close]", m).addEventListener("click", closeProject);
    $$("[data-g]", m).forEach((b) => b.addEventListener("click", () => stepGallery(+b.dataset.g)));
    $$("[data-gi]", m).forEach((b) => b.addEventListener("click", () => { state.galleryIndex = +b.dataset.gi; renderModal(p); }));
    $$("[data-tab]", m).forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
  }

  function showTab(name) {
    const m = $("#modal");
    $$("[data-tab]", m).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
    $$("[data-pane]", m).forEach((pane) => (pane.hidden = pane.dataset.pane !== name));
    if (name === "doc" || name === "video") {
      const f = $(`[data-pane="${name}"] iframe[data-src]`, m);
      if (f && !f.getAttribute("src")) {
        f.addEventListener("load", () => f.parentElement.classList.remove("is-loading"), { once: true });
        f.src = f.dataset.src;
      }
    }
  }

  function stepGallery(d) {
    const p = state.openProject;
    if (!p || !p.images || p.images.length < 2) return;
    const n = p.images.length;
    state.galleryIndex = (state.galleryIndex + d + n) % n;
    renderModal(p);
  }

  function openProject(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    const idx = PROJECTS.indexOf(p);
    state.openProject = p;
    state.galleryIndex = 0;
    if (state.projIndex !== idx) setProject(idx);
    renderModal(p);
    const m = $("#modal");
    if (!m.open) m.showModal();
    document.body.classList.add("is-locked");
    $("[data-close]", m).focus({ preventScroll: true });
  }

  function hideModal() {
    const m = $("#modal");
    state.openProject = null;
    if (m.open) m.close();
    document.body.classList.remove("is-locked");
    const row = $(`.prow[data-i="${state.projIndex}"]`);
    if (row) row.focus({ preventScroll: true });
  }

  function closeProject() {
    location.hash = "#/projects";
  }

  /* ---------------------------------------------------------
     Página: Contacto
     --------------------------------------------------------- */
  function renderContact() {
    const c = t("contact");
    const el = $("#screen-contact");
    el.innerHTML = `<div class="page__inner">
      ${pageTitle(c.title)}
      <p class="contact-lead">${esc(c.lead)}</p>
      <ul class="clist">
        <li class="crow crow--mail">
          <span class="crow__k">${esc(c.mail)}</span>
          <a class="crow__v" href="mailto:${esc(P.email)}">${esc(P.email)}</a>
          <button type="button" class="copy" data-copy="${esc(P.email)}">${esc(c.copy)}</button>
        </li>
        <li class="crow">
          <span class="crow__k">${esc(c.linkedin)}</span>
          <a class="crow__v" href="${esc(P.linkedin)}" target="_blank" rel="noopener">${esc(P.linkedinLabel)}</a>
        </li>
        <li class="crow">
          <span class="crow__k">${esc(c.github)}</span>
          <a class="crow__v" href="${esc(P.github)}" target="_blank" rel="noopener">${esc(P.githubLabel)}</a>
        </li>
      </ul>
      <p class="where">${esc(c.where)}</p>
    </div>`;

    $("[data-copy]", el).addEventListener("click", async (e) => {
      const text = e.currentTarget.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e2) { /* nada */ }
        ta.remove();
      }
      toast(c.copied);
    });
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 1600);
  }

  /* ---------------------------------------------------------
     Rutas (#/about, #/projects, #/projects/<id>, #/contact)
     --------------------------------------------------------- */
  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const name = ROUTES.includes(parts[0]) ? parts[0] : "home";
    return { name, param: name === "projects" ? parts[1] || null : null, unknown: parts.length > 0 && name === "home" };
  }

  function setTitle() {
    const base = T().docTitle;
    document.title = state.route === "home" ? base : `${t("menu." + state.route)} | Joan Lopez`;
  }

  function showScreen(name) {
    state.route = name;
    document.body.dataset.route = name;
    $$("[data-screen]").forEach((s) => (s.hidden = s.dataset.screen !== name));
    $$("[data-route-link]").forEach((a) => {
      if (a.dataset.routeLink === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
    setTitle();
    const word = $("#pagebg-word");
    if (word) word.textContent = name === "home" ? "" : t("menu." + name);
    if (name !== "home" && A && state.ready) {
      const sk = $(`#screen-${name} .ptitle .mi`);
      if (sk) A.animate(sk, { x: { from: -90 }, scaleX: { from: 0.7 }, ease: springy, delay: 260 });
    }
    if (name === "home") {
      const k = ROUTES.indexOf(lastRoute);
      if (k >= 0) activateMenu(k, true);
      requestAnimationFrame(() => drawTraces(false));
    }
  }

  async function wipe(swap) {
    const w = $("#wipe");
    w.classList.remove("is-out");
    w.classList.add("is-in");
    await wait(440);
    swap();
    await wait(60);
    w.classList.remove("is-in");
    w.classList.add("is-out");
    await wait(470);
    w.classList.remove("is-out");
  }

  let lastRoute = "home";
  async function onRoute(first) {
    const r = parseHash();
    if (r.unknown) toast(T().notFound);

    if (r.name === state.route && !first) {
      // misma pantalla: solo abre o cierra la ventana de proyecto
      if (r.param) openProject(r.param);
      else if (state.openProject) hideModal();
      return;
    }

    if (state.openProject) hideModal();

    if (first) {
      showScreen(r.name);
    } else {
      state.busy = true;
      await wipe(() => showScreen(r.name));
      state.busy = false;
    }
    lastRoute = r.name;
    if (r.param) openProject(r.param);
  }

  /* ---------------------------------------------------------
     Teclado
     --------------------------------------------------------- */
  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;

    if (state.openProject) {
      if (k === "ArrowLeft") stepGallery(-1);
      if (k === "ArrowRight") stepGallery(1);
      return; // Esc lo maneja el diálogo
    }

    if (state.route === "home") {
      if (!state.ready) return;
      if (k === "ArrowDown" || k === "s") { e.preventDefault(); activateMenu(state.menuIndex + 1); }
      else if (k === "ArrowUp" || k === "w") { e.preventDefault(); activateMenu(state.menuIndex - 1); }
      else if (k === "Enter" || k === " ") {
        if (document.activeElement && document.activeElement.closest(".lang")) return;
        e.preventDefault();
        location.hash = "#/" + ROUTES[state.menuIndex];
      }
      return;
    }

    if (k === "Escape") { location.hash = "#/"; return; }

    if (state.route === "projects" && (k === "ArrowDown" || k === "ArrowUp")) {
      e.preventDefault();
      setProject(state.projIndex + (k === "ArrowDown" ? 1 : -1));
      const row = $(`.prow[data-i="${state.projIndex}"]`);
      if (row) row.focus({ preventScroll: false });
    }
  }

  /* ---------------------------------------------------------
     Arranque: skeleton hasta que fuentes y foto estén listas
     --------------------------------------------------------- */
  async function boot() {
    state.lang = initialLang();

    $("#nt-first").textContent = P.first;
    $("#nt-last").textContent = P.last;
    $("#id-name").textContent = P.name;

    $$(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
    $("[data-back]").addEventListener("click", (e) => { e.preventDefault(); location.hash = "#/"; });

    const modal = $("#modal");
    modal.addEventListener("cancel", (e) => { e.preventDefault(); closeProject(); });
    modal.addEventListener("click", (e) => { if (e.target === modal) closeProject(); });

    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", () => onRoute(false));
    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => drawTraces(false), 120);
    });
    setInterval(updateHud, 30000);

    const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const ready = Promise.all([fonts, loadPhoto(), wait(900)]);
    await Promise.race([ready, wait(4000)]);

    applyLang();
    applyPhoto($("#portrait"), "hero");
    await onRoute(true);

    // Una sola secuencia de entrada: barrido, menú, pistas
    const loader = $("#loader");
    const homeFirst = state.route === "home";
    if (A && homeFirst) {
      // Estado inicial antes de quitar la carga
      A.set(".home .mi", { opacity: 0, x: 180 });
      A.set("#portrait", { opacity: 0, x: -80 });
      A.set(".slab__run", { x: "-35%" });
      A.set(".wallet", { opacity: 0, y: -40 });
      A.set(".command, .idcard", { opacity: 0, x: 60 });
    }
    await wipe(() => {
      loader.classList.add("is-done");
      document.body.classList.add("is-ready");
      state.ready = true;
    });
    if (A && homeFirst) {
      // Una sola secuencia de entrada, como al pausar en el juego
      const tl = A.createTimeline({ defaults: { ease: springy } });
      tl.add("#portrait", { opacity: { to: 1, duration: 200, ease: "linear" }, x: 0 }, 0)
        .add(".slab__run", { x: "0%", ease: "outExpo", duration: 800 }, 0)
        .add(".home .mi", { opacity: { to: 1, duration: 160, ease: "linear" }, x: 0, delay: A.stagger(70) }, 80)
        .add(".wallet", { opacity: { to: 1, duration: 160, ease: "linear" }, y: 0 }, 160)
        .add(".command, .idcard", { opacity: { to: 1, duration: 160, ease: "linear" }, x: 0, delay: A.stagger(60) }, 220);
      await wait(700);
    } else {
      await wait(homeFirst ? 420 : 0);
    }
    drawTraces(true);
  }

  boot();
})();
