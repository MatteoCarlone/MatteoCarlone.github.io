// Resume Section as a "timeline" component
(function () {
  // ---------- DATA ----------
  window.ResumeContent = {
    data: {
      title: "Resume",

      education: [
        {
          title: "M.Sc. in Robotics Engineering",
          meta: "Politecnico di Torino • 2018 – 2020",
          bullets: [
            "Specializzazione in controlli automatici e sistemi robotici",
            "Tesi su \"Advanced SLAM techniques for autonomous navigation\"",
            "Voto: 110/110 cum laude"
          ]
        },
        {
          title: "B.Sc. in Biomedical Engineering",
          meta: "Politecnico di Torino • 2015 – 2018",
          bullets: [
            "Fondamenti di ingegneria biomedica e sistemi di controllo",
            "Progetto finale su sistemi di acquisizione dati biomedici",
            "Voto: 108/110"
          ]
        }
      ],

      experience: [
        {
          title: "Senior Robotics Software Engineer",
          meta: "Reply S.p.A. • 2023 – Presente",
          bullets: [
            "Sistemi di percezione per robot industriali (vision + deep learning)",
            "Visual-SLAM e navigazione autonoma in ambienti strutturati",
            "Ottimizzazione real-time e robustezza dei sistemi di controllo critici"
          ]
        },
        {
          title: "Robotics Software Developer",
          meta: "Vari progetti • 2020 – 2023",
          bullets: [
            "Integrazione ROS/ROS2, pipeline CI/CD e deployment",
            "Simulazione e testing hardware-in-the-loop",
            "Tooling, logging e telemetria per diagnosi sul campo"
          ]
        }
      ]
    },

    // ---------- VIEW HELPERS ----------
    sectionHead(label, iconPath) {
      // icona in mini-card allineata alla linea verticale (usa CSS .tl-sec-icon)
      return (
        '<div class="tl-head">' +
        '  <span class="tl-sec-icon" aria-hidden="true">' +
        '    <img src="' + iconPath + '" alt="" />' +
        '  </span>' +
             label +
        '</div>'
      );
    },

    item({ title, meta, bullets }) {
      return (
        '<article class="tl-item">' +
        '  <span class="tl-dot" aria-hidden="true"></span>' +
        '  <h4 class="tl-title">' + title + '</h4>' +
        '  <div class="tl-meta">' + meta + '</div>' +
        (bullets && bullets.length
          ? ('  <ul class="tl-bullets">' +
             bullets.map(b => '<li>' + b + '</li>').join('') +
            '  </ul>')
          : ''
        ) +
        '</article>'
      );
    },

    // ---------- RENDER ----------
    render() {
      var html =
        '<section class="section">' +
        '  <div class="section-header">' +
        '    <h2 class="section-title">' + this.data.title + '</h2>' +
        '  </div>' +

        '  <div class="timeline">' +

        // ===== Education =====
        '    <div class="tl-section">' +
               this.sectionHead('Education', '/content/resume-icon/education.svg') +
               this.data.education.map(e => this.item(e)).join('') +
        '    </div>' +

        // ===== Experience =====
        '    <div class="tl-section">' +
               this.sectionHead('Experience', '/content/resume-icon/experience.svg') +
               this.data.experience.map(e => this.item(e)).join('') +
        '    </div>' +

        '  </div>' +
        '</section>';

      return html;
    }
  };

  // ---------- EXPORT compatibile con app.js ----------
  window.CONTENT = window.CONTENT || {};
  // Se app.js chiama una funzione:
  window.CONTENT.resume = function () { return window.ResumeContent.render(); };
  // Se app.js si aspetta una stringa già pronta:
  window.CONTENT.resumeHTML = window.ResumeContent.render();
})();
