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
        // FEATURED
        title: "AI Phone Assistant (In Progress)",
        summary:
            "Answers real phone calls, handles FAQs, captures leads, and books appointments automatically. Built with Flask, Twilio Voice, and OpenAI. Preparing public repo and live demo.",
        tags: ["Python", "Flask", "Twilio", "OpenAI", "Vercel"],
        links: { details: "#projects" },
        featured: true
    },
    {
        title: "Afsona",
        summary:
            "A fully built and deployed project delivering a smooth user experience and robust functionality. Live and ready to use.",
        tags: ["JavaScript", "Tailwind CSS", "Vite", "Vercel"],
        links: { demo: "https://afsona.vercel.app", repo: "https://github.com/Nick0422/afsona" }
    },
    {
        title: "Car Rental Platform (In Progress)",
        summary:
            "Full-stack app for listing and booking cars with responsive UI, categories, image uploads, and clean routing. Backend & DB integration in progress.",
        tags: ["Node", "Express", "REST API", "Tailwind CSS", "CRUD"],
        links: { details: "#projects" }
    },
    {
        title: "CirrusWire — AI & Tech News Shorts (In Progress)",
        summary:
            "YouTube Shorts brand for daily AI and tech updates. Branding, scripting, and 4+ videos done; building automation workflow to scale.",
        tags: ["Branding", "Scripting", "Video Production"],
        links: { details: "#projects" }
    }
];

// ===== Render helper (Featured + In Progress badge) =====
function renderProjects(gridEl, items) {
    if (!gridEl) return;
    gridEl.innerHTML = items
        .map(p => {
            const tags = p.tags
                .map(t => `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`)
                .join("");

            const inProgress = p.title.includes("(In Progress)");
            const cleanTitle = p.title.replace(" (In Progress)", "");
            const featured = !!p.featured;

            return `
  <article class="project-card reveal relative rounded-2xl border border-white/10 ${featured ? 'ring-1 ring-purple-400/40 shadow-2xl' : ''} bg-white/5 p-5 transition-all duration-700 will-change-transform hover:border-white/20 hover:bg-white/10">
    ${featured ? `<span class="absolute -top-3 left-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 px-2 py-0.5 text-xs font-semibold text-black">Featured</span>` : ''}
    ${inProgress ? `<span class="absolute top-3 right-3 rounded-full bg-yellow-400/90 px-2 py-0.5 text-xs font-semibold text-black">In Progress</span>` : ""}
    <div class="flex items-start justify-between gap-3">
      <h3 class="text-lg font-semibold">${cleanTitle}</h3>
    </div>
    <p class="mt-2 text-sm text-white/70">${p.summary}</p>
    <div class="mt-4 flex flex-wrap gap-2">${tags}</div>
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
        items.forEach(el => {
            el.style.opacity = 1;
            el.style.transform = "none";
        });
        return;
    }
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("!opacity-100", "!translate-y-0");
                obs.unobserve(entry.target);
            }
        });
    }, options);
    items.forEach(el => obs.observe(el));
}

// ===== Init projects =====
window.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("projectsGrid");
    renderProjects(grid, projects);
    requestAnimationFrame(() => revealOnScroll());
});
