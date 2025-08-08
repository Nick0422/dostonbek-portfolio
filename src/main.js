// ===== Mobile menu toggle =====
const btn = document.getElementById('menuBtn');
const menuMobile = document.getElementById('menuMobile');
if (btn && menuMobile) {
    btn.addEventListener('click', () => menuMobile.classList.toggle('hidden'));
}

// ===== Typewriter that uses only data-text =====
function typewriter(el, text, speed = 18, delay = 400) {
    if (!el || !text) return;
    el.textContent = '';
    let i = 0;
    const tick = () => {
        el.textContent = text.slice(0, i++);
        if (i <= text.length) requestAnimationFrame(tick);
    };
    setTimeout(tick, delay);
}

window.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.getElementById('nameTyper');
    const taglineEl = document.getElementById('tagline');
    typewriter(nameEl, nameEl?.dataset.text, 16, 150);
    typewriter(taglineEl, taglineEl?.dataset.text, 18, 400);
});

// ===== Projects data =====
const projects = [
    {
        title: "AI Voice Assistant",
        status: "Featured",
        summary:
            "Answers real phone calls, captures leads, and books appointments. Built with GPT-4, Twilio Voice, and Flask.",
        tags: ["GPT-4", "Twilio", "Flask", "Python"],
        links: {} // add demo/repo later
    },
    {
        title: "Afsona",
        status: "In Progress",
        summary:
            "Multilingual storytelling web app with a clean, responsive UI and smooth UX.",
        tags: ["JavaScript", "Tailwind", "Vite", "Vercel"],
        links: { demo: "https://afsona.vercel.app", repo: "https://github.com/Nick0422/afsona" }
    },
    {
        title: "Car Rental Platform",
        status: "In Progress",
        summary:
            "Full-stack app for listing and booking cars. Responsive UI, categories, image uploads, and clean routing.",
        tags: ["Node", "Express", "REST API", "Tailwind CSS", "CRUD"],
        links: {}
    },
    {
        title: "CirrusWire — AI & Tech News Shorts",
        status: "In Progress",
        summary:
            "YouTube Shorts brand covering AI/tech updates. Branding, scripting, and 4+ videos; building automation to scale.",
        tags: ["Branding", "Scripting", "Video Production"],
        links: { demo: "https://youtube.com/@CirrusWire" }
    }
];

// ===== Render helper (Featured + In Progress badges, non-overlapping) =====
function renderProjects(gridEl, items) {
    if (!gridEl) return;
    gridEl.innerHTML = items
        .map((p) => {
            const techTags = p.tags
                .map(
                    (t) =>
                        `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`
                )
                .join("");

            const isFeatured = p.status === "Featured";
            const isInProgress = (p.status || "").toLowerCase().includes("progress");

            return `
  <article class="relative project-card reveal rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl overflow-hidden transition-all duration-700 will-change-transform hover:border-white/20 hover:bg-white/10">
    ${isFeatured ? `<span class="absolute top-2 left-2 md:top-3 md:left-3 z-10 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 px-2.5 py-0.5 text-[10px] md:text-xs font-semibold text-black">Featured</span>` : ''}
    ${isInProgress ? `<span class="absolute top-2 right-2 md:top-3 md:right-3 z-10 rounded-full bg-yellow-400/90 px-2.5 py-0.5 text-[10px] md:text-xs font-semibold text-black">In Progress</span>` : ''}

    <div class="flex items-start justify-between gap-3">
      <h3 class="mt-8 md:mt-10 text-lg font-semibold">${p.title}</h3>
    </div>

    <p class="mt-2 text-sm text-white/70">${p.summary}</p>
    <div class="mt-4 flex flex-wrap gap-2">${techTags}</div>
    <div class="mt-5 flex flex-wrap gap-2">
      ${p.links?.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : ""}
      ${p.links?.repo ? `<a href="${p.links.repo}" target="_blank" rel="noopener" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ""}
      ${(!p.links?.demo && !p.links?.repo) ? `<span class="rounded-md px-3 py-1.5 text-sm text-white/50">Details coming soon</span>` : ""}
    </div>
  </article>
`;
        })
        .join("");
}

// ===== Scroll-in reveal =====
function revealOnScroll(selector = ".project-card", options = { threshold: 0.15 }) {
    const items = document.querySelectorAll(selector);
    if (!("IntersectionObserver" in window) || !items.length) {
        items.forEach((el) => {
            el.style.opacity = 1;
            el.style.transform = "none";
        });
        return;
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("!opacity-100", "!translate-y-0");
                obs.unobserve(entry.target);
            }
        });
    }, options);
    items.forEach((el) => obs.observe(el));
}

// ===== Init projects =====
window.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("projectsGrid");
    renderProjects(grid, projects);
    requestAnimationFrame(() => revealOnScroll());
});
