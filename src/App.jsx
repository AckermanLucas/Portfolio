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
    { name: "Géoart'Tech — Web Mapping", desc: "Site web de géolocalisation interactive des établissements à Fianarantsoa, réalisé dans le cadre du mini-mémoire de Master I.", date: "2023", tags: ["React.js", "Laravel", "MySQL"], icon: "map" },
    { name: "Projets académiques web", desc: "E-commerce informatique (Java EE), badge & recensement MTEFPLS (PHP/Laravel), gestion de kits scolaires DREN (C#), application Chat Client/Serveur (Java).", date: "2019–2023", tags: ["Java EE", "PHP", "Laravel", "C#"], icon: "folder" },
  ],
  education: [
    { degree: "Master II — Modélisation et Ingénierie Informatique", school: "EMIT — Fianarantsoa", period: "2023 – 2024" },
    { degree: "Master I — Modélisation et Ingénierie Informatique", school: "EMIT — Fianarantsoa", period: "2022 – 2023" },
    { degree: "Licence — Développement d'Application Internet et Intranet", school: "EMIT — Fianarantsoa", period: "2019 – 2022" },
  ],
};

/* ─── TECH ICONS SVG ────────────────────────── */
const TechIcon = ({ icon, size = 36 }) => {
  const icons = {
    react: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg>,
    nextjs: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14.5L8 9v7H6.5V7h1.75l7 9.5H14v-7h1.5v7z"/></svg>,
    js: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path d="M7 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.8-.55 1.8-1.3 0-.9-.7-1.2-1.9-1.7l-.65-.28c-1.9-.8-3.15-1.8-3.15-3.9 0-1.95 1.48-3.42 3.8-3.42 1.65 0 2.83.57 3.68 2.07l-2 1.28c-.44-.8-.92-1.1-1.67-1.1-.76 0-1.24.48-1.24 1.1 0 .77.48 1.08 1.59 1.56l.65.28C12.16 13.9 13.5 14.87 13.5 17c0 2.23-1.75 3.6-4.1 3.6-2.3 0-3.8-1.1-4.53-2.54L7 17.5zm9.35 2.3c.5.8 1.13 1.4 2.27 1.4 1.16 0 1.9-.58 1.9-1.38 0-.96-.76-1.3-2.04-1.86l-.7-.3c-2.02-.86-3.37-1.94-3.37-4.22 0-2.1 1.6-3.7 4.1-3.7 1.78 0 3.06.62 3.98 2.24l-2.18 1.4c-.48-.86-.99-1.2-1.8-1.2-.82 0-1.34.52-1.34 1.2 0 .84.52 1.18 1.72 1.7l.7.3c2.38 1.02 3.74 2.06 3.74 4.4C23 20.5 21.2 22 18.75 22c-2.62 0-4.32-1.25-5.15-2.88L16.35 19.8z" fill="#000"/></svg>,
    php: <svg viewBox="0 0 24 24" fill="#777BB4"><path d="M12 6C5.925 6 1 8.686 1 12s4.925 6 11 6 11-2.686 11-6-4.925-6-11-6zm-1.5 8.5H9l.375-2H8l-.375 2H6l1-6h3.5c1 0 1.625.5 1.375 1.5L11.5 11c-.125.5-.5.875-1 1L10.875 13H12l-.5 1.5zM9.5 10h1l-.25 1.5h-1L9.5 10zm6.375 4.5H14l.5-3h-1l-.5 3h-1.5l1-6H16c1 0 1.625.5 1.375 1.5l-.375 1.5c-.25 1-1 1.5-2 1.5h-.625L14 14.5h-1l1-.5z"/></svg>,
    java: <svg viewBox="0 0 24 24" fill="#ED8B00"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.54 1.644-2.469 6.197-3.665 5.19-7.626M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg>,
    csharp: <svg viewBox="0 0 24 24" fill="#9B4F96"><path d="M12 1.5L2.25 7.5v9l9.75 6 9.75-6v-9L12 1.5zM12 4.155l7.5 4.595v.5h-1.5v-1h-1.5v1h-1v-1h-1.5v1h-.75L12 8.5l-1.25.75H10v-1H8.5v1h-1v-1H6v1H4.5v-.5l7.5-4.595zM6 13.5h1.5v1.5H6V13.5zm0-3h1.5v1.5H6V10.5zm3 3h1.5v1.5H9V13.5zm0-3h1.5v1.5H9V10.5zm3 3h1.5v1.5H12V13.5zm0-3h1.5v1.5H12V10.5zm3 3h1.5v1.5H15V13.5zm0-3h1.5v1.5H15V10.5z"/></svg>,
    laravel: <svg viewBox="0 0 24 24" fill="#FF2D20"><path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027.326.326 0 01-.066.017.456.456 0 01-.131 0 .309.309 0 01-.066-.017.316.316 0 01-.066-.027L.37 18.755a.378.378 0 01-.188-.326V3.ncol.n.n..."/></svg>,
    sap: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0070F2"/><text x="2" y="17" fontSize="11" fontWeight="bold" fill="white" fontFamily="Arial">SAP</text></svg>,
    s4hana: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0070F2"/><text x="2" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial">S/4</text><text x="2" y="23" fontSize="7" fill="white" fontFamily="Arial">HANA</text></svg>,
    mysql: <svg viewBox="0 0 24 24" fill="#4479A1"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.133-.04-.04-.147-.06-.182-.158zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.335-4.064h1.095c.242 1.96.384 3.814.437 5.53zm4.655-.045a6.67 6.67 0 01-1.03.09c-1.3 0-1.95-.49-1.95-1.47 0-.984.755-1.62 1.9-1.62.298 0 .567.034.814.1v-.49c0-.574-.287-.86-.862-.86-.435 0-.826.07-1.175.214l-.203-.78c.394-.152.88-.228 1.46-.228 1.044 0 1.567.49 1.567 1.47v3.574h-.52v.0zm-.004-2.34a2.42 2.42 0 00-.73-.107c-.6 0-.9.24-.9.72 0 .46.27.69.81.69.264 0 .535-.04.82-.12v-1.183z"/></svg>,
    postgresql: <svg viewBox="0 0 24 24" fill="#336791"><path d="M17.128 0a10.134 10.134 0 00-2.755.403C13.325.72 12.516 1.223 11.8 1.858A8.422 8.422 0 009.4 5.3a8.9 8.9 0 00-.746 3.7c0 1.197.199 2.257.596 3.166.398.91.943 1.598 1.635 2.064.69.465 1.452.698 2.282.698.552 0 1.117-.127 1.692-.38l.34-.197c.22 1.051.55 1.94.987 2.666.437.726.988 1.298 1.65 1.712.664.413 1.4.62 2.21.62.825 0 1.573-.213 2.243-.64a5.033 5.033 0 001.648-1.74c.43-.737.648-1.574.648-2.508 0-.78-.152-1.516-.455-2.21A5.072 5.072 0 0022.35 11a5.18 5.18 0 00-1.802-.923 10.27 10.27 0 00.484-1.39c.19-.64.29-1.26.3-1.86a7.663 7.663 0 00-.507-2.79 6.25 6.25 0 00-1.45-2.21A6.3 6.3 0 0017.128 0z"/></svg>,
    git: <svg viewBox="0 0 24 24" fill="#F05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.6.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>,
    linux: <svg viewBox="0 0 24 24" fill="#FCC624"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.74.15 2.19.343.45.19.459.665.03 1.402-.421.727-.914 1.948-.33 3.132.59 1.201 2.14 1.434 3.31 1.507 1.172.074 1.9-.042 2.36.51.46.556.339 1.74.79 2.695.453.955 1.33 1.403 2.21 1.403.88 0 1.757-.448 2.21-1.403.45-.954.33-2.14.79-2.696.46-.551 1.188-.436 2.36-.51 1.17-.073 2.72-.306 3.31-1.507.584-1.184.09-2.405-.33-3.132-.43-.737-.42-1.212.03-1.402.45-.193 1.38-.143 2.19-.343.405-.13.766-.267.94-.601.175-.339.143-.804-.106-1.484-.077-.242-.018-.57.04-.97.028-.136.055-.337.055-.536a1.549 1.549 0 00-.132-.602c-.206-.411-.55-.544-.864-.68-.312-.133-.598-.2-.797-.4-.214-.238-.404-.57-.663-.839a.438.438 0 00-.11-.135c.122-.805-.009-1.657-.287-2.489-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298A6.olean.olean.olean.olean.olean.olean 0 0012.504 0z"/></svg>,
    postman: <svg viewBox="0 0 24 24" fill="#FF6C37"><path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.626 7.425l-3.46 3.458-.002.002.002.002 1.259 1.258c.219.22.219.576 0 .794l-2.423 2.423a.562.562 0 01-.794 0l-1.26-1.26-3.46 3.46a.44.44 0 01-.312.129.432.432 0 01-.31-.742l3.46-3.46-1.26-1.26a.561.561 0 010-.793l2.423-2.424a.563.563 0 01.794 0l1.258 1.258 3.46-3.46a.44.44 0 01.622.622z"/></svg>,
    windows: <svg viewBox="0 0 24 24" fill="#0078D6"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>,
    bas: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0070F2"/><text x="2" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial">BAS</text></svg>,
    cds: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0070F2"/><text x="1" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial">CDS</text></svg>,
    odata: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#E8000D"/><text x="1" y="16" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">OData</text></svg>,
    idocs: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#F0AB00"/><text x="1" y="16" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">IDoc</text></svg>,
    bw: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0070F2"/><text x="3" y="16" fontSize="9" fontWeight="bold" fill="white" fontFamily="Arial">BW</text></svg>,
    cpi: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#6A1B9A"/><text x="3" y="16" fontSize="9" fontWeight="bold" fill="white" fontFamily="Arial">CPI</text></svg>,
    cloud: <svg viewBox="0 0 24 24" fill="#0070F2"><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>,
    ltmc: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#1B5E20"/><text x="1" y="16" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">LTMC</text></svg>,
    ltmom: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#1B5E20"/><text x="1" y="16" fontSize="6" fontWeight="bold" fill="white" fontFamily="Arial">LTMOM</text></svg>,
    abap: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#E8000D"/><text x="1" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial">ABAP</text></svg>,
    sapui5: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0070F2"/><text x="1" y="16" fontSize="6" fontWeight="bold" fill="white" fontFamily="Arial">UI5</text></svg>,
    fiori: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0070F2"/><circle cx="12" cy="12" r="5" fill="white" opacity="0.9"/><circle cx="12" cy="12" r="3" fill="#0070F2"/></svg>,
    refresh: null, settings: null, shopping: null, monitor: null, chart: null, map: null, folder: null,
  };
  return (
    <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {icons[icon] || <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}><circle cx="12" cy="12" r="10" opacity="0.3"/></svg>}
    </span>
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
