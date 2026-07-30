import { useState, useEffect, useRef } from "react";
import lucasPhoto from "./assets/lucas.jpg";
import "./App.css";

/* ─── DATA ─────────────────────────────────── */
const data = {
  lastName: "RAZAFINDRAHOLY",
  firstName: "Mampianina Lucas Princi",
  title: "Consultant IT Junior",
  about: "Consultant IT junior passionné par les systèmes d'information, alliant compréhension métier, technologies ERP et développement logiciel pour concevoir des solutions à valeur ajoutée.",
  contact: {
    email: "mampianina2002@gmail.com",
    phone: "+261 38 56 752 32",
    address: "Antananarivo, Madagascar — Mobilité OK",
    github: "https://github.com/AckermanLucas",
  },
  qualities: ["Fiable & rigoureux", "Enthousiaste & curieux", "Esprit d'équipe"],
  languages: [
    { lang: "Malagasy", level: "Langue maternelle" },
    { lang: "Français", level: "Niveau B2 (DELF)" },
    { lang: "Anglais", level: "Intermédiaire" },
  ],
  skillTabs: [
    {
      id: "frontend",
      label: "Frontend",
      items: [
        { name: "React JS", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "SAPUI5", icon: "sapui5" },
        { name: "Fiori", icon: "fiori" },
        { name: "JavaScript", icon: "js" },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      items: [
        { name: "ABAP", icon: "abap" },
        { name: "PHP", icon: "php" },
        { name: "Java", icon: "java" },
        { name: "C#", icon: "csharp" },
        { name: "Laravel", icon: "laravel" },
      ],
    },
    {
      id: "erp",
      label: "ERP & SAP",
      expandable: true,
      mainItem: { name: "SAP", icon: "sap" },
      items: [
        { name: "S/4HANA", icon: "s4hana" },
        { name: "CDS Views", icon: "cds" },
        { name: "OData", icon: "odata" },
        { name: "IDocs", icon: "idocs" },
        { name: "BW on HANA", icon: "bw" },
        { name: "CPI", icon: "cpi" },
        { name: "Cloud Connector", icon: "cloud" },
        { name: "LTMC", icon: "ltmc" },
        { name: "LTMOM", icon: "ltmom" },
        { name: "BAS", icon: "bas" },
      ],
    },
    {
      id: "database",
      label: "Base de données",
      items: [
        { name: "MySQL", icon: "mysql" },
        { name: "PostgreSQL", icon: "postgresql" },
      ],
    },
    {
      id: "tools",
      label: "Outils",
      items: [
        { name: "Git", icon: "git" },
        { name: "Linux", icon: "linux" },
        { name: "Postman", icon: "postman" },
        { name: "BAS", icon: "bas" },
        { name: "Windows", icon: "windows" },
      ],
    },
  ],
  projects: [
    { name: "Migration ECC → S/4HANA", desc: "Migration de données clients et commandes de SAP ECC 6.0 vers S/4HANA. Validation par BAPIs, génération automatique d'IDocs DEBMAS07 vers partenaires logistiques, rapport de migration avec gestion des erreurs.", date: "2025", tags: ["ABAP", "IDocs", "LTMOM", "S/4HANA"], icon: "refresh" },
    { name: "Gestion des articles MM", desc: "Workflow multi-profils (Demandeur / Acheteur / Analyste) pour création, modification et suppression d'articles SAP. ALV Grid éditable, BDC pour RFQ (ME41), notification email avec Adobe Forms.", date: "2025", tags: ["ABAP", "ALV", "BDC", "Adobe Forms"], icon: "settings" },
    { name: "Application Fiori E-Commerce", desc: "Application Fiori full-stack avec backoffice de gestion et vitrine client. Consommation de CDS Views via services OData V2, développée sur Business Application Studio.", date: "2025", tags: ["Fiori", "SAPUI5", "CDS Views", "OData"], icon: "shopping" },
    { name: "Interfaces Fiori & CDS Views", desc: "Développement de plusieurs interfaces Fiori Elements consommant des CDS Views annotées dans le cadre de workshops S/4HANA — gestion, reporting et visualisation de données métiers.", date: "2025", tags: ["Fiori Elements", "CDS Views", "S/4HANA"], icon: "monitor" },
    { name: "Plateforme d'indicateurs multisectoriels", desc: "Plateforme web de centralisation et visualisation d'indicateurs multisectoriels à Madagascar. Tableaux de bord interactifs et agrégation de données multisources. Projet freelance & mémoire Master.", date: "2025", tags: ["Next.js", "R", "Data Viz"], icon: "chart" },
    { name: "Géoart'Tech — Site Web", desc: "Développement d'un site web dans le cadre du mini-mémoire de Master I. Conception et développement complet de la plateforme.", date: "2023", tags: ["React.js", "Laravel", "MySQL"], icon: "monitor" },
    { name: "Application Web Mapping", desc: "Application de géolocalisation interactive des établissements à Fianarantsoa. Carte dynamique avec marqueurs et navigation.", date: "2023", tags: ["ReactJS", "Leaflet"], icon: "map" },
    { name: "Projets académiques web", desc: "E-commerce informatique (Java EE), badge & recensement MTEFPLS (PHP/Laravel), gestion de kits scolaires DREN (C#), application Chat Client/Serveur (Java).", date: "2019–2022", tags: ["Java EE", "PHP", "Laravel", "C#"], icon: "folder" },
  ],
  education: [
    { degree: "Master II — Modélisation et Ingénierie Informatique", school: "EMIT — Fianarantsoa", period: "2023 – 2024" },
    { degree: "Master I — Modélisation et Ingénierie Informatique", school: "EMIT — Fianarantsoa", period: "2022 – 2023" },
    { degree: "Licence — Développement d'Application Internet et Intranet", school: "EMIT — Fianarantsoa", period: "2019 – 2022" },
  ],
};

/* ─── TECH ICONS — OFFICIAL LOGOS via img ───── */
const TECH_LOGOS = {
  react:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nextjs:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  js:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  php:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  java:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  csharp:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  laravel:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  mysql:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  git:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  linux:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  windows:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
  postman:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
};

const SAP_BADGE_COLOR = {
  sap:    "#0070F2", abap:  "#E8000D", sapui5: "#0070F2",
  fiori:  "#0070F2", s4hana:"#0070F2", cds:   "#0070F2",
  odata:  "#E8000D", idocs: "#F0AB00", bw:    "#0A2780",
  cpi:    "#6A1B9A", cloud: "#0070F2", ltmc:  "#1B5E20",
  ltmom:  "#1B5E20", bas:   "#0070F2",
};

const SAP_BADGE_TEXT = {
  sap:"SAP", abap:"ABAP", sapui5:"UI5", fiori:"Fiori",
  s4hana:"S/4|HANA", cds:"CDS", odata:"OData", idocs:"IDoc",
  bw:"BW", cpi:"CPI", cloud:"Cloud|Conn.", ltmc:"LTMC",
  ltmom:"LTMOM", bas:"BAS",
};

const TechIcon = ({ icon, size = 36 }) => {
  if (TECH_LOGOS[icon]) {
    return (
      <img
        src={TECH_LOGOS[icon]}
        alt={icon}
        width={size} height={size}
        style={{ objectFit: "contain", display: "block" }}
        onError={(e) => { e.target.style.display = "none"; }}
      />
    );
  }
  const color = SAP_BADGE_COLOR[icon] || "#0070F2";
  const label = SAP_BADGE_TEXT[icon] || icon.toUpperCase();
  const lines = label.split("\n");
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} style={{ display: "block" }}>
      <rect width="48" height="48" rx="8" fill={color}/>
      {lines.length === 1
        ? <text x="24" y="31" fontSize={lines[0].length > 4 ? "10" : "14"} fontWeight="bold" fill="white" fontFamily="Arial, sans-serif" textAnchor="middle">{lines[0]}</text>
        : <>
            <text x="24" y="22" fontSize="13" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif" textAnchor="middle">{lines[0]}</text>
            <text x="24" y="36" fontSize="11" fill="white" fontFamily="Arial, sans-serif" textAnchor="middle">{lines[1]}</text>
          </>
      }
    </svg>
  );
};

/* Project icon SVG */
const ProjectIcon = ({ type }) => {
  const map = {
    refresh: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
    settings: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    shopping: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    monitor: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    chart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    map: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    folder: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  };
  return map[type] || map.folder;
};

/* ─── LUCIDE ICONS ──────────────────────────── */
const Icon = ({ name, size = 18 }) => {
  const icons = {
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    mappin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    chevrondown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
    chevronup: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>,
    graduationcap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  };
  return icons[name] || null;
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
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) { ringRef.current.style.left = ring.current.x + "px"; ringRef.current.style.top = ring.current.y + "px"; }
      raf.current = requestAnimationFrame(animate);
    };
    const onEnter = () => ringRef.current?.classList.add("hovered");
    const onLeave = () => ringRef.current?.classList.remove("hovered");
    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .project-card, .skill-tab-item").forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);
  return (<><div className="cursor-dot" ref={dotRef} /><div className="cursor-ring" ref={ringRef} /></>);
}

/* ─── PARTICLES ─────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({ id: i, size: Math.random() * 5 + 3, left: Math.random() * 100, duration: Math.random() * 15 + 10, delay: Math.random() * 10 }));
  return <>{particles.map((p) => <div key={p.id} className="hero-particle" style={{ width: p.size, height: p.size, left: `${p.left}%`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />)}</>;
}

/* ─── SKILLS SECTION ────────────────────────── */
function SkillsSection() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [sapExpanded, setSapExpanded] = useState(false);
  const currentTab = data.skillTabs.find((t) => t.id === activeTab);

  return (
    <div className="skills-wrapper">
      <div className="skill-tabs">
        {data.skillTabs.map((tab) => (
          <button key={tab.id} className={`skill-tab-btn ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="skill-grid-icons">
        {currentTab?.expandable ? (
          <>
            <div className="skill-icon-card sap-main" onClick={() => setSapExpanded(!sapExpanded)}>
              <div className="skill-icon-wrap"><TechIcon icon="sap" size={44} /></div>
              <span className="skill-icon-name">SAP</span>
              <span className="sap-expand-icon">{sapExpanded ? <Icon name="chevronup" size={14}/> : <Icon name="chevrondown" size={14}/>}</span>
            </div>
            {sapExpanded && currentTab.items.map((item, i) => (
              <div key={item.name} className="skill-icon-card sub" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="skill-icon-wrap"><TechIcon icon={item.icon} size={36} /></div>
                <span className="skill-icon-name">{item.name}</span>
              </div>
            ))}
          </>
        ) : (
          currentTab?.items.map((item, i) => (
            <div key={item.name} className="skill-icon-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="skill-icon-wrap"><TechIcon icon={item.icon} size={40} /></div>
              <span className="skill-icon-name">{item.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


/* ─── TANA MAP ──────────────────────────────── */
function TanaMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;

    // Load Leaflet dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = window.L;
      if (!mapRef.current || mapInstance.current) return;

      const map = L.map(mapRef.current, {
        center: [-18.9101, 47.5362],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:14px;height:14px;
          background:var(--accent, #7c6af7);
          border:3px solid white;
          border-radius:50%;
          box-shadow:0 0 12px rgba(124,106,247,0.8);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([-18.9101, 47.5362], { icon })
        .addTo(map)
        .bindPopup('<b>Antananarivo</b><br>Madagascar')
        .openPopup();

      mapInstance.current = map;
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="tana-map-wrap">
      <div ref={mapRef} className="tana-map" />
    </div>
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

  useEffect(() => { document.documentElement.setAttribute("data-theme", dark ? "dark" : "light"); }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible((prev) => ({ ...prev, [e.target.id]: true })); setActiveSection(e.target.id); } });
    }, { threshold: 0.12 });
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navItems = ["about", "skills", "projects", "education", "contact"];

  return (
    <div className="app">
      <CustomCursor />

      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo" onClick={() => scrollTo("hero")}>Lucas<span style={{ color: "var(--accent)" }}>.</span></span>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((id) => (
            <button key={id} className={`nav-link ${activeSection === id ? "active" : ""}`} onClick={() => scrollTo(id)}>
              {id === "about" ? "À propos" : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={() => setDark(!dark)}>
            {dark ? <Icon name="sun" size={17}/> : <Icon name="moon" size={17}/>}
          </button>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" ref={setRef("hero")} className="hero">
        <Particles />
        <div className="hero-inner">
          <div className="hero-left">
            <p className="hero-greeting">Bonjour, je suis</p>
            <h1 className="hero-name"><span className="accent">{data.lastName}</span></h1>
            <p className="hero-firstname">{data.firstName}</p>
            <p className="hero-title">{data.title}</p>
            <p className="hero-desc">{data.about}</p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => scrollTo("projects")}>Voir mes projets</button>
              <button className="btn-secondary" onClick={() => scrollTo("contact")}>Me contacter</button>
            </div>
            <a href="/CV_Lucas_Razafindraholy.pdf" download="CV_RAZAFINDRAHOLY_Mampianina_Lucas_Princi.pdf" className="btn-cv">
              <Icon name="download" size={15}/> Télécharger mon CV
            </a>
            <div className="hero-socials">
              <a href={data.contact.github} target="_blank" rel="noreferrer" className="social-link"><Icon name="github" size={15}/> AckermanLucas</a>
              <a href={`mailto:${data.contact.email}`} className="social-link"><Icon name="mail" size={15}/> Email</a>
            </div>
          </div>

          <div className="hero-photo-col">
            <div className="hero-photo-frame">
              <div className="photo-ring-deco" />
              <div className="photo-ring-deco2" />
              <img src={lucasPhoto} alt="RAZAFINDRAHOLY Mampianina Lucas Princi" className="hero-photo" />
              <div className="photo-badge top-right"><span className="dot" /> Disponible</div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollTo("about")}><span className="scroll-arrow">↓</span></div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={setRef("about")} className={`section ${visible.about ? "visible" : ""}`}>
        <div className="container">
          <SectionTitle num="01" title="À propos" />
          <div className="about-grid">
            <div className="about-text">
              <p>{data.about}</p>
              <div className="about-badges">{data.qualities.map((q) => <span key={q} className="badge">{q}</span>)}</div>
            </div>
            <div className="about-info">
              <div className="info-item"><span className="info-icon"><Icon name="mail" size={16}/></span><div><span className="info-label">Email</span><span className="info-value">{data.contact.email}</span></div></div>
              <div className="info-item"><span className="info-icon"><Icon name="phone" size={16}/></span><div><span className="info-label">Téléphone</span><span className="info-value">{data.contact.phone}</span></div></div>
              <div className="info-item"><span className="info-icon"><Icon name="mappin" size={16}/></span><div><span className="info-label">Localisation</span><span className="info-value">{data.contact.address}</span></div></div>
              <TanaMap />
              {data.languages.map((l) => <div key={l.lang} className="info-item"><span className="info-icon"><Icon name="globe" size={16}/></span><div><span className="info-label">{l.lang}</span><span className="info-value">{l.level}</span></div></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={setRef("skills")} className={`section alt ${visible.skills ? "visible" : ""}`}>
        <div className="container">
          <SectionTitle num="02" title="Compétences" />
          <SkillsSection />
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
                  <span className="project-icon-wrap"><ProjectIcon type={proj.icon} /></span>
                  <span className="project-date">{proj.date}</span>
                </div>
                <h3 className="project-name">{proj.name}</h3>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-tags">{proj.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" ref={setRef("education")} className={`section alt ${visible.education ? "visible" : ""}`}>
        <div className="container">
          <SectionTitle num="04" title="Formation" />
          <div className="education-list">
            {data.education.map((edu, i) => (
              <div key={i} className="edu-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="edu-period"><Icon name="calendar" size={14}/> {edu.period}</div>
                <div><h3 className="edu-degree">{edu.degree}</h3><p className="edu-school"><Icon name="graduationcap" size={13}/> {edu.school}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={setRef("contact")} className={`section ${visible.contact ? "visible" : ""}`}>
        <div className="container contact-container">
          <SectionTitle num="05" title="Contact" />
          <p className="contact-intro">Disponible pour des opportunités de collaboration, mission IT/ERP ou développement logiciel. N'hésitez pas à me contacter !</p>
          <div className="contact-cards">
            <a href={`mailto:${data.contact.email}`} className="contact-card"><span className="contact-icon"><Icon name="mail" size={22}/></span><span>{data.contact.email}</span></a>
            <a href={`tel:${data.contact.phone}`} className="contact-card"><span className="contact-icon"><Icon name="phone" size={22}/></span><span>{data.contact.phone}</span></a>
            <a href={data.contact.github} target="_blank" rel="noreferrer" className="contact-card"><span className="contact-icon"><Icon name="github" size={22}/></span><span>github.com/AckermanLucas</span></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 RAZAFINDRAHOLY Mampianina Lucas Princi · Consultant IT Junior</p>
      </footer>
    </div>
  );
}
