# 🚀 Portfolio Lucas — Guide d'installation

## Ce que tu as dans ce dossier

```
lucas-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── lucas.jpg        ← Ta photo
│   ├── App.jsx              ← Tout le code du portfolio
│   ├── App.css              ← Tout le style (dark/light)
│   ├── index.js             ← Point d'entrée React
│   └── index.css            ← Variables CSS globales
└── package.json
```

---

## 📦 Étape 1 — Installer Node.js

React nécessite Node.js. Télécharge et installe la version LTS (Long Term Support) :

👉 https://nodejs.org/en/download

Pour vérifier que c'est bien installé, ouvre un terminal et tape :
```bash
node --version
# doit afficher quelque chose comme : v20.x.x

npm --version
# doit afficher quelque chose comme : 10.x.x
```

---

## 📁 Étape 2 — Placer les fichiers

Place le dossier `lucas-portfolio` où tu veux sur ton ordinateur (ex: Bureau ou Documents).

---

## ⚙️ Étape 3 — Installer les dépendances

Ouvre un terminal dans le dossier du projet :

**Sur Windows** : Fais clic droit dans le dossier → "Ouvrir dans le terminal"  
**Sur Mac/Linux** : Ouvre le terminal et tape `cd chemin/vers/lucas-portfolio`

Puis installe les packages :
```bash
npm install
```

> ⏳ Ça prend 1-2 minutes la première fois. Un dossier `node_modules` va apparaître.

---

## ▶️ Étape 4 — Lancer le site en local

```bash
npm start
```

Le site s'ouvre automatiquement sur **http://localhost:3000** dans ton navigateur.

Toute modification dans les fichiers `.jsx` ou `.css` se reflète **en temps réel** !

---

## 🏗️ Étape 5 — Construire pour la production

Quand tu es satisfait du résultat :

```bash
npm run build
```

Un dossier `build/` apparaît — c'est ce dossier que tu mets en ligne.

---

## 🌍 Étape 6 — Mettre en ligne (gratuitement)

### Option A — Vercel (recommandé, le plus simple)
1. Va sur https://vercel.com et crée un compte gratuit
2. Clique "New Project" → "Upload" → glisse le dossier `build/`
3. Ton site est en ligne en 30 secondes avec une URL du type `lucas-portfolio.vercel.app`

### Option B — Netlify
1. Va sur https://netlify.com
2. Glisse le dossier `build/` sur la page d'accueil
3. URL automatique disponible instantanément

### Option C — GitHub Pages
1. Crée un repo sur GitHub
2. Push ton code
3. Dans `package.json`, ajoute `"homepage": "https://AckermanLucas.github.io/portfolio"`
4. Installe : `npm install --save-dev gh-pages`
5. Lance : `npm run build && npx gh-pages -d build`

---

## ✏️ Personnaliser le contenu

Tout le contenu est dans le fichier `src/App.jsx`, dans l'objet `data` en haut du fichier.

Pour changer tes infos :
```js
const data = {
  title: "Consultant SAP Junior",        // Ton titre
  contact: {
    email: "ton-email@gmail.com",        // Ton email
    phone: "+261 ...",                    // Ton téléphone
    github: "https://github.com/...",    // Ton GitHub
  },
  // ... etc
}
```

Pour changer ta photo : remplace le fichier `src/assets/lucas.jpg` par ta nouvelle photo (garde le même nom).

---

## 🎨 Changer les couleurs

Ouvre `src/index.css` et modifie les variables :

```css
/* Mode sombre */
[data-theme="dark"] {
  --accent: #7c6af7;   /* Couleur principale (violet) */
  --accent2: #4f8ef7;  /* Couleur secondaire (bleu) */
}

/* Mode clair */
[data-theme="light"] {
  --accent: #4f8ef7;   /* Couleur principale (bleu) */
}
```

---

## ❓ Problèmes fréquents

**`npm start` ne fonctionne pas** → Vérifie que tu es bien dans le bon dossier (`ls` ou `dir` doit montrer `package.json`)

**Port 3000 déjà utilisé** → Tape `Y` quand React te propose d'utiliser un autre port

**Erreur de compilation** → Vérifie que tu n'as pas de faute de syntaxe dans les fichiers modifiés

---

Bonne chance Lucas ! 🚀
