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
    typewriter(
        document.getElementById('nameTyper'),
        document.getElementById('nameTyper')?.dataset.text,
        150
    );
    typewriter(
        document.getElementById('tagline'),
        document.getElementById('tagline')?.dataset.text,
        400
    );
});

// ===== Projects data (Featured auto-injected into hero, excluded from grid) =====
// Kept: 3 total projects. CirrusWire removed.
const projects = [
    {
        title: "AI Voice Assistant",
        status: "Featured",
        summary:
            "Answers real phone calls, captures leads, and books appointments. Built with GPT-4, Twilio Voice, and Flask.",
        img: "/images/ai-voice.jpg",
        tags: ["GPT-4", "Twilio", "Flask", "Python"],
        links: {} // add demo/repo later
    },
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
        title: "This Portfolio",
        status: "Live",
        summary:
            "The site you’re viewing. Built with Vite + Tailwind, deployed on Vercel, with clean SEO and DX.",
        img: "/images/portfolio.jpg",
        tags: ["Tailwind", "Vite", "Vercel"],
        links: { repo: "https://github.com/Nick0422/dostonbek-portfolio" }
    }
];

// ===== Status -> badge classes (layout-driven, no absolute positioning) =====
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

    // Exclude the one marked Featured. Since we only have 3 total, this will render 2.
    const list = items.slice(0, 3); // include featured too, show all 3

    grid.innerHTML = list.map(p => {
        const badge = `<span class="rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClasses(p.status)}">${p.status || ''}</span>`;
        const techTags = (p.tags || [])
            .map(t => `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`)
            .join('');

        const img = p.img
            ? `<img src="${p.img}" alt="${p.title}" class="h-40 w-full rounded-lg object-cover" onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden');">`
            : '';
        const imgFallback = `<div class="hidden h-40 w-full rounded-lg bg-gradient-to-br from-white/10 to-white/5"></div>`;

        const buttons = [
            p.links?.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : '',
            p.links?.repo ? `<a href="${p.links.repo}" target="_blank" rel="noopener" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ''
        ].filter(Boolean).join('');

        return `
      <article class="project-card reveal rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl transition-all duration-700 hover:border-white/20 hover:bg-white/10">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">${badge}</div>
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

// ===== Rename Projects heading -> Recent Projects (works without HTML edits) =====
function renameProjectsHeading() {
    const el =
        document.querySelector('#projectsTitle') ||
        document.querySelector('#projects h2') ||
        document.querySelector('section#projects h2') ||
        document.querySelector('[data-section="projects"] h2');

    if (el) el.textContent = 'Recent Projects';
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
    renameProjectsHeading();
    const grid = document.getElementById("projectsGrid");
    renderProjects(grid, projects);
    requestAnimationFrame(() => revealOnScroll());
});

// ===== Contact form (Formspree AJAX) =====
window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    const submitBtn = document.getElementById('contactSubmit');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        statusEl.textContent = '';
        submitBtn.disabled = true;

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (res.ok) {
                form.reset();
                statusEl.className = 'text-sm text-green-400';
                statusEl.textContent = 'Thanks! Your message was sent.';
            } else {
                const data = await res.json().catch(() => ({}));
                const msg = data.errors?.map((e) => e.message).join(', ') || 'Something went wrong. Please try again.';
                statusEl.className = 'text-sm text-red-400';
                statusEl.textContent = `Message failed: ${msg}`;
            }
        } catch (err) {
            statusEl.className = 'text-sm text-red-400';
            statusEl.textContent = 'Network error. Please try again.';
        } finally {
            submitBtn.disabled = false;
        }
    });
});
