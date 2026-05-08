import { useState, useEffect, useRef } from "react";
import lucasPhoto from "./assets/lucas.jpg";
import "./App.css";

/* ─── DATA ─────────────────────────────────── */
const data = {
  lastName: "RAZAFINDRAHOLY",
  firstName: "Mampianina Lucas Princi",
  title: "Consultant SAP Junior",
  about:
    "Consultant SAP junior combinant des compétences techniques solides en développement SAP (ABAP, OData, SAPUI5, Fiori) avec une bonne compréhension des processus métiers. Motivé, curieux et désireux de contribuer à des projets innovants.",
  contact: {
    email: "mampianina2002@gmail.com",
    phone: "+261 34 07 143 74",
    address: "Fianarantsoa, Madagascar",
    github: "https://github.com/AckermanLucas",
  },
  qualities: ["Fiable & rigoureux", "Curieux & enthousiaste", "Team player"],
  languages: [
    { lang: "Malagasy", level: "Langue maternelle" },
    { lang: "Français", level: "Excellent" },
    { lang: "Anglais", level: "Intermédiaire" },
  ],
  floatCards: [
    { icon: "🔷", title: "SAP ABAP / Fiori", sub: "Développement & Customizing" },
    { icon: "📊", title: "SAP BW / S/4HANA", sub: "Business Intelligence & Analytics" },
  
  ],
  skills: [
    { category: "SAP", items: ["ABAP", "SAPUI5", "Fiori", "OData", "S/4HANA", "IDoc", "CDS Views", "SAP BTP", "SAP BW"] },
    { category: "Frontend", items: ["React JS", "HTML5", "CSS3", "JavaScript", ] },
    { category: "Backend", items: [ "Java", "J2EE", "PHP Laravel"] },
    { category: "Base de données", items: ["MySQL", "PostgreSQL"] },
    { category: "OS & Outils", items: ["Linux", "Windows", "Git", "Excel"] },
  ],
  projects: [
    { name: "Géoart'tech", desc: "Site de géolocalisation des établissements à Fianarantsoa", date: "Mai 2024", tags: ["ReactGeo", "Web Mapping"], icon: "🗺️" },
    { name: "E-Commerce Informatique", desc: "Application de vente en ligne de matériels informatiques", date: "Nov 2023", tags: ["Laravel", "E-Commerce"], icon: "🛒" },
    { name: "Badge MTEFPLS", desc: "Recensement et impression de badge employés du Ministère", date: "Août 2022", tags: ["PHP", "MySQL"], icon: "🪪" },
    { name: "Gestion MAKI", desc: "Application web de gestion de vente", date: "Avr 2022", tags: ["PHP", "Web App"], icon: "📦" },
    { name: "App Chat Client/Serveur", desc: "Messagerie en temps réel client/serveur", date: "Mars 2022", tags: ["Java", "Socket"], icon: "💬" },
    { name: "Gestion Kits DREN", desc: "Gestion des manuels et kits scolaires pour la DREN", date: "Juin 2021", tags: ["Web App"], icon: "📚" },
    { name: "Logiciel Taxi-Brousse MAMI", desc: "Logiciel de gestion de coopérative de transport", date: "Sep 2019", tags: ["Java", "Desktop"], icon: "🚐" },
  ],

};

/* ─── CUSTOM CURSOR ─────────────────────────── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = () => ringRef.current?.classList.add("hovered");
    const onLeave = () => ringRef.current?.classList.remove("hovered");

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .skill-card, .project-card, .hero-float-card").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

/* ─── PARTICLES ─────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
  }));
  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─── ICONS ─────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

/* ─── SECTION TITLE ─────────────────────────── */
function SectionTitle({ num, title }) {
  return (
    <div className="section-header">
      <span className="section-num">{num}</span>
      <h2>{title}</h2>
      <div className="section-line" />
    </div>
  );
}

/* ─── APP ────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) => ({ ...prev, [e.target.id]: true }));
            setActiveSection(e.target.id);
          }
        });
      },
      { threshold: 0.12 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = ["about", "skills", "projects", "contact"];

  return (
    <div className="app">
      <CustomCursor />

      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo" onClick={() => scrollTo("hero")}>
          Lucas<span style={{ color: "var(--accent)" }}>.</span>
        </span>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((id) => (
            <button key={id} className={`nav-link ${activeSection === id ? "active" : ""}`} onClick={() => scrollTo(id)}>
              {id === "about" ? "À propos" : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" ref={setRef("hero")} className="hero">
        <Particles />
        <div className="hero-inner">

          {/* Left */}
          <div className="hero-left">
            <p className="hero-greeting">Bonjour, je suis</p>
            <h1 className="hero-name">
              <span className="accent">{data.lastName}</span>
            </h1>
            <p className="hero-firstname">{data.firstName}</p>
            <p className="hero-title">{data.title}</p>
            <p className="hero-desc">{data.about}</p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => scrollTo("projects")}>Voir mes projets</button>
              <button className="btn-secondary" onClick={() => scrollTo("contact")}>Me contacter</button>
            </div>
            <a
              href="/CV_Lucas_Razafindraholy.pptx"
              download="CV_RAZAFINDRAHOLY_Lucas.pptx"
              className="btn-cv"
            >
              <DownloadIcon /> Télécharger mon CV
            </a>
            <div className="hero-socials">
              <a href={data.contact.github} target="_blank" rel="noreferrer" className="social-link">
                <GithubIcon /> AckermanLucas
              </a>
              <a href={`mailto:${data.contact.email}`} className="social-link">✉ Email</a>
            </div>
          </div>

          {/* Center — Styled round photo */}
          <div className="hero-photo-col">
            <div className="hero-photo-frame">
              <div className="photo-ring-deco" />
              <div className="photo-ring-deco2" />
              <img src={lucasPhoto} alt="RAZAFINDRAHOLY Mampianina Lucas Princi" className="hero-photo" />
              <div className="photo-badge top-right">
                <span className="dot" /> Disponible
              </div>
              <div className="photo-badge bottom-left">
                🎓 Master II en Modélisation et Ingénierie Informatique
              </div>
            </div>
          </div>

          {/* Right — Float cards */}
          <div className="hero-right">
            {data.floatCards.map((card, i) => (
              <div key={i} className="hero-float-card">
                <div className="float-card-icon">{card.icon}</div>
                <div className="float-card-text">
                  <strong>{card.title}</strong>
                  <span>{card.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => scrollTo("about")}>
          <span className="scroll-arrow">↓</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={setRef("about")} className={`section ${visible.about ? "visible" : ""}`}>
        <div className="container">
          <SectionTitle num="01" title="À propos" />
          <div className="about-grid">
            <div className="about-text">
              <p>{data.about}</p>
              <div className="about-badges">
                {data.qualities.map((q) => <span key={q} className="badge">{q}</span>)}
              </div>
            </div>
            <div className="about-info">
              <div className="info-item"><span className="info-icon">📧</span><div><span className="info-label">Email</span><span className="info-value">{data.contact.email}</span></div></div>
              <div className="info-item"><span className="info-icon">📞</span><div><span className="info-label">Téléphone</span><span className="info-value">{data.contact.phone}</span></div></div>
              <div className="info-item"><span className="info-icon">📍</span><div><span className="info-label">Localisation</span><span className="info-value">{data.contact.address}</span></div></div>
              {data.languages.map((l) => (
                <div key={l.lang} className="info-item">
                  <span className="info-icon">🗣️</span>
                  <div><span className="info-label">{l.lang}</span><span className="info-value">{l.level}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={setRef("skills")} className={`section alt ${visible.skills ? "visible" : ""}`}>
        <div className="container">
          <SectionTitle num="02" title="Compétences" />
          <div className="skills-grid">
            {data.skills.map((group, i) => (
              <div key={group.category} className="skill-card" style={{ animationDelay: `${i * 0.09}s` }}>
                <h3 className="skill-category">{group.category}</h3>
                <div className="skill-tags">
                  {group.items.map((item) => <span key={item} className="skill-tag">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={setRef("projects")} className={`section ${visible.projects ? "visible" : ""}`}>
        <div className="container">
          <SectionTitle num="03" title="Projets" />
          <div className="projects-grid">
            {data.projects.map((proj, i) => (
              <div key={i} className="project-card" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="project-header">
                  <span className="project-icon">{proj.icon}</span>
                  <span className="project-date">{proj.date}</span>
                </div>
                <h3 className="project-name">{proj.name}</h3>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-tags">
                  {proj.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={setRef("contact")} className={`section ${visible.contact ? "visible" : ""}`}>
        <div className="container contact-container">
          <SectionTitle num="05" title="Contact" />
          <p className="contact-intro">
            Disponible pour des opportunités de collaboration, mission SAP ou développement web. N'hésitez pas à me contacter !
          </p>
          <div className="contact-cards">
            <a href={`mailto:${data.contact.email}`} className="contact-card">
              <span className="contact-icon">📧</span>
              <span>{data.contact.email}</span>
            </a>
            <a href={`tel:${data.contact.phone}`} className="contact-card">
              <span className="contact-icon">📞</span>
              <span>{data.contact.phone}</span>
            </a>
            <a href={data.contact.github} target="_blank" rel="noreferrer" className="contact-card">
              <span className="contact-icon"><GithubIcon /></span>
              <span>github.com/AckermanLucas</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 RAZAFINDRAHOLY Mampianina Lucas Princi · Consultant SAP Junior</p>
      </footer>
    </div>
  );
}
