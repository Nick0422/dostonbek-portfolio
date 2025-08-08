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
    console.log('main.js loaded'); // Debug

    const nameEl = document.getElementById('nameTyper');
    const taglineEl = document.getElementById('tagline');

    typewriter(nameEl, nameEl?.dataset.text, 16, 150);
    typewriter(taglineEl, taglineEl?.dataset.text, 18, 400);
});

// ===== Projects data =====
const projects = [
    {
        title: "AI Phone Assistant",
        summary:
            "Real phone calls + natural voice. Answers FAQs, captures leads, and books appointments. Built with GPT-4, Twilio, Flask.",
        tags: ["GPT-4", "Twilio", "Flask", "Python"],
        links: {
            demo: "#",          // Replace with your demo URL
            repo: "#",          // Replace with your GitHub repo
            details: "#projects"
        }
    },
    {
        title: "Sales Insights Dashboard (Concept)",
        summary:
            "Lightweight dashboard that aggregates store KPIs, daily goals, and churn risk from CSV exports. Built to learn charts + ETL.",
        tags: ["Python", "Pandas", "Chart.js"],
        links: { demo: "#", repo: "#", details: "#projects" }
    },
    {
        title: "AI FAQ Chatbot (Prototype)",
        summary:
            "Embeddable website chatbot that answers common questions from a docs page or a Google Doc. Prompting + retrieval basics.",
        tags: ["JS", "OpenAI API", "RAG-lite"],
        links: { demo: "#", repo: "#", details: "#projects" }
    }
];

// ===== Render helper =====
function renderProjects(gridEl, items) {
    if (!gridEl) return;
    gridEl.innerHTML = items
        .map(p => {
            const tags = p.tags
                .map(t => `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`)
                .join("");

            return `
        <article class="project-card reveal rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl transition-all duration-700 will-change-transform hover:border-white/20 hover:bg-white/10">
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-lg font-semibold">${p.title}</h3>
          </div>
          <p class="mt-2 text-sm text-white/70">${p.summary}</p>
          <div class="mt-4 flex flex-wrap gap-2">${tags}</div>
          <div class="mt-5 flex flex-wrap gap-2">
            ${p.links.demo ? `<a href="${p.links.demo}" class="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Live demo</a>` : ""}
            ${p.links.repo ? `<a href="${p.links.repo}" class="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10">Source</a>` : ""}
            ${p.links.details ? `<a href="${p.links.details}" class="rounded-md px-3 py-1.5 text-sm text-white/80 hover:text-white">Details</a>` : ""}
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
