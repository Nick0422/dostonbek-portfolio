// ===== Config =====
const SHOW_FEATURED_IN_GRID = true; // set false to hide the Featured card from the grid

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

// ===== Projects data (3 total; no YouTube) =====
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

// ===== Status -> badge classes =====
function badgeClasses(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('featured')) return 'bg-gradient-to-r from-purple-400 to-cyan-400 text-black';
    if (s.includes('live')) return 'bg-green-600 text-white';
    if (s.includes('progress')) return 'bg-yellow-700 text-white';
    return 'bg-white/20 text-white';
}
function statusDot(status) {
    const s = (status || '').toLowerCase();
    const base = 'inline-block h-2 w-2 rounded-full';
    if (s.includes('featured')) return `<span class="${base} bg-cyan-300"></span>`;
    if (s.includes('live')) return `<span class="${base} bg-green-300"></span>`;
    if (s.includes('progress')) return `<span class="${base} bg-yellow-300"></span>`;
    return `<span class="${base} bg-white/40"></span>`;
}

// ===== Featured (dynamic) =====
function renderFeatured() {
    const box = document.getElementById('featuredCard');
    if (!box) return;

    const featured = projects.find(p => (p.status || '').toLowerCase().includes('featured'));
    if (!featured) {
        box.innerHTML = `<div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/60">No featured project yet.</div>`;
        return;
    }

    const badge = `
    <span class="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClasses(featured.status)}">
      ${statusDot(featured.status)} ${featured.status}
    </span>`;

    const img = featured.img
        ? `<img src="${featured.img}" alt="${featured.title}" loading="lazy"
         class="h-44 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
         onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden');">`
        : '';
    const imgFallback = `<div class="hidden h-44 w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5"></div>`;

    box.innerHTML = `
    <div class="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10">
      <div class="mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2">${badge}</div>
      </div>

      <div class="mb-4">
        ${img}${imgFallback}
      </div>

      <h3 class="text-lg font-semibold tracking-tight">${featured.title}</h3>
      <p class="mt-2 text-white/70">${featured.summary}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        ${featured.links?.demo ? `<a href="${featured.links.demo}" target="_blank" rel="noopener"
            class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30">Live demo</a>` : ''}
        ${featured.links?.repo ? `<a href="${featured.links.repo}" target="_blank" rel="noopener"
            class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">Source</a>` : ''}
        ${(!featured.links?.demo && !featured.links?.repo) ? `<a href="#projects"
            class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30">See details</a>` : ''}
      </div>
    </div>
  `;
}

// ===== Projects (grid) =====
function buildProjectCard(p) {
    const badge = `
    <span class="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClasses(p.status)}">
      ${statusDot(p.status)} ${p.status || ''}
    </span>`;
    const techTags = (p.tags || [])
        .map(t => `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`)
        .join('');

    const img = p.img
        ? `<img src="${p.img}" alt="${p.title}" loading="lazy"
         class="h-40 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
         onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden');">`
        : '';
    const imgFallback = `<div class="hidden h-40 w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5"></div>`;

    const titleHref = p.links?.demo || p.links?.repo || null;
    const titleEl = titleHref
        ? `<a href="${titleHref}" target="_blank" rel="noopener"
         class="focus:outline-none focus:ring-2 focus:ring-white/30">${p.title}</a>`
        : p.title;

    const buttons = [
        p.links?.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener"
        class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30">Live demo</a>` : '',
        p.links?.repo ? `<a href="${p.links.repo}" target="_blank" rel="noopener"
        class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">Source</a>` : ''
    ].filter(Boolean).join('');

    return `
    <article class="project-card reveal opacity-0 translate-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl transition-all duration-700 hover:border-white/20 hover:bg-white/10 focus-within:border-white/25">
      <div class="mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2">${badge}</div>
      </div>
      <div class="group mb-4">
        ${img}${imgFallback}
      </div>
      <h3 class="text-lg font-semibold tracking-tight">${titleEl}</h3>
      <p class="mt-2 text-sm text-white/70">${p.summary}</p>
      <div class="mt-4 flex flex-wrap gap-2">${techTags}</div>
      <div class="mt-5 flex flex-wrap gap-2">
        ${buttons || `<span class="rounded-md px-3 py-1.5 text-sm text-white/50">Details coming soon</span>`}
      </div>
    </article>
  `;
}

function renderProjects(grid, items) {
    if (!grid) return;
    let list = items;
    if (!SHOW_FEATURED_IN_GRID) {
        list = items.filter(p => !(p.status || '').toLowerCase().includes('featured'));
    }
    list = list.slice(0, 3);
    grid.innerHTML = list.map(buildProjectCard).join('');
}

// ===== Rename Projects heading -> Recent Projects =====
function renameProjectsHeading() {
    const el =
        document.querySelector('#projectsTitle') ||
        document.querySelector('#projects h2') ||
        document.querySelector('section#projects h2') ||
        document.querySelector('[data-section="projects"] h2');
    if (el) el.textContent = 'Recent Projects';
}

// ===== Inject Google Data Analytics badge (no HTML edits) =====
function injectGoogleBadge() {
    const BADGE_HTML = `
    <span class="rounded-full bg-green-50/20 text-green-200 border border-green-300/30 px-3 py-1 text-xs">
      Google Data Analytics — pending
    </span>`;
    // Preferred containers if they exist:
    const target =
        document.getElementById('heroBadges') ||
        document.querySelector('.hero-badges') ||
        document.querySelector('#hero .badges') ||
        document.querySelector('[data-section="hero"] .badges');

    if (target) {
        target.insertAdjacentHTML('beforeend', BADGE_HTML);
        return;
    }

    // Fallback: insert after the first H1 on the page (usually your name)
    const h1 =
        document.querySelector('#hero h1') ||
        document.querySelector('[data-section="hero"] h1') ||
        document.querySelector('h1');
    if (h1 && h1.parentElement) {
        const wrap = document.createElement('div');
        wrap.className = 'mt-4 flex flex-wrap gap-2';
        wrap.innerHTML = BADGE_HTML;
        h1.parentElement.appendChild(wrap);
    }
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
    injectGoogleBadge();
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
