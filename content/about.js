// About Section Content Module
window.AboutContent = {
  data: {
    title: "About Me",
    subtitle: "Sistemi autonomi, percezione e controllo.",
    description: "Costruisco software affidabile per robot nel mondo reale.",
    paragraphs: [
      "Sono un ingegnere software specializzato nello sviluppo di sistemi robotici autonomi. La mia esperienza si concentra su percezione ambientale, algoritmi SLAM e sistemi di controllo per applicazioni robotiche industriali e di ricerca.",
      "Lavoro principalmente con ROS/ROS2, C++ e Python per creare soluzioni robuste che integrano sensori, algoritmi di computer vision e sistemi di pianificazione del movimento. Mi occupo anche di simulazione e testing per garantire l'affidabilità dei sistemi in ambienti reali.",
      "La mia passione è trasformare ricerca accademica in applicazioni pratiche che possano operare efficacemente nel mondo reale, con particolare attenzione alla sicurezza e alle prestazioni."
    ],
    doingCards: [
      {
        title: "Perception & SLAM",
        description: "Algoritmi di localizzazione e mappatura simultanea per navigazione autonoma.",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"/></svg>`
      },
      {
        title: "Control & Planning",
        description: "Sistemi di controllo e pianificazione del movimento per manipolatori e robot mobili.",
        icon: `<svg viewBox="0 0 24 24"><path d="M3 3h18v2H3V3Zm0 8h12v2H3v-2Zm0 8h18v2H3v-2Zm16-8 4 4-4 4-1.41-1.41L19.17 14l-1.58-1.59L19 11Z"/></svg>`
      },
      {
        title: "Simulation & Tooling",
        description: "Ambienti di simulazione e strumenti per testing e validazione di sistemi robotici.",
        icon: `<svg viewBox="0 0 24 24"><path d="M4 3h16v6H4V3Zm0 8h16v10H4V11Zm2 2v6h12v-6H6Z"/></svg>`
      },
      {
        title: "Systems & DevOps",
        description: "Integrazione ROS2, deployment e architetture software scalabili per robotica.",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2 1 7l11 5 9-4.09V17h2V7M5 11.18V17l7 3 7-3v-5.82L12 15l-7-3.82Z"/></svg>`
      }
    ]
  },

  render() {
    const doingCards = this.data.doingCards.map(card => `
      <div class="doing-card surface">
        <div class="icon-box">${card.icon}</div>
        <div>
          <h4>${card.title}</h4>
          <p>${card.description}</p>
        </div>
      </div>
    `).join('');

    return `
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">${this.data.title}</h2>
          <p class="hero-subtitle">${this.data.subtitle}</p>
          <p class="hero-description">${this.data.description}</p>
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
      </section>
    `;
  }
};
