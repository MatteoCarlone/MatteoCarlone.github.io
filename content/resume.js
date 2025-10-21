// Resume Section as a "timeline" component
(function () {
  // ---------- DATA ----------
  window.ResumeContent = {
    data: {
      title: "Resume",

      education: [
        {
          title: "Master Thesis Mechatronic Department, MCI Innsbruck, Austria – Polytechnic University",
          meta: "Innsbruck, Austria • Feb 2023 – Sep 2023",
          bullets: [
            "Developed a modular fleet orchestration framework for Autonomous Mobile Robots (AMRs) in industrial logistics environments, focusing on task allocation, path coordination, and agent monitoring.",
            "Designed a system architecture enabling seamless integration of heterogeneous robot platforms using ROS2, and validated the framework in both simulated and physical environments.",
            "Initiated the foundation for a robotics LabCamp, authoring hands-on technical exercises and documentation that supported education and outreach initiatives at Zentrum für Produktion, Robotik & Automatisierung.",
            "Demonstrated strong research, software development, and technical communication skills, bridging academic research and applied robotics."
          ]
        },
        {
          title: "Ms in Robotics Engineering, Polytechnic University of Genoa",
          meta: "Genoa, Italy • Sep 2021 – Feb 2023",
          bullets: [
            "Focused on advanced topics in robotics, mechatronics, and control systems, with practical experience in ROS2, embedded programming, and robotic simulation.",
            "Developed strong foundations in AI integration and automation technologies."
          ]
        },
        {
          title: "Bs in Biomedical Engineering, Polytechnic University of Genoa",
          meta: "Genoa, Italy • Sep 2018 – Jul 2021",
          bullets: [
            "Built a solid foundation in engineering applied to healthcare, including courses in biomechanics, medical devices, and signal processing.",
            "Gained multidisciplinary skills bridging biology and technology."
          ]
        }
      ],

      experience: [
        {
          title: "Robotics & Embedded Software Engineer, Concept Engineering – Reply",
          meta: "Turin, Italy • Nov 2023 – Presente",
          bullets: [
            "Competence Center: Industrial IoT & Robotics",
            "Industry Focus: Manufacturing, Cybersecurity, R&D",
            "Led technical assessments across automotive and food-processing plants in Europe to design and deploy tailored Industrial IoT solutions.",
            "Architected and implemented containerized microservices for real-time data acquisition from edge devices (PLCs, industrial sensors) using Docker, Kubernetes, and Yocto.",
            "Built scalable, cloud-integrated backends for analytics and KPI monitoring (e.g., OEE), supporting deployment across industrial gateways, VMs, and cloud platforms.",
            "Engineered a custom VPN stack utilizing WireGuard and VPP, improving data security, reliability, and latency across critical production environments.",
            "Developed a modular orchestration platform for AMR fleet management, enabling real-time coordination and task allocation in dynamic factory environments.",
            "Integrated YOLO-based CV models for foreign object detection in safety-critical zones; validated system in operational testing with Turin Airport.",
            "Prototyped LLM-based natural language interfaces for human-robot interaction using on-premise LLM deployment to meet latency and security requirements."
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
