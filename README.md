# 🚀 Easy Landing Page

> **Create Beautiful Landing Pages in Minutes**

A customizable landing page template with Arabian carpet aesthetics, built with Next.js, TypeScript, and modern web technologies. Clone it, configure it, and deploy your own branded site!

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f)

---

## ✨ Features

### 🎨 Design & Aesthetics
- **Arabian Carpet Theme**: Intricate geometric patterns, ornamental borders, and medallion motifs
- **One-Color Theming**: Provide a single brand color, get a complete light & dark mode palette
- **Smooth Animations**: Gentle fade-ins, slides, and textile-like shimmer effects
- **3D Coffee Bean**: Interactive floating 3D model in the hero section
- **Premium Typography**: Amiri, Cairo, Inter, Noto Naskh Arabic
- **Glassmorphism Navbar**: Modern glass-effect navigation with scroll-aware blur

### 🔧 Easy Customization
- **Environment-Based Config**: Change brand, colors, contact info via `.env` variables
- **Dynamic Theme Generation**: Color scheme automatically generated from your brand color
- **Separate Sanity Projects**: Each clone gets its own CMS with its own content

### 🌍 Internationalization
- **Full Bilingual Support**: English & Arabic
- **RTL/LTR Switching**: Automatic direction change based on language
- **Localized Content**: All UI text and product descriptions in both languages

### 🛠️ Technical Features
- **REST API**: Full CRUD operations for products and contact submissions
- **Sanity CMS**: Headless CMS for products, categories, and contact management
- **Dark/Light Theme**: Smooth transitions with localStorage persistence
- **Responsive Design**: Mobile-first, works on all devices
- **Type-Safe**: Strict TypeScript throughout
- **Lazy Loading**: Progressive product loading with skeleton states

---

## 🚀 Quick Start

### Clone & Configure

```bash
# Clone the repository
git clone https://github.com/specOper99/easy-landing-page.git my-new-site
cd my-new-site

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Configure Your Brand

Edit `.env.local`:

```bash
# Your Brand
NEXT_PUBLIC_SITE_NAME=Your Brand Name
NEXT_PUBLIC_BRAND_COLOR=#1E4B8B  # One color = full theme!

# Contact Info
NEXT_PUBLIC_ADDRESS_EN=Your City, Country
NEXT_PUBLIC_PHONE=+1 234 567 8901
NEXT_PUBLIC_EMAIL=hello@yourbrand.com

# Sanity CMS (create at sanity.io/manage)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_API_TOKEN=your_write_token
```

See [CLONING.md](./CLONING.md) for complete setup guide.

---

## 📁 Project Structure

```
easy-landing-page/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with i18n
│   │   ├── page.tsx            # Landing page
│   │   ├── products/           # Products pages
│   │   ├── about/page.tsx      # About page
│   │   └── contact/page.tsx    # Contact page
│   ├── api/                    # REST API endpoints
│   └── globals.css             # Global styles
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── patterns/               # Carpet patterns, dividers
│   ├── products/               # Product cards
│   └── ui/                     # Buttons, toggles
├── lib/
│   ├── site-config.ts          # Central configuration
│   ├── color-scheme.ts         # Theme generator
│   └── sanity/                 # CMS helpers
├── i18n/locales/               # EN/AR translations
├── CLONING.md                  # Cloning guide
└── .env.example                # Environment template
```

---

## 🎨 One-Color Theming

The magic of Easy Landing Page: **provide one brand color, get a complete theme!**

```bash
NEXT_PUBLIC_BRAND_COLOR=#8B1E1E  # Deep Red
NEXT_PUBLIC_BRAND_COLOR=#1E4B8B  # Navy Blue
NEXT_PUBLIC_BRAND_COLOR=#1E8B4B  # Forest Green
NEXT_PUBLIC_BRAND_COLOR=#4B1E8B  # Royal Purple
```

The system automatically generates:
- ✅ Light mode palette (11 colors)
- ✅ Dark mode palette (11 colors)
- ✅ Harmonious, accessible combinations

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_NAME` | Brand name | Yes |
| `NEXT_PUBLIC_BRAND_COLOR` | Theme color (hex) | Yes |
| `NEXT_PUBLIC_ADDRESS_EN` | Address (English) | Yes |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Project ID | Yes |
| `SANITY_API_TOKEN` | Sanity write token | Yes |

See [.env.example](./.env.example) for all options.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List products |
| `GET` | `/api/products/[id]` | Get product |
| `GET` | `/api/categories` | List categories |
| `POST` | `/api/contact` | Submit contact form |

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy!

```bash
git remote add origin https://github.com/YOUR_USERNAME/your-site.git
git push -u origin main
```

---

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript checks
```

---

## 📝 Documentation

- [CLONING.md](./CLONING.md) - Complete guide for creating clones
- [.env.example](./.env.example) - All configuration options

---

## 🙏 Credits

- **Design Inspiration**: Traditional Arabian & Persian carpets
- **Fonts**: Google Fonts (Amiri, Cairo, Inter, Noto Naskh Arabic)
- **Icons**: Lucide React
- **3D**: React Three Fiber, Three.js
- **Framework**: Next.js by Vercel
- **CMS**: Sanity.io

---

**Built with ☕ and patience by [@specOper99](https://github.com/specOper99)**
