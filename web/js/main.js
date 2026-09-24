/* ============================================================
   NUESTRA HISTORIA ✿ motor
   ============================================================ */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (t) => { const d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
  const PAGE = (new URLSearchParams(location.search)).has("preview");

  const loader = $("#loader"), intro = $("#intro"), stage = $("#stage");
  const track = $("#track");
  const chapterLbl = $("#chapter-label"), cnum = $("#cnum");
  const prevBtn = $("#prev"), nextBtn = $("#next"), muteBtn = $("#mute");
  const dotsWrap = $("#dots"), progressFill = $("#progressfill");

  const TOTAL = SLIDES.length;
  let cur = 0, autoTimer = null, muted = true;

  /* ---------- helpers de datos ---------- */
  const isGroup = (s) => Array.isArray(s.photos) && s.photos.length > 0;
  const photoList = (s) => (isGroup(s) ? s.photos : [s]);
  const photoObj = (e) => (typeof e === "string" ? { src: e } : e);
  const photoType = (e) => (/\.(mp4|mov|m4v)$/i.test(photoObj(e).src) ? "vid" : "img");

  /* ---------- música de fondo ---------- */
  const musica = $("#musica");
  const musicBtn = $("#musicBtn");
  let musicOn = localStorage.getItem("cumpMusic") !== "off";
  function applyMusic() {
    musicBtn.textContent = musicOn ? "♫" : "♪";
    musicBtn.classList.toggle("playing", musicOn);
    musica.muted = !musicOn;
    musica.loop = true;
    if (musicOn) musica.play().catch(() => {});
    else musica.pause();
  }
  applyMusic();
  musicBtn.addEventListener("click", () => {
    musicOn = !musicOn;
    localStorage.setItem("cumpMusic", musicOn ? "on" : "off");
    applyMusic();
  });

  /* ---------- loader ---------- */
  function allImages() {
    const out = [];
    SLIDES.forEach((s) => {
      photoList(s).forEach((e) => {
        const p = photoObj(e);
        if (p.src && photoType(p) === "img") out.push(p.src);
      });
    });
    return out;
  }
  function preloadMedia(onprogress) {
    const list = allImages();
    let done = 0;
    const n = list.length;
    return new Promise((res) => {
      if (!n) return res();
      const count = () => {
        done++;
        onprogress && onprogress(Math.min(1, done / n));
        if (done >= n) finish();
      };
      const finish = () => { clearTimeout(cap); clearTimeout(imT); res(); };
      let cap = setTimeout(finish, 4000);   // nunca quedarse colgado
      const imT = [];
      list.forEach((src) => {
        const im = new Image();
        let once = false;
        const tick = () => { if (!once) { once = true; count(); } };
        im.onload = im.onerror = tick;
        im.src = src;
        imT.push(setTimeout(tick, 3000));
      });
    });
  }

  preloadMedia((p) => {
    $("#loader-fill").style.width = Math.round(p * 100) + "%";
    $("#loader-pct").textContent = Math.round(p * 100) + "%";
  }).then(() => {
    loader.classList.add("hide");
    intro.classList.remove("hide");
    if (PAGE) setTimeout(() => { if (!intro.classList.contains("hide")) start(); }, 700);
  });

  /* ---------- intro ---------- */
  $("#intro-name").textContent = CONFIG.introSaludo || "Cumpleaños";
  $("#intro-sub").textContent = CONFIG.introTexto || "";
  const kick = document.querySelector(".intro-kicker");
  kick.innerHTML = "una historia escrita por nosotros<br/><span style='font-family:var(--hand);font-size:1.4rem;color:var(--gold);letter-spacing:0'>para " + esc(CONFIG.ella) + "</span>";

  $("#intro-btn").addEventListener("click", start);
  document.addEventListener("keydown", (e) => {
    if (!intro.classList.contains("hide") && e.key === "Enter") start();
  });

  function start() {
    intro.classList.add("gone");
    setTimeout(() => intro.classList.add("hide"), 700);
    stage.classList.remove("hide");
    buildHearts(); buildBokeh();
    initSlides();
    musica.play().catch(() => {});
  }

  /* ---------- fondo decorativo ---------- */
  function buildHearts() {
    const wrap = document.querySelector(".hearts");
    const chars = ["❤", "♡", "✿", "✦", "♥", "❀"];
    for (let i = 0; i < 26; i++) {
      const s = document.createElement("span");
      s.textContent = chars[(Math.random() * chars.length) | 0];
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = (9 + Math.random() * 18) + "px";
      s.style.animationDuration = (9 + Math.random() * 12) + "s";
      s.style.animationDelay = (Math.random() * 14) + "s";
      wrap.appendChild(s);
    }
  }
  function buildBokeh() {
    const wrap = document.querySelector(".bokeh");
    for (let i = 0; i < 16; i++) {
      const b = document.createElement("i");
      const size = 20 + Math.random() * 60;
      b.style.width = b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "vw";
      b.style.top = Math.random() * 100 + "vh";
      b.style.setProperty("--d", 4 + Math.random() * 6 + "s");
      b.style.animationDelay = Math.random() * 5 + "s";
      wrap.appendChild(b);
    }
  }

  /* ---------- construcción ---------- */
  function initSlides() {
    SLIDES.forEach((s, i) => buildSlide(s, i));
    buildDots();
    bindNav();
    go(0, true);
  }

  function titleWords(text) {
    return esc(text).split(/(\s+)/).map((tkn, j) =>
      /^\s+$/.test(tkn) ? tkn : '<span class="wd" style="--i:' + j + '">' + tkn + "</span>"
    ).join("");
  }

  function mediaIMG(p, lazy) {
    if (/\.avif$/i.test(p.src)) {
      const pic = document.createElement("picture");
      const so = document.createElement("source");
      so.type = "image/avif"; so.srcset = p.src;
      const im = document.createElement("img");
      im.src = p.src.replace(/\.avif$/i, ".jpg");
      if (lazy) im.loading = "lazy";
      im.alt = "";
      pic.append(so, im);
      return pic;
    }
    const im = document.createElement("img");
    im.src = p.src;
    if (lazy) im.loading = "lazy";
    im.alt = "";
    return im;
  }

  function buildSlide(s, i) {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.dataset.i = i;
    const inner = document.createElement("div");
    inner.className = "slide-inner";

    /* invitación */
    if (s.type === "invitacion") {
      slide.classList.add("slide-invitacion");
      const rot = (Math.random() * 8 - 4).toFixed(1);
      const card = document.createElement("div");
      card.className = "inv-card";
      card.style.transform = "rotate(" + rot + "deg)";
      card.innerHTML =
        '<div class="inv-gift">🎀</div>' +
        '<div class="inv-kicker">' + esc(s.cap) + '</div>' +
        '<h2 class="inv-title">' + esc(s.title) + "</h2>" +
        '<div class="inv-plan">' + esc(s.text) + "</div>" +
        (s.detalle ? '<p class="inv-detalle">' + esc(s.detalle) + "</p>" : "") +
        '<div class="inv-fecha">' + esc(s.fecha) + "</div>" +
        (s.lugar ? '<div class="inv-lugar">📍 ' + esc(s.lugar) + "</div>" : "") +
        '<div class="inv-note">' + esc(s.note) + "</div>" +
        '<button class="inv-replay">↺ Volver a recorrerlo</button>';
      card.querySelector(".inv-replay").addEventListener("click", () => go(0));
      inner.appendChild(card);
      slide.appendChild(inner);
      track.appendChild(slide);
      slide.__videos = [];
      slide.__photos = [];
      return;
    }

    const isGrp = isGroup(s);
    const videos = [];
    const preload = [];

    /* postal */
    const pc = document.createElement("div");
    pc.className = "postcard" + (isGrp ? " grid" : "");
    pc.style.setProperty("--rot", (Math.random() * 8 - 4).toFixed(1) + "deg");

    const media = document.createElement(isGrp ? "div" : "div");
    media.className = isGrp ? "chip-grid" : "media";
    pc.appendChild(media);

    if (isGrp) {
      /* COLLAGE: todas las fotos de la sección juntas */
      const n = s.photos.length;
      addGrid(media, s.photos, n, videos, preload);
    } else {
      /* una sola foto grande */
      if (photoType(s) === "vid") {
        const v = document.createElement("video");
        v.src = s.src;
        if (s.poster) v.poster = s.poster;
        v.muted = true; v.setAttribute("playsinline", ""); v.preload = "metadata";
        media.appendChild(v);
        videos.push(v);
        pc.classList.add("video");
        v.addEventListener("loadedmetadata", () => {
          pc.classList.toggle("landscape", v.videoWidth >= v.videoHeight);
          pc.classList.toggle("portrait", v.videoWidth < v.videoHeight);
        });
        v.addEventListener("ended", () => {
          if (document.querySelector(".slide.active") === slide) stepNext();
        });
      } else {
        media.appendChild(mediaIMG(s, false));
        preload.push(s.src);
      }
    }

    const sp = document.createElement("div");
    sp.className = "sparkles";
    for (let k = 0; k < 5; k++) {
      const st = document.createElement("i");
      st.style.left = (8 + Math.random() * 84) + "%";
      st.style.top = (6 + Math.random() * 80) + "%";
      st.style.setProperty("--sd", 1.8 + Math.random() * 2 + "s");
      st.style.setProperty("--dd", (Math.random() * 2.5).toFixed(2) + "s");
      sp.appendChild(st);
    }
    pc.appendChild(sp);

    const note = document.createElement("div");
    note.className = "polaroid-note";
    note.textContent = s.note ? "✿ " + s.note : "";
    pc.appendChild(note);

    media.appendChild(document.createElement("div")).className = "tape t1";
    media.appendChild(document.createElement("div")).className = "tape t2";

    /* texto */
    const cb = document.createElement("div");
    cb.className = "caption-block";
    const kicker = document.createElement("div");
    kicker.className = "cap-kicker";
    kicker.textContent = s.cap;
    const title = document.createElement("h2");
    title.className = "cap-title";
    title.innerHTML = titleWords(s.title || "");
    const txt = document.createElement("p");
    txt.className = "cap-text";
    txt.textContent = s.text || "";
    const noteBlock = document.createElement("div");
    noteBlock.className = "cap-note";
    noteBlock.innerHTML = "<b>✤ " + esc(s.note || "") + "</b>";
    cb.append(kicker, title, txt, noteBlock);

    inner.append(pc, cb);
    slide.appendChild(inner);
    track.appendChild(slide);

    slide.__videos = videos;
    slide.__photos = preload;
  }

  function addGrid(grid, photos, n, videos, preload) {
    const ga = (n === 2 || n === 4) ? "1 / 1" : (n === 3 ? "4 / 5" : "4 / 3");
    grid.style.setProperty("--ga", ga);
    let cols = "repeat(2,1fr)";
    if (n === 5 || n === 6) cols = "repeat(3,1fr)";
    if (n >= 7) cols = "repeat(4,1fr)";
    grid.style.gridTemplateColumns = cols;

    photos.forEach((e, j) => {
      const p = photoObj(e);
      const cell = document.createElement("div");
      cell.className = "chip";
      cell.style.setProperty("--ci", j);
      if (n === 3 && j === 0) cell.style.gridRow = "1 / 3";

      if (photoType(p) === "vid") {
        const v = document.createElement("video");
        v.src = p.src;
        if (p.poster) v.poster = p.poster;
        v.muted = true; v.loop = true; v.setAttribute("playsinline", ""); v.preload = "metadata";
        cell.appendChild(v);
        videos.push(v);
      } else {
        cell.appendChild(mediaIMG(p, true));
        preload.push(p.src);
      }

      const nt = p.note || p.d || p.t;
      if (nt) {
        const nb = document.createElement("div");
        nb.className = "chip-note";
        nb.textContent = nt;
        cell.appendChild(nb);
      }
      grid.appendChild(cell);
    });

    // En móvil, ajustar el grid a 1-2 columnas
    const adjustGrid = () => {
      if (window.innerWidth <= 480) {
        if (n <= 2) grid.style.gridTemplateColumns = "1fr";
        else if (n <= 4) grid.style.gridTemplateColumns = "repeat(2,1fr)";
        else if (n <= 6) grid.style.gridTemplateColumns = "repeat(2,1fr)";
        else grid.style.gridTemplateColumns = "repeat(3,1fr)";
      } else if (window.innerWidth <= 840) {
        if (n <= 2) grid.style.gridTemplateColumns = "repeat(2,1fr)";
        else if (n <= 4) grid.style.gridTemplateColumns = "repeat(2,1fr)";
        else if (n <= 6) grid.style.gridTemplateColumns = "repeat(3,1fr)";
        else grid.style.gridTemplateColumns = "repeat(3,1fr)";
      } else {
        grid.style.gridTemplateColumns = cols;
      }
    };
    adjustGrid();
    window.addEventListener("resize", adjustGrid);
  }

  function buildDots() {
    for (let i = 0; i < TOTAL; i++) {
      const d = document.createElement("button");
      d.className = "dot";
      d.addEventListener("click", () => go(i));
      dotsWrap.appendChild(d);
    }
  }

  function stopVideo(v) {
    if (v && !v.paused) { v.pause(); v.currentTime = 0; }
  }

  /* ---------- navegación ---------- */
  function go(target, instant) {
    target = clamp(target, 0, TOTAL - 1);
    const changed = target !== cur;

    const slides = $$(".slide");
    track.style.transition = instant ? "none" : "";
    track.style.transform = "translateX(-" + target * 100 + "%)";

    cur = target;
    const next = slides[target];
    $$(".slide.active").forEach((s) => s.classList.remove("active"));
    next.classList.add("active");

    /* vídeos: suenan los de la postal activa, el resto en pausa */
    slides.forEach((sl) => {
      sl.__videos.forEach((v) => {
        if (sl === next) { if (v.paused) v.play().catch(() => {}); }
        else stopVideo(v);
      });
    });
    muteBtn.style.display = next.__videos.length ? "" : "none";
    muteBtn.textContent = muted ? "🔇" : "🔊";

    /* preload vecinas */
    [target + 1, target + 2].forEach((i) => {
      const s = slides[i];
      if (s && s.__photos) s.__photos.slice(0, 6).forEach((src) => {
        const im = new Image(); im.src = src;
      });
    });

    updateHUD();
    scheduleAuto();
    if (next.classList.contains("slide-invitacion") && changed) confettiBurst(next);
    void next.offsetWidth;
  }

  function stepNext() { go(cur + 1); }
  function stepPrev() { go(cur - 1); }

  function scheduleAuto() {
    clearTimeout(autoTimer);
    const s = SLIDES[cur];
    if (!s || s.type === "invitacion") return;
    autoTimer = setTimeout(() => {
      if (document.hidden) return;
      const act = document.querySelector(".slide.active");
      if (!act || act.dataset.i != cur) return;
      stepNext();
    }, s.delay || 9000);
  }

  function updateHUD() {
    cnum.textContent = pad(cur + 1);
    $("#ctot").textContent = "/ " + TOTAL;
    chapterLbl.textContent = (SLIDES[cur].cap || "").split("·")[0].trim();
    document.title = (cur + 1) + "/" + TOTAL + " · Nuestra Historia ❤";
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur === TOTAL - 1;
    const pct = ((cur + 1) / TOTAL) * 100;
    progressFill.style.width = pct + "%";
    $$(".dot").forEach((d, i) => d.classList.toggle("on", i === cur));
    const hint = document.querySelector(".swipehint");
    if (window.matchMedia("(max-width:840px)").matches) {
      hint.classList.toggle("show", cur < TOTAL - 1);
    }
  }

  /* ---------- eventos ---------- */
  let touchStartX = null, touchStartY = null;
  function bindNav() {
    prevBtn.addEventListener("click", () => stepPrev());
    nextBtn.addEventListener("click", () => stepNext());
    document.addEventListener("keydown", (e) => {
      if (stage.classList.contains("hide")) return;
      if (e.key === "ArrowRight") stepNext();
      if (e.key === "ArrowLeft") stepPrev();
    });
    const vp = document.querySelector(".viewport");
    vp.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    vp.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      touchStartX = touchStartY = null;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) stepNext(); else stepPrev();
      }
    }, { passive: true });

    muteBtn.addEventListener("click", () => {
      muted = !muted;
      muteBtn.textContent = muted ? "🔇" : "🔊";
      $$("video").forEach((v) => (v.muted = muted));
    });
  }

  /* ---------- confeti ---------- */
  function confettiBurst(slide) {
    const layer = document.createElement("div");
    layer.className = "confetti";
    const R = slide.getBoundingClientRect();
    const cx = R.left + R.width / 2, cy = R.top + R.height / 3;
    const colors = ["#e9bb76", "#f2b3b8", "#fdf3e3", "#d7838c", "#c98a4e", "#fff"];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("i");
      const ang = Math.random() * Math.PI * 2;
      const dist = 130 + Math.random() * (Math.min(window.innerWidth, 620) * 0.5);
      c.style.left = cx + "px";
      c.style.top = cy + "px";
      c.style.width = c.style.height = (6 + Math.random() * 9) + "px";
      c.style.background = colors[(Math.random() * colors.length) | 0];
      c.style.setProperty("--x", (Math.cos(ang) * dist) + "px");
      c.style.setProperty("--y", (Math.sin(ang) * dist - 80) + "px");
      c.style.setProperty("--t", (0.9 + Math.random() * 0.8).toFixed(2) + "s");
      layer.appendChild(c);
    }
    stage.appendChild(layer);
    setTimeout(() => layer.remove(), 2600);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimeout(autoTimer);
      $$("video").forEach(stopVideo);
      musica.pause();
    } else {
      scheduleAuto();
      const act = document.querySelector(".slide.active");
      if (act) act.__videos.forEach((v) => v.play().catch(() => {}));
      if (musicOn) musica.play().catch(() => {});
    }
  });

  window.__carrusel = { go: (i) => go(i), step: () => stepNext(), cur: () => cur, total: TOTAL };
})();