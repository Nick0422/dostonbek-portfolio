// Mobile menu toggle
document.getElementById('menuBtn')?.addEventListener('click', () =>
    document.getElementById('menuMobile')?.classList.toggle('hidden')
);

// Typewriter
function typewriter(el, text, delay = 150) {
    if (!el) return;
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
    typewriter(document.getElementById('nameTyper'), document.getElementById('nameTyper')?.dataset.text);
    typewriter(document.getElementById('tagline'), document.getElementById('tagline')?.dataset.text, 400);
});

// Project data
const projects = [
    { title: "AI Voice Assistant", status: "Featured", summary: "Real phone calls + natural voice...", tags: ["GPT-4", "Twilio", "Flask", "Python"], links: {} },
    { title: "Afsona", status: "In Progress", summary: "Multilingual storytelling web app...", tags: ["React", "Node.js", "MongoDB"], links: {} },
];

// Render projects
function renderProjects(grid, items) {
    grid.innerHTML = items.map(p => {
        const badge = p.status === "Featured"
            ? `<span class="absolute top-2 left-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 px-2 py-0.5 text-[9px] font-semibold text-black shadow-md">${p.status}</span>`
            : `<span class="absolute top-2 right-2 rounded-full bg-yellow-700 px-2 py-0.5 text-[9px] font-semibold text-white shadow-md">${p.status}</span>`;
        const tags = p.tags.map(t => `<span class="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">${t}</span>`).join('');
        return `
        <article class="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
            ${badge}
            <h3 class="mt-8 text-lg font-semibold">${p.title}</h3>
            <p class="mt-2 text-sm text-white/70">${p.summary}</p>
            <div class="mt-4 flex flex-wrap gap-2">${tags}</div>
        </article>`;
    }).join('');
}
window.addEventListener('DOMContentLoaded', () => renderProjects(document.getElementById('projectsGrid'), projects));
