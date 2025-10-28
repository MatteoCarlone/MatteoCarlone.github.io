// About Section Content Module
window.AboutContent = {
  data: {
    title: "About Me",
    subtitle: "🚀 Hi, I’m Matteo",
    paragraphs: [
      "A robotics and embedded systems engineer by day, and a curious builder by night. I love turning ideas into working prototypes, whether it’s coordinating <strong>robot fleets 🦾</strong>, wiring up <strong>ESP32 experiments 🔌</strong>, or testing <strong>AI-powered systems 🤖</strong> that (hopefully) don’t break things.",
      "This space is a mix of what I build, break, and (eventually) fix — from <strong>robotics experiments</strong> and <strong>IoT tinkering</strong>, to personal hacks and weekend lab chaos ⚙️.",
      "For the more serious visitors 👀, you’ll find a snapshot of my <strong>CV</strong>, a list of <strong>skills that define me</strong>, and the <strong>technologies I use every day</strong>.",
      "Thanks for stopping by — just like most of my projects, this site is work in progress, exactly like me! 🔧"
    ],
    doingCards: [
      {
        title: "R&D & Robotics",
        description: "Ricerca applicata, prototipazione rapida e sistemi robotici autonomi end-to-end.",
        iconSymbol: "🦾"
      },
      {
        title: "Industrial IoT & Cybersecurity",
        description: "Architetture connesse resilienti, edge computing e difesa delle infrastrutture industriali.",
        iconSymbol: "🏭"
      },
      {
        title: "Side Projects & Experiments",
        description: "Robotica da weekend, automazione domestica, tinkering con AI e idee borderline.",
        iconSymbol: "🧪"
      }
    ],
    skills: [
      { name: "ROS", icon: "https://raw.githubusercontent.com/openrobotics/artwork/master/ros_logo.svg" },
      { name: "Rust", icon: "https://www.rust-lang.org/static/images/rust-logo-blk.svg" },
      { name: "Docker", icon: "https://www.svgrepo.com/show/353659/docker-icon.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "C", icon: "./content/skills-icons/C.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "MATLAB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" },
      { name: "ESP32", icon: "./content/skills-icons/Esp32.svg" },
      { name: "Raspberry Pi", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
      { name: "Yocto", icon: "./content/skills-icons/Yocto.svg" },
      { name: "YOLO", icon: "./content/skills-icons/YOLO.svg" },
      { name: "CUDA", icon: "./content/skills-icons/CUDA.svg" },
      { name: "Fusion 360", icon: "./content/skills-icons/AutodeskFusion.svg" }
    ]
  },

  render() {
    const doingCards = this.data.doingCards.map(card => `
      <div class="doing-card surface">
        <div class="icon-box">${card.iconSymbol ?? ""}</div>
        <h4>${card.title}</h4>
        <p class="card-description">${card.description}</p>
      </div>
    `).join('');

    const skillsTrack = (this.data.skills || []).map(skill => `
      <div class="skill-item" title="${skill.name}" aria-label="${skill.name}">
        <div class="skill-icon">
          <img src="${skill.icon}" alt="${skill.name} icon" loading="lazy" />
        </div>
        <span class="skill-label" aria-hidden="true">${skill.name}</span>
      </div>
    `).join('');
    const hasSkills = skillsTrack.length > 0;

    return `
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">${this.data.title}</h2>
          <p class="hero-subtitle">${this.data.subtitle}</p>
          ${this.data.description ? `<p class="hero-description">${this.data.description}</p>` : ""}
        </div>

        <div class="about-text">
          ${this.data.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>

        <div class="what-im-doing">
          <h3>What I'm Doing</h3>
          <div class="doing-grid">
            ${doingCards}
          </div>
        </div>

        ${hasSkills ? `
        <div class="skills-section" id="skills-section">
          <h3>Skills</h3>
          <div class="skills-wrap">
            <button class="skills-arrow skills-arrow--prev" type="button" aria-label="Scroll skills to the left">
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <div class="skills-scroll" id="skills-scroll">
              ${skillsTrack}
            </div>
            <button class="skills-arrow skills-arrow--next" type="button" aria-label="Scroll skills to the right">
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
          <div class="skills-progress">
            <span class="skills-progress-bar"></span>
          </div>
        </div>` : ''}
      </section>
    `;
  },

  mount(root) {
    this.unmount();
    if (!root) return;
    const section = root.querySelector('#skills-section');
    if (!section) return;
    const scroll = section.querySelector('#skills-scroll');
    const bar = section.querySelector('.skills-progress-bar');
    const prev = section.querySelector('.skills-arrow--prev');
    const next = section.querySelector('.skills-arrow--next');
    if (!scroll || !bar) return;

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
    const toggleArrow = (btn, disabled) => {
      if (!btn) return;
      btn.classList.toggle('is-hidden', disabled);
      btn.disabled = !!disabled;
      btn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    };
    const update = () => {
      const maxScroll = scroll.scrollWidth - scroll.clientWidth;
      if (maxScroll <= 0) {
        bar.style.opacity = '0';
        bar.style.width = '100%';
        bar.style.left = '0%';
        toggleArrow(prev, true);
        toggleArrow(next, true);
        return;
      }
      const visibleRatio = scroll.clientWidth / scroll.scrollWidth;
      const width = clamp(visibleRatio * 35, 15, 35);
      const progress = scroll.scrollLeft / maxScroll;
      const translate = Math.min(Math.max(progress * (100 - width), 0), 100 - width);
      bar.style.opacity = '1';
      bar.style.width = width.toFixed(2) + '%';
      bar.style.left = translate.toFixed(2) + '%';
      toggleArrow(prev, scroll.scrollLeft <= 4);
      toggleArrow(next, scroll.scrollLeft >= maxScroll - 4);
    };

    const onScroll = () => requestAnimationFrame(update);
    scroll.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    const scrollStep = () => Math.max(180, Math.min(scroll.clientWidth * 0.7, 320));
    let autoScrollId = null;
    const stopAutoScroll = () => {
      if (autoScrollId) {
        cancelAnimationFrame(autoScrollId);
        autoScrollId = null;
      }
    };
    const startAutoScroll = direction => {
      stopAutoScroll();
      const step = () => {
        scroll.scrollLeft += direction * 10;
        const maxScroll = scroll.scrollWidth - scroll.clientWidth;
        const atEdge = direction < 0 ? scroll.scrollLeft <= 0 : scroll.scrollLeft >= maxScroll;
        if (atEdge) {
          stopAutoScroll();
          return;
        }
        autoScrollId = requestAnimationFrame(step);
      };
      step();
    };
    const cleanupHandlers = [
      () => {
        stopAutoScroll();
        scroll.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', update);
      }
    ];
    const attachArrow = (btn, direction) => {
      if (!btn) return;
      const onClick = () => {
        scroll.scrollBy({ left: direction * scrollStep(), behavior: 'smooth' });
      };
      const onPointerDown = event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        btn.setPointerCapture?.(event.pointerId);
        startAutoScroll(direction);
      };
      const release = event => {
        if (event.pointerId && btn.hasPointerCapture?.(event.pointerId)) {
          btn.releasePointerCapture(event.pointerId);
        }
        stopAutoScroll();
      };
      btn.addEventListener('click', onClick);
      btn.addEventListener('pointerdown', onPointerDown);
      btn.addEventListener('pointerup', release);
      btn.addEventListener('pointercancel', release);
      btn.addEventListener('pointerleave', release);
      cleanupHandlers.push(() => {
        btn.removeEventListener('click', onClick);
        btn.removeEventListener('pointerdown', onPointerDown);
        btn.removeEventListener('pointerup', release);
        btn.removeEventListener('pointercancel', release);
        btn.removeEventListener('pointerleave', release);
      });
    };
    attachArrow(prev, -1);
    attachArrow(next, 1);
    update();

    this._cleanup = () => {
      cleanupHandlers.forEach(fn => {
        try { fn(); } catch (err) {
          console.error(err);
        }
      });
      this._cleanup = null;
    };
  },

  unmount() {
    if (this._cleanup) {
      this._cleanup();
    }
  }
};
