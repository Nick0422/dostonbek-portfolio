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
    typewriter(document.getElementById('nameTyper'), document.getElementById('nameTyper')?.dataset.text, 150);
    typewriter(document.getElementById('tagline'), document.getElementById('tagline')?.dataset.text, 400);
});

// ===== Projects data (Featured will be auto-used in hero and excluded from grid) =====
const projects = [
    {
        title: "AI Voice Assistant",
        status: "Featured",
        summary: "Answers real phone calls, captures leads, and books appointments. Built with GPT-4, Twilio Voice, and Flask.",
        img: "/images/ai-voice.jpg",
        tags: ["GPT-4", "Twilio", "Flask", "Python"],
        links: {} // add demo/repo later
    },
    {
        title: "Afsona",
        status: "Live",
        summary: "A fully built and deployed project delivering a smooth user experience and robust functionality.",
        img: "/images/afsona.jpg",
        tags: ["JavaScript", "Tailwind CSS", "Vite", "Vercel"],
        links: { demo: "https://afsona.vercel.app", repo: "https://github.com/Nick0422/afsona" }
    },
    {
        title: "Car Rental Platform",
        status: "In Progress",
        summary: "Full-stack app for listing and booking cars. Responsive UI, categories, image uploads, and clean routing.",
        img: "/images/car-rental.jpg",
        tags: ["Node", "Express", "REST API", "Tailwind CSS", "CRUD"],
        links: {}
    },
    {
        title: "CirrusWire — AI & Tech News Shorts",
        status: "In Progress",
        summary: "YouTube Shorts brand delivering AI/tech updates. Branding, scripting, and 4+ videos; building automation to scale.",
        img: "/images/cirruswire.jpg",
        tags: ["Branding", "Scripting", "Video"],
        links: { demo: "https://youtube.com/@CirrusWire" }
    },
    {
        title: "This Portfolio",
        status: "Live",
        summary: "The site you’re viewing. Built with Vite + Tailwind, deployed on Vercel, with clean SEO and DX.",
        img: "/images/portfolio.jpg",
        tags: ["Tailwind", "Vite", "Vercel"],
        links: { repo: "https://github.com/Nick0422/dostonbek-portfolio" }
    }
];

// ===== Status -> badge classes (flow layout, no absolute) =====
function badgeClasses(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('featured')) return 'bg-gradient-to-r from-purple-400 to-cyan-400 text-black';
    if (s.includes('live')) return 'bg-green-600 text-white';
    if (s.includes('progress')) return 'bg-yellow-700 text-white';
    return 'bg-white/20 text-white';
}

// ===== Featured (dynamic) =====
function renderFeatured() {
    const box = document.getElementById('featuredCard');
    if (!box) return;

    const featured = projects.find(p => (p.status || '').toLowerCase().includes('featured'));
    if (!featured) {
        box.innerHTML = `<div class="rounded-lg border border-white/10 bg-white/5 p-4 text-white/60">No featured project yet.</div>`;
        return;
    }

    const badge = `<span class="rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClasses(featured.status)}">${featured.status}</span>`;
    const img = featured.img
        ? `<img src="${featured.img}" alt="${featured.title}" class="h-40 w-full rounded-lg object-cover" onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden');">`
        : '';
    const imgFallback = `<div class="hidden h-40 w-full rounded-lg bg-gradient-to-br from-white/10 to-white/5"></div>`;

    box.innerHTML = `
    <div class="rounded-lg border border-white/10 bg-white/5 p-4">
      <div class="mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2">${badge}</div>
        <!-- right side empty (room for future links) -->
      </div>

      <div class="mb-4">
        ${img}${imgFallback}
      </div>

      <h3 class="text-lg font-semibold">${featured.title}</h3>
      <p class="mt-2 text-white/70">${featured.summary}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        ${featured.links?.demo ? `<a href="${featured.links.demo}" target="_blank" rel="noopener" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : ''}
        ${featured.links?.repo ? `<a href="${featured.links.repo}" target="_blank" rel="noopener" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ''}
        ${(!featured.links?.demo && !featured.links?.repo) ? `<a href="#projects" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">See details</a>` : ''}
      </div>
    </div>
  `;
}

// ===== Projects (exclude featured) =====
function renderProjects(grid, items) {
    if (!grid) return;

    const list = items.filter(p => !(p.status || '').toLowerCase().includes('featured'));
    grid.innerHTML = list.map(p => {
        const badge = `<span class="rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClasses(p.status)}">${p.status || ''}</span>`;
        const techTags = (p.tags || []).map(t =>
            `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`
        ).join('');

        const img = p.img
            ? `<img src="${p.img}" alt="${p.title}" class="h-40 w-full rounded-lg object-cover" onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden');">`
            : '';
        const imgFallback = `<div class="hidden h-40 w-full rounded-lg bg-gradient-to-br from-white/10 to-white/5"></div>`;

        const buttons = [
            p.links?.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : '',
            p.links?.repo ? `<a href="${p.links.repo}" target="_blank" rel="noopener" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ''
        ].filter(Boolean).join('');

        // NOTE: no absolute positioning anywhere — badges live in their own row
        return `
      <article class="project-card reveal rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl transition-all duration-700 hover:border-white/20 hover:bg-white/10">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">${badge}</div>
          <!-- keep right empty for future badges or links -->
        </div>

        <div class="mb-4">
          ${img}${imgFallback}
        </div>

        <h3 class="text-lg font-semibold">${p.title}</h3>
        <p class="mt-2 text-sm text-white/70">${p.summary}</p>

        <div class="mt-4 flex flex-wrap gap-2">${techTags}</div>

        <div class="mt-5 flex flex-wrap gap-2">
          ${buttons || `<span class="rounded-md px-3 py-1.5 text-sm text-white/50">Details coming soon</span>`}
        </div>
      </article>
    `;
    }).join('');
}

// ===== Reveal on scroll =====
function revealOnScroll(selector = ".project-card", options = { threshold: 0.15 }) {
    const items = document.querySelectorAll(selector);
    if (!("IntersectionObserver" in window) || !items.length) {
        items.forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
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

// ===== Init =====
window.addEventListener("DOMContentLoaded", () => {
    renderFeatured();
    const grid = document.getElementById("projectsGrid");
    renderProjects(grid, projects);
    requestAnimationFrame(() => revealOnScroll());
});
