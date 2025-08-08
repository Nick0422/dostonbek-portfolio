// ===== Mobile menu toggle =====
document.getElementById('menuBtn')?.addEventListener('click', () =>
    document.getElementById('menuMobile')?.classList.toggle('hidden')
);

// ===== Typewriter =====
function typewriter(el, text, delay = 150) {
    if (!el || !text) return;
    let i = 0;
    el.textContent = '';
    function tick() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i++);
            requestAnimationFrame(tick);
        }
    }
    setTimeout(tick, delay);
}

window.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.getElementById('nameTyper');
    const taglineEl = document.getElementById('tagline');
    typewriter(nameEl, nameEl?.dataset.text, 150);
    typewriter(taglineEl, taglineEl?.dataset.text, 400);
});

// ===== Projects (4 unique; hero features AI Voice Assistant separately) =====
const projects = [
    {
        title: "Afsona",
        status: "Live",
        summary:
            "A fully built and deployed project delivering a smooth user experience and robust functionality.",
        img: "/images/afsona.jpg",
        tags: ["JavaScript", "Tailwind CSS", "Vite", "Vercel"],
        links: { demo: "https://afsona.vercel.app", repo: "https://github.com/Nick0422/afsona" }
    },
    {
        title: "Car Rental Platform",
        status: "In Progress",
        summary:
            "Full-stack app for listing and booking cars. Responsive UI, categories, image uploads, and clean routing.",
        img: "/images/car-rental.jpg",
        tags: ["Node", "Express", "REST API", "Tailwind CSS", "CRUD"],
        links: {}
    },
    {
        title: "CirrusWire — AI & Tech News Shorts",
        status: "In Progress",
        summary:
            "YouTube Shorts brand delivering AI/tech updates. Branding, scripting, and 4+ videos; building automation to scale.",
        img: "/images/cirruswire.jpg",
        tags: ["Branding", "Scripting", "Video"],
        links: { demo: "https://youtube.com/@CirrusWire" }
    },
    {
        title: "This Portfolio",
        status: "Live",
        summary:
            "The site you’re viewing. Built with Vite + Tailwind, deployed on Vercel, with clean SEO and DX.",
        img: "/images/portfolio.jpg",
        tags: ["Tailwind", "Vite", "Vercel"],
        links: { repo: "https://github.com/Nick0422/dostonbek-portfolio" }
    }
];

// ===== Map status -> badge styles =====
function statusBadge(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('live')) return 'bg-green-600 text-white';
    if (s.includes('progress')) return 'bg-yellow-700 text-white';
    if (s.includes('featured')) return 'bg-gradient-to-r from-purple-400 to-cyan-400 text-black';
    return 'bg-white/20 text-white';
}

// ===== Render projects (badge lifted + title padding to avoid overlap) =====
function renderProjects(grid, items) {
    if (!grid) return;
    grid.innerHTML = items
        .map((p) => {
            const badgeClass = statusBadge(p.status);
            const techTags = (p.tags || [])
                .map((t) => `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`)
                .join('');

            const buttons = [
                p.links?.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : '',
                p.links?.repo ? `<a href="${p.links.repo}" target="_blank" rel="noopener" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ''
            ].filter(Boolean).join('');

            const imgTag = p.img
                ? `<img src="${p.img}" alt="${p.title}" class="h-40 w-full rounded-lg object-cover" onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden');">`
                : '';

            return `
      <article class="relative project-card reveal rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl overflow-hidden transition-all duration-700 will-change-transform hover:border-white/20 hover:bg-white/10">
        <!-- Lifted badge so it doesn’t collide with title -->
        <span class="pointer-events-none absolute top-2 left-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-md ${badgeClass} translate-y-[-6px]">
          ${p.status || ''}
        </span>

        <div class="mb-4">
          ${imgTag}
          <div class="hidden h-40 w-full rounded-lg bg-gradient-to-br from-white/10 to-white/5"></div>
        </div>

        <!-- Extra padding on title to avoid badge area -->
        <h3 class="pt-2 text-lg font-semibold">${p.title}</h3>
        <p class="mt-2 text-sm text-white/70">${p.summary}</p>

        <div class="mt-4 flex flex-wrap gap-2">${techTags}</div>

        <div class="mt-5 flex flex-wrap gap-2">
          ${buttons || `<span class="rounded-md px-3 py-1.5 text-sm text-white/50">Details coming soon</span>`}
        </div>
      </article>
      `;
        })
        .join('');
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

// ===== Init =====
window.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("projectsGrid");
    renderProjects(grid, projects);
    requestAnimationFrame(() => revealOnScroll());
});

