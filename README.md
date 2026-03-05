# 💌 WhisperMail — Digital Love Letters

> *Some things are too soft to send as a text.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-whisper--mail--five.vercel.app-B79A6B?style=for-the-badge&logo=vercel&logoColor=white)](https://whisper-mail-five.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Made with Love](https://img.shields.io/badge/Made%20with%20%E2%99%A5%20by-havi007-7A1E1E?style=for-the-badge)](https://github.com/havinash-007)

---

## ✨ What is WhisperMail?

**WhisperMail** is a digital love letter experience — an intimate, beautifully crafted web app that lets you compose heartfelt letters, seal them with wax, decorate them with stickers, and share them with someone special via a unique link.

Whether it's a message for a loved one, a note to your future self, or something in between — WhisperMail makes it feel worth keeping.

---

## 🎯 Features

| Feature | Description |
|---|---|
| ✍️ **Letter Editor** | Write your letter with rich formatting — title, body, signature, and date |
| 🎨 **Themes** | Choose from multiple paper themes (cream, linen, blush, and more) |
| 🌸 **Sticker Picker** | Decorate your letter with cute emoji stickers, freely placed |
| 💌 **Envelope Animation** | A stunning animated wax-sealed envelope that opens with a petal shower |
| 🌹 **Petal Rain** | Beautiful petal particle effect triggered when the envelope is opened |
| 🔗 **Shareable Links** | Letters are base64-encoded into a URL — no backend, no database needed |
| 📱 **Responsive Design** | Works beautifully on mobile, tablet, and desktop |
| 🌙 **Elegant Dark Romantic aesthetic** | Warm muted tones, gold accents, and fine typography |

---

## 🖼️ App Screens

```
Landing Page  →  Letter Editor  →  Envelope Scene  →  Letter View
    ↑                                    ↑                  |
    └────────────────────────────────────┴──────────────────┘
                        (navigation loops)
```

| Screen | Description |
|---|---|
| **Landing** | Animated hero page with CTA buttons |
| **Editor** | Full letter composing interface with theme & sticker controls |
| **Envelope** | Wax-sealed envelope reveal with open animation |
| **Letter View** | Displayed letter with typewriter effect and replay button |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **Framer Motion 12** | Animations & transitions |
| **Tailwind CSS 3** | Utility-first styling |
| **Google Fonts** | Cormorant Garamond, Dancing Script, Indie Flower, Inter |
| **@google/generative-ai** | Gemini AI integration (backend) |
| **Express 5** | Lightweight backend server |
| **Lucide React** | Icon set |

---

## 📁 Project Structure

```
app1/
├── public/                  # Static assets
│   ├── envelope.svg         # Favicon
│   ├── og-image.png         # Open Graph preview image
│   └── site.webmanifest     # PWA manifest
│
├── src/
│   ├── components/
│   │   ├── EnvelopeScene.jsx    # Wax-sealed envelope animation
│   │   ├── LetterEditor.jsx     # Full letter composition UI
│   │   ├── LetterView.jsx       # Rendered letter display
│   │   ├── PetalRain.jsx        # Petal particle effect
│   │   ├── StickerPicker.jsx    # Sticker selection panel
│   │   ├── ThemeSelector.jsx    # Paper theme switcher
│   │   ├── TypewriterText.jsx   # Typewriter animation component
│   │   └── Particles.jsx        # Generic particle system
│   │
│   ├── services/                # API & AI service helpers
│   ├── App.jsx                  # Root component & screen router
│   ├── App.css                  # App-level styles
│   ├── index.css                # Global styles & design tokens
│   └── main.jsx                 # React entry point
│
├── server.js                # Express backend (AI features)
├── index.html               # HTML shell (SEO-optimised)
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/havinash-007/Whisper_Mail.git
cd Whisper_Mail

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the codebase |

---

## 🔗 Shareable Letter Links

WhisperMail encodes the entire letter (content + theme + stickers) into a **base64 URL hash**. No database, no login — just a link.

```
https://whisper-mail-five.vercel.app/#l=<base64-encoded-letter>
```

When someone opens the link, the app instantly decodes and displays their letter in the sealed envelope, ready to be opened.

---

## 🌐 Deployment

The app is deployed on **Vercel** for zero-config CI/CD.

```bash
# Build for production
npm run build

# The /dist folder is ready to deploy anywhere
# (Vercel, Netlify, GitHub Pages, etc.)
```

> **Live URL:** [https://whisper-mail-five.vercel.app](https://whisper-mail-five.vercel.app)

---

## 🎨 Design Philosophy

WhisperMail is built around the **Elegant Dark Romantic** aesthetic:

- **Palette** — Warm cream backgrounds (`#F3EFE7`), deep wax red (`#7A1E1E`), and antique gold (`#B79A6B`)
- **Typography** — *Cormorant Garamond* for headings, *Indie Flower* for handwritten body text
- **Motion** — Subtle, purposeful animations that feel like turning a page, not clicking a button
- **Emotion** — Every micro-interaction is designed to evoke *longing*, *tenderness*, and *intimacy*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ♥ by **[havi007](https://github.com/havinash-007)**

*Because some things are too soft to send as a text.*

</div>
