// ===== Config =====
const SHOW_FEATURED_IN_GRID = true; // include featured card in grid as well

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

// ===== Projects data =====
const projects = [
    {
        title: "AI Voice Assistant",
        status: "Featured",
        summary:
            "Answers real phone calls, captures leads, and books appointments. Built with GPT-4, Twilio Voice, and Flask.",
        img: "/images/ai-voice.jpg",
        tags: ["GPT-4", "Twilio", "Flask", "Python"],
        links: {}
    },
    {
        title: "Afsona",
        status: "Live",
        summary:
            "A fully built and deployed project delivering a smooth user experience and robust functionality.",
        img: "/images/afsona.png",
        tags: ["JavaScript", "Tailwind CSS", "Vite", "Vercel"],
        links: { demo: "https://afsona.vercel.app", repo: "https://github.com/Nick0422/afsona" }
    },
    {
        title: "This Portfolio",
        status: "Live",
        summary:
            "The site you’re viewing. Built with Vite + Tailwind, deployed on Vercel, with clean SEO and DX.",
        img: "/images/portfolio.png",
        tags: ["Tailwind", "Vite", "Vercel"],
        links: { repo: "https://github.com/Nick0422/dostonbek-portfolio" }
    }
];

// ===== Badge colors =====
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
        box.innerHTML = `<div class="rounded-lg border border-white/10 bg-white/5 p-4 text-white/60">No featured project yet.</div>`;
        return;
    }

    const badge = `
    <span class="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClasses(featured.status)}">
      ${statusDot(featured.status)} ${featured.status}
    </span>`;

    box.innerHTML = `
    <div class="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10">
      <div class="mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2">${badge}</div>
      </div>
      ${featured.img ? `<img src="${featured.img}" alt="${featured.title}" class="h-44 w-full rounded-xl object-cover mb-4">` : ''}
      <h3 class="text-lg font-semibold tracking-tight">${featured.title}</h3>
      <p class="mt-2 text-white/70">${featured.summary}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        ${featured.links?.demo ? `<a href="${featured.links.demo}" target="_blank" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : ''}
        ${featured.links?.repo ? `<a href="${featured.links.repo}" target="_blank" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ''}
      </div>
    </div>
  `;
}

// ===== Projects Grid =====
function renderProjects(grid, items) {
    if (!grid) return;
    let list = items;
    if (!SHOW_FEATURED_IN_GRID) list = items.filter(p => !(p.status || '').toLowerCase().includes('featured'));
    list = list.slice(0, 3);

    grid.innerHTML = list.map(p => `
    <article class="project-card reveal opacity-0 translate-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl transition-all duration-700 hover:border-white/20 hover:bg-white/10">
      <div class="mb-3 flex items-center justify-between">
        <span class="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClasses(p.status)}">${statusDot(p.status)} ${p.status}</span>
      </div>
      ${p.img ? `<img src="${p.img}" alt="${p.title}" class="h-40 w-full rounded-xl object-cover mb-4">` : ''}
      <h3 class="text-lg font-semibold">${p.title}</h3>
      <p class="mt-2 text-sm text-white/70">${p.summary}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        ${(p.tags || []).map(t => `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`).join('')}
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        ${p.links?.demo ? `<a href="${p.links.demo}" target="_blank" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : ''}
        ${p.links?.repo ? `<a href="${p.links.repo}" target="_blank" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ''}
      </div>
    </article>
  `).join('');
}

// ===== Rename Projects heading =====
function renameProjectsHeading() {
    const el =
        document.querySelector('#projectsTitle') ||
        document.querySelector('#projects h2') ||
        document.querySelector('section#projects h2');
    if (el) el.textContent = 'Recent Projects';
}

// ===== Inject Google Badge =====
function injectGoogleBadge() {
    const BADGE_HTML = `
    <span class="rounded-full bg-green-50/20 text-green-200 border border-green-300/30 px-3 py-1 text-xs">
      Google Data Analytics Certificate — pending
    </span>`;
    const target =
        document.getElementById('heroBadges') ||
        document.querySelector('.hero-badges') ||
        document.querySelector('#hero .badges');
    if (target) {
        target.insertAdjacentHTML('beforeend', BADGE_HTML);
        return;
    }
    const h1 = document.querySelector('#hero h1') || document.querySelector('h1');
    if (h1 && h1.parentElement) {
        const wrap = document.createElement('div');
        wrap.className = 'mt-4 flex flex-wrap gap-2';
        wrap.innerHTML = BADGE_HTML;
        h1.parentElement.appendChild(wrap);
    }
}

// ===== About Section Injection =====
function updateAbout() {
    const about = document.getElementById('aboutText') || document.querySelector('#about p');
    if (!about) return;
    about.innerHTML = `
    I’m <strong>Dostonbek Davlatov</strong> — a technology-driven professional with a passion for bridging the gap between <strong>people, business, and technology</strong>. 
    My journey began in <strong>South Korea</strong>, where I studied <strong>Computer Science</strong> and built a strong foundation in programming, data structures, and problem-solving.
    <br><br>
    After moving to the <strong>United States</strong>, I joined <strong>AT&T</strong>, where I advanced from <strong>Sales Representative</strong> to <strong>Assistant Manager</strong> within just two years — leading one of Northern California’s top-performing <strong>Battleship stores</strong>.
    This experience strengthened my leadership, communication, and analytical skills, allowing me to manage people, drive innovation, and deliver consistent results under pressure.
    <br><br>
    I’m currently completing the <strong>Google Data Analytics Professional Certificate</strong> and have finished <strong>Angela Yu’s 100 Days of Python Challenge</strong>, expanding my skills in <strong>Python, data analysis, and automation</strong>.
    <br><br>
    Fluent in <strong>English, Korean, Russian, and Uzbek</strong>, I bring an international mindset and strong communication skills. Outside of work, I stay active through <strong>soccer and fitness</strong> and love solving real-world problems that challenge my creativity and logic.
    <br><br>
    With experience in both <strong>tech and sales</strong>, I bring a rare mix of <strong>analytical thinking, customer understanding, and leadership</strong> — ideal for roles that combine <strong>technical strategy</strong> with <strong>human connection</strong>.
  `;
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
    updateAbout();
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
