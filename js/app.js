"use strict";

const ITCH = "https://johntitortheprog.itch.io/";
const GH = "https://github.com/johntitor08/";

// Oyunlar: kapaklar images/games/, "play" tarayıcıda oynanan sürüm.
const GAMES = [
    { title: "MyCity Online", img: "mycity-online.png", genre: "Simülasyon", engine: "Godot", badge: "Yeni",
      desc: "Arkadaşlarınla aynı şehirde yaşa: arsa al, iş kur, okyanusu keşfet, polisten kaç. Türkçe, ücretsiz ve çok oyunculu (sürüm 2.4.1).",
      platforms: ["Windows", "Linux", "Android", "Tarayıcı"],
      play: "https://johntitor08.github.io/mycity-online/", itch: ITCH + "mycity-online", repo: GH + "mycity-online" },
    { title: "Whispers of the Night", img: "whispers-of-the-night.jpg", genre: "RPG", engine: "Unity · Godot", badge: "Steam",
      desc: "RPG. Steam'de yayında; Godot 4.6 portunun kaynak kodu GitHub'da.",
      platforms: ["Windows", "Linux", "macOS"],
      steam: "https://store.steampowered.com/app/4939740/Whispers_of_the_Night/", itch: ITCH + "whispers-of-the-night", repo: GH + "Whispers-of-the-Night-Godot" },
    { title: "Below Hell", img: "below-hell.jpg", genre: "Aksiyon", engine: "Unity · Godot",
      desc: "Öz topla, dönüş, yukarı tırman. Godot 4.6 ile yeniden tasarlanıyor.",
      platforms: ["Windows", "Linux", "macOS", "Tarayıcı"],
      play: ITCH + "below-hell-webgl", itch: ITCH + "below-hell", repo: GH + "Below-Hell-Godot" },
    { title: "Visual Novel Game", img: "visual-novel-game.png", genre: "Görsel Roman", engine: "Unity",
      desc: "Görsel roman. Tarayıcıda da oynanabilir.",
      platforms: ["Windows", "Linux", "macOS", "Tarayıcı"],
      play: ITCH + "visual-novel-web", itch: ITCH + "visual-novel-game", repo: GH + "Visual-Novel" },
    { title: "Tower Defense 2D", img: "tower-defense-2d.png", genre: "Strateji", engine: "Unity",
      desc: "2D kule savunma oyunu. Tarayıcıda da oynanabilir.",
      platforms: ["Windows", "Tarayıcı"],
      play: ITCH + "tower-defense-2d-webgl", itch: ITCH + "tower-defense-2d", repo: GH + "Tower-Defense-2D-Tutorial" },
    { title: "Exlipse", img: "exlipse.jpg", genre: "Aksiyon", engine: "Unity",
      desc: "Unity ile yapılmış aksiyon oyunu.",
      platforms: ["Windows"],
      itch: ITCH + "exlipse", repo: GH + "Exlipse" },
    { title: "Street Kings", img: "street-kings.png", genre: "Strateji", engine: "Unity",
      desc: "Unity ile yapılmış strateji oyunu.",
      platforms: ["Windows"],
      itch: ITCH + "street-kings", repo: GH + "Street-Kings" },
    { title: "2D Breakout Game", img: "2d-breakout-game.png", genre: "Arcade", engine: "JavaScript",
      desc: "Klasik tuğla kırma oyunu, doğrudan tarayıcıda.",
      platforms: ["Tarayıcı"],
      play: "https://2-d-breakout-game-theta.vercel.app", itch: ITCH + "2d-breakout-game", repo: GH + "2D-Breakout-Game" },
    { title: "Jumper Cube", img: "jumper-cube.png", genre: "Platform", engine: "Unity",
      desc: "2D platform oyunu. Tarayıcıda da oynanabilir.",
      platforms: ["Windows", "Tarayıcı"],
      play: ITCH + "jumper-cube-webgl", itch: ITCH + "jumper-cube", repo: GH + "Jumper-Cube" },
    { title: "Shadow Garden", img: "shadow-garden.png", genre: "Platform", engine: "Unity",
      desc: "2D platform oyunu. Tarayıcıda da oynanabilir.",
      platforms: ["Windows", "Linux", "macOS", "Tarayıcı"],
      play: ITCH + "shadow-garden-webgl", itch: ITCH + "shadow-garden", repo: GH + "Shadow-Garden" },
];

const ASSETS = [
    { title: "Ultimate RPG Item Icon Pack (Fantasy Sets)", img: "ultimate-rpg-item-icon-pack-fantasy-sets.png", url: ITCH + "ultimate-rpg-item-icon-pack-fantasy-sets" },
    { title: "Fantasy RPG Icon Asset Pack", img: "fantasy-rpg-icon-asset-pack.png", url: ITCH + "fantasy-rpg-icon-asset-pack" },
    { title: "RPG Fantasy Item Pack", img: "rpg-item-pack.png", url: ITCH + "rpg-item-pack" },
];

// GitHub dil renkleri (github-linguist)
const LANG_COLORS = {
    "C#": "#178600", "GDScript": "#355570", "JavaScript": "#f1e05a", "TypeScript": "#3178c6", "HTML": "#e34c26",
    "CSS": "#663399", "SCSS": "#c6538c", "Python": "#3572A5", "Java": "#b07219", "C": "#555555", "C++": "#f34b7d",
    "Rust": "#dea584", "ShaderLab": "#222c37", "ASP.NET": "#9400ff", "TeX": "#3D6117", "Jupyter Notebook": "#DA5B0B",
};
const PAGE = 12;

const $ = (sel) => document.querySelector(sel);

function el(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === "class") n.className = v;
        else if (k === "text") n.textContent = v;
        else n.setAttribute(k, v);
    }
    for (const c of [].concat(children)) {
        if (c) n.append(c);
    }
    return n;
}

function icon(cls) {
    return el("i", { class: cls, "aria-hidden": "true" });
}

function linkBtn(href, label, iconCls, primary = false) {
    return el("a", { class: "btn btn-sm " + (primary ? "btn-primary" : "btn-ghost"), href, target: "_blank", rel: "noopener" },
        [icon(iconCls), " " + label]);
}

// ------------------------------------------------------------------ oyunlar

let gameFilter = "Tümü";

function renderGameFilters() {
    const box = $("#gameFilters");
    box.replaceChildren();
    const opts = ["Tümü", "Tarayıcıda oyna", ...new Set(GAMES.map((g) => g.genre))];
    for (const o of opts) {
        const b = el("button", { class: "chip" + (o === gameFilter ? " active" : ""), type: "button", "aria-pressed": String(o === gameFilter), text: o });
        b.addEventListener("click", () => { gameFilter = o; renderGameFilters(); renderGames(); });
        box.append(b);
    }
}

function renderGames() {
    const grid = $("#gameGrid");
    grid.replaceChildren();
    const list = GAMES.filter((g) => gameFilter === "Tümü" || (gameFilter === "Tarayıcıda oyna" ? !!g.play : g.genre === gameFilter));
    for (const g of list) {
        const cover = el("div", { class: "cover" }, [
            el("img", { src: "images/games/" + g.img, alt: g.title + " kapak görseli", loading: "lazy", width: "315", height: "250" }),
            g.badge ? el("span", { class: "badge", text: g.badge }) : null,
        ]);
        const tags = el("div", { class: "tags" }, [
            el("span", { class: "tag", text: g.genre }),
            el("span", { class: "tag", text: g.engine }),
            ...g.platforms.map((p) => el("span", { class: "tag platform", text: p })),
        ]);
        const actions = el("div", { class: "actions" }, [
            g.play ? linkBtn(g.play, "Tarayıcıda Oyna", "fa-solid fa-play", true) : null,
            g.steam ? linkBtn(g.steam, "Steam", "fa-brands fa-steam", !g.play) : null,
            linkBtn(g.itch, "itch.io", "fa-brands fa-itch-io", !g.play && !g.steam),
            g.repo ? linkBtn(g.repo, "Kaynak", "fa-brands fa-github") : null,
        ]);
        grid.append(el("article", { class: "card game" }, [
            cover,
            el("div", { class: "card-body" }, [el("h3", { text: g.title }), el("p", { text: g.desc }), tags, actions]),
        ]));
    }
}

function renderAssets() {
    const grid = $("#assetGrid");
    grid.replaceChildren();
    for (const a of ASSETS) {
        grid.append(el("a", { class: "card game", href: a.url, target: "_blank", rel: "noopener" }, [
            el("div", { class: "cover" }, [el("img", { src: "images/games/" + a.img, alt: a.title, loading: "lazy", width: "315", height: "250" })]),
            el("div", { class: "card-body" }, [el("h3", { text: a.title }), el("span", { class: "muted" }, [icon("fa-brands fa-itch-io"), " itch.io'da gör"])]),
        ]));
    }
}

// ------------------------------------------------------------------ GitHub projeleri

let projects = [];
let langFilter = "Tümü";
let shown = PAGE;

function normalize(r) {
    return {
        name: r.name, description: r.description || "", language: r.language || "",
        stars: r.stargazers_count ?? r.stars ?? 0, updated: r.pushed_at || r.updated_at || r.updated || "",
        homepage: r.homepage || "", url: r.html_url || r.url,
    };
}

async function loadProjects() {
    const src = $("#projectSource");
    try {
        const res = await fetch("https://api.github.com/users/johntitor08/repos?per_page=100&sort=pushed", { headers: { Accept: "application/vnd.github+json" } });
        if (!res.ok) throw new Error("GitHub " + res.status);
        const data = await res.json();
        projects = data.filter((r) => !r.fork && !r.private && r.name !== "johntitor08").map(normalize);
        src.textContent = "GitHub'dan canlı olarak geliyor.";
    } catch (e) {
        // GitHub API sınırına takılınca (saatte 60 istek) kayıtlı listeyi göster
        try {
            const res = await fetch("data/projects.json");
            projects = (await res.json()).map(normalize);
            src.textContent = "Kayıtlı liste (GitHub şu an yanıt vermedi).";
        } catch (e2) {
            src.textContent = "Projeler yüklenemedi.";
            projects = [];
        }
    }
    $("#statProjects").textContent = String(projects.length);
    renderLangFilters();
    renderProjects();
}

function renderLangFilters() {
    const counts = {};
    for (const p of projects) {
        const l = p.language || "Diğer";
        counts[l] = (counts[l] || 0) + 1;
    }
    const langs = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const box = $("#langFilters");
    box.replaceChildren();
    for (const l of ["Tümü", ...langs]) {
        const b = el("button", { class: "chip" + (l === langFilter ? " active" : ""), type: "button", "aria-pressed": String(l === langFilter) }, [
            l, el("span", { class: "count", text: String(l === "Tümü" ? projects.length : counts[l]) }),
        ]);
        b.addEventListener("click", () => { langFilter = l; shown = PAGE; renderLangFilters(); renderProjects(); });
        box.append(b);
    }
}

function filteredProjects() {
    const q = $("#projectSearch").value.trim().toLocaleLowerCase("tr");
    const sort = $("#projectSort").value;
    const list = projects.filter((p) => {
        if (langFilter !== "Tümü" && (p.language || "Diğer") !== langFilter) return false;
        return !q || (p.name + " " + p.description).toLocaleLowerCase("tr").includes(q);
    });
    list.sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name, "tr");
        if (sort === "stars") return b.stars - a.stars || b.updated.localeCompare(a.updated);
        return b.updated.localeCompare(a.updated);
    });
    return list;
}

const rtf = new Intl.RelativeTimeFormat("tr", { numeric: "auto" });
function ago(iso) {
    const t = Date.parse(iso);
    if (isNaN(t)) return "";
    const days = Math.round((t - Date.now()) / 86400000);
    if (Math.abs(days) < 30) return rtf.format(days, "day");
    if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
    return rtf.format(Math.round(days / 365), "year");
}

function renderProjects() {
    const list = filteredProjects();
    const grid = $("#projectGrid");
    grid.replaceChildren();
    for (const p of list.slice(0, shown)) {
        const lang = p.language
            ? el("span", {}, [el("span", { class: "lang-dot", style: "background:" + (LANG_COLORS[p.language] || "#8b949e") }), p.language])
            : null;
        const meta = el("div", { class: "meta" }, [
            lang,
            p.stars ? el("span", {}, [icon("fa-regular fa-star"), " " + p.stars]) : null,
            p.updated ? el("span", {}, [icon("fa-regular fa-clock"), " " + ago(p.updated)]) : null,
        ]);
        const actions = el("div", { class: "actions" }, [
            linkBtn(p.url, "GitHub", "fa-brands fa-github"),
            p.homepage ? linkBtn(p.homepage, "Demo", "fa-solid fa-arrow-up-right-from-square", true) : null,
        ]);
        grid.append(el("article", { class: "card project" }, [
            el("div", { class: "card-body" }, [
                el("h3", {}, [icon("fa-regular fa-folder"), p.name]),
                el("p", { text: p.description || "Açıklama yok." }),
                meta, actions,
            ]),
        ]));
    }
    $("#projectEmpty").hidden = list.length > 0;
    const more = $("#projectMore");
    more.hidden = list.length <= shown;
    more.textContent = "Daha fazla göster (" + (list.length - shown) + ")";
}

// ------------------------------------------------------------------ iletişim formu

// Statik site (GitHub Pages) sunucusuz: mesaj, sitenin deposunda önceden doldurulmuş bir GitHub konusu olarak açılır.
function setupContact() {
    const form = $("#contactForm");
    const status = $("#formStatus");
    form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        const bad = [];
        form.querySelectorAll(".field").forEach((f) => f.classList.remove("invalid"));
        if (!name) bad.push(form.name);
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push(form.email);
        if (message.length < 5) bad.push(form.message);
        if (bad.length) {
            bad.forEach((i) => i.closest(".field").classList.add("invalid"));
            status.className = "form-status error";
            status.textContent = !name ? "Lütfen adını yaz." : (bad.includes(form.email) ? "E-posta adresi geçersiz görünüyor." : "Mesaj en az 5 karakter olmalı.");
            bad[0].focus();
            return;
        }
        const body = message + "\n\n---\nGönderen: " + name + (email ? "\nE-posta: " + email : "");
        const url = "https://github.com/johntitor08/johntitor08.github.io/issues/new?title=" +
            encodeURIComponent("İletişim: " + name) + "&body=" + encodeURIComponent(body);
        const win = window.open(url, "_blank", "noopener");
        status.className = "form-status ok";
        status.textContent = win === null
            ? "Açılır pencere engellendi; GitHub'a yönlendiriliyorsun…"
            : "GitHub'da mesaj sayfası açıldı. Göndermek için orada \"Submit new issue\"a bas.";
        if (win === null) window.location.href = url;
        form.reset();
    });
}

// ------------------------------------------------------------------ menü ve sayfa

function setupNav() {
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.firstElementChild.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.firstElementChild.className = "fa-solid fa-bars";
    }));
    // görünen bölümün menü bağlantısı vurgulanır
    const map = new Map([...links.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (e.isIntersecting) {
                map.forEach((a) => a.classList.remove("active"));
                map.get(e.target.id)?.classList.add("active");
            }
        }
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    const toTop = $("#toTop");
    window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600), { passive: true });
}

// Tanıtım videosu: YouTube oynatıcısı (ve çerezleri) ancak tıklayınca yüklenir
function setupVideo() {
    const btn = document.querySelector("#featureVideo .video");
    if (!btn) return;
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const frame = el("iframe", {
            src: "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0",
            title: "MyCity Online tanıtım videosu",
            allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
            allowfullscreen: "",
        });
        const box = el("div", { class: "video" }, [frame]);
        btn.replaceWith(box);
    }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = String(new Date().getFullYear());
    $("#statGames").textContent = String(GAMES.length);
    $("#statAssets").textContent = String(ASSETS.length);
    renderGameFilters();
    renderGames();
    renderAssets();
    setupNav();
    setupContact();
    setupVideo();
    $("#projectSearch").addEventListener("input", () => { shown = PAGE; renderProjects(); });
    $("#projectSort").addEventListener("change", () => { shown = PAGE; renderProjects(); });
    $("#projectMore").addEventListener("click", () => { shown += PAGE; renderProjects(); });
    loadProjects();
});
