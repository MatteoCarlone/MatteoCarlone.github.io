// content/projects.js
// Projects grid con cover, descrizione, tag e fallback automatico se l'immagine manca

window.ProjectsContent = {
  projects: [
    {
      title: "Autonomous Navigation System",
      desc: "Sistema completo di navigazione autonoma per robot mobili con SLAM e path planning avanzato.",
      cover: "/content/project-covers/navigation.png",
      tags: ["ROS2", "C++", "SLAM", "Navigation"]
    },
    {
      title: "Vision-Based Manipulation",
      desc: "Manipolazione robotica guidata da computer vision per pick-and-place industriale.",
      cover: "/content/project-covers/vision.png",
      tags: ["Python", "OpenCV", "ROS", "Control"]
    },
    {
      title: "Multi-Robot Coordination",
      desc: "Framework per coordinazione multi-robot con comunicazione distribuita e task allocation.",
      cover: "/content/project-covers/multi-robot.png",
      tags: ["ROS2", "Python", "Distributed", "Planning"]
    },
    {
      title: "Simulation Environment",
      desc: "Ambiente di simulazione custom per testing di algoritmi robotici con physics realistici.",
      cover: "/content/project-covers/simulation.png",
      tags: ["Gazebo", "C++", "Simulation", "Testing"]
    },
    {
      title: "Real-time SLAM",
      desc: "Implementazione ottimizzata di Visual-SLAM per operazioni real-time su hardware embedded.",
      cover: "/content/project-covers/rt-slam.png",
      tags: ["C++", "OpenCV", "SLAM", "Embedded"]
    },
    {
      title: "ROS2 Toolchain",
      desc: "Suite di strumenti e utilities per sviluppo e debugging di applicazioni ROS2.",
      cover: "", // ⇠ nessuna immagine: useremo il fallback
      tags: ["ROS2", "Python", "DevOps", "Tooling"]
    }
  ],

  card(p) {
    // se 'cover' è vuoto, non creo il <img> (mostro direttamente il placeholder)
    const coverHtml = (p.cover && p.cover.trim())
      ? `<div class="project-cover-wrap"><img src="${p.cover}" alt="${p.title}" class="project-cover" loading="lazy"></div>`
      : `<div class="project-cover project-cover--empty" aria-hidden="true"></div>`;

    return `
      <div class="project-card">
        ${coverHtml}
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  },

  render() {
    return `
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Projects</h2>
        </div>
        <div class="projects-grid">
          ${this.projects.map(p => this.card(p)).join("")}
        </div>
      </section>
    `;
  }
};

// Espone l'HTML
window.CONTENT = window.CONTENT || {};
window.CONTENT.projects = window.ProjectsContent.render();

/* ===== Fallback automatico per <img> non trovate =====
   Se un'immagine fallisce il caricamento, sostituiamo il contenuto
   del wrapper con il placeholder bianco.
*/
(function initProjectsImageFallback() {
  const apply = root => {
    root.querySelectorAll('.project-cover-wrap > img').forEach(img => {
      img.addEventListener('error', () => {
        const wrap = img.parentElement;
        if (!wrap) return;
        // sostituisco l'img con un placeholder styled
        wrap.outerHTML = `<div class="project-cover project-cover--empty" aria-hidden="true"></div>`;
      }, { once: true });
    });
  };

  // 1) Prova ad applicarlo subito se la sezione è già nel DOM
  const maybeRoot = document.querySelector('.projects-grid');
  if (maybeRoot) apply(maybeRoot);

  // 2) Osserva il DOM: quando la sezione Projects viene montata, applica il fallback
  const mo = new MutationObserver(muts => {
    muts.forEach(m => {
      m.addedNodes.forEach(n => {
        if (n.nodeType === 1) {
          const grid = n.matches?.('.projects-grid') ? n : n.querySelector?.('.projects-grid');
          if (grid) apply(grid);
        }
      });
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();
