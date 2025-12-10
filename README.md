# 🌙 Lento Coffee

> **Crafted Slowly. Inspired by Heritage.**

A luxury coffee brand web application featuring an authentic Arabian carpet aesthetic, built with Next.js, TypeScript, and modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f)

---

## ✨ Features

### 🎨 Design & Aesthetics
- **Arabian Carpet Theme**: Intricate geometric patterns, ornamental borders, and medallion motifs
- **Dual Color Palettes**:
  - 🌞 **Light Mode**: Desert Carpet (Deep Red, Rich Gold, Sand Beige, Coffee Brown, Emerald)
  - 🌙 **Dark Mode**: Midnight Carpet (Midnight Blue, Burgundy, Antique Gold, Shadowed Browns)
- **Smooth Animations**: Gentle fade-ins, slides, and textile-like shimmer effects
- **3D Coffee Bean**: Interactive floating 3D coffee bean model in the hero section
- **Premium Typography**: Amiri, Cairo, Inter, Noto Naskh Arabic
- **Glassmorphism Navbar**: Modern glass-effect navigation with scroll-aware blur

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
- **Smooth Scrolling**: Snap-scroll sections on landing page

### 📬 Contact Form
- **Real Form Submission**: Messages saved to Sanity CMS
- **Form Validation**: Client-side and server-side validation
- **Loading States**: Spinner and disabled button during submission
- **Status Tracking**: New → Read → Replied → Archived workflow
- **Bilingual Support**: Full Arabic/English form with translations

---

## 📁 Project Structure

```
lento-2/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with i18n
│   │   ├── page.tsx            # Landing page
│   │   ├── products/
│   │   │   ├── page.tsx        # Products listing
│   │   │   └── [id]/page.tsx   # Product details
│   │   ├── about/page.tsx      # About page
│   │   └── contact/page.tsx    # Contact page with working form
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts        # GET, POST /api/products
│   │   │   └── [id]/route.ts   # GET, PUT, DELETE /api/products/[id]
│   │   ├── categories/
│   │   │   └── route.ts        # GET /api/categories
│   │   └── contact/
│   │       └── route.ts        # POST /api/contact (saves to Sanity)
│   └── globals.css             # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation with theme/lang toggles
│   │   └── Footer.tsx          # Footer with carpet motifs
│   ├── patterns/
│   │   ├── CarpetPattern.tsx   # SVG carpet patterns
│   │   └── Divider.tsx         # Ornamental dividers
│   ├── products/
│   │   ├── ProductCard.tsx     # Product card component
│   │   └── LazyProductCard.tsx # Lazy-loaded product card
│   ├── 3d/
│   │   └── CoffeeBean3D.tsx    # 3D coffee bean model
│   └── ui/
│       ├── Button.tsx          # Reusable button
│       ├── ThemeToggle.tsx     # Theme switcher
│       └── LanguageSwitcher.tsx # Language switcher
├── lib/
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Theme provider
│   ├── data/
│   │   └── products.json       # Fallback product data
│   ├── sanity/
│   │   └── client.ts           # Sanity helpers
│   ├── types/
│   │   └── product.ts          # TypeScript types
│   └── utils.ts                # Utility functions
├── cms/
│   └── schemas/
│       ├── index.ts            # Schema registry
│       ├── product.ts          # Product schema
│       ├── category.ts         # Category schema
│       └── contactSubmission.ts # Contact form submissions
├── sanity/
│   ├── lib/
│   │   └── client.ts           # Sanity client configuration
│   ├── schemaTypes/
│   │   └── index.ts            # Schema exports
│   └── structure.ts            # Studio structure (Shop & Contacts)
├── i18n/
│   ├── request.ts              # i18n configuration
│   └── locales/
│       ├── en.json             # English translations
│       └── ar.json             # Arabic translations
├── middleware.ts               # Locale routing
├── tailwind.config.ts          # Tailwind configuration
├── vercel.json                 # Vercel deployment config
├── .nvmrc                      # Node.js version
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone or navigate to the project
cd lento-2

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en` or `/ar`)

---

## 🔐 Environment Variables

Create a `.env.local` file with:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-15

# Write token (required for contact form submissions)
# Create at: https://www.sanity.io/manage/project/YOUR_PROJECT_ID/api#tokens
SANITY_API_TOKEN=your_write_token_here

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Getting Your Sanity Token

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Tokens**
4. Click **"Add API token"**
5. Name: "Contact Form Writer"
6. Permissions: **Editor** (can create documents)
7. Copy the token to your `.env.local`

---

## 🎨 Color System

### Light Mode - Desert Carpet Palette
```css
Deep Red:      #8B1E1E
Rich Gold:     #C8A652
Sand Beige:    #E9D7B1
Coffee Brown:  #5B3A29
Emerald:       #0F6B4F
```

### Dark Mode - Midnight Carpet Palette
```css
Midnight Blue: #0C1B33
Burgundy:      #4A0E23
Antique Gold:  #A89038
Shadowed Brown:#36231A
```

---

## 🌐 API Endpoints

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products (with filters) |
| `GET` | `/api/products/[id]` | Get single product |
| `POST` | `/api/products` | Create product |
| `PUT` | `/api/products/[id]` | Update product |
| `DELETE` | `/api/products/[id]` | Delete product |

### Categories API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | List all categories |

### Contact API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact form (saves to Sanity) |

### Query Parameters (GET /api/products)
- `category` - Filter by category slug
- `search` - Search in name/description
- `featured` - Show only featured products
- `minPrice` / `maxPrice` - Price range filter

### Example Requests
```bash
# Get all products
curl http://localhost:3000/api/products

# Get products by category
curl http://localhost:3000/api/products?category=arabica&featured=true

# Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","subject":"Hello","message":"Test message"}'
```

---

## 🗄️ Sanity CMS Setup

### 1. Access Sanity Studio
The Sanity Studio is embedded at `/manage-content`:
```
http://localhost:3000/manage-content
```

### 2. Content Structure
The studio is organized into:
- **🛍️ Shop**
  - ☕ Products
  - 📂 Categories
- **📨 Contact Submissions** (auto-populated from contact form)

### 3. Contact Submission Management
Contact form submissions are automatically saved with:
- **Status tracking**: 🆕 New → 👁️ Read → ✅ Replied → 📦 Archived
- **Timestamps**: Automatically recorded submission time
- **Internal Notes**: Add notes visible only to admins
- **Sort by date**: Newest submissions first

### 4. Environment Setup
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-15
SANITY_API_TOKEN=your_write_token  # Required for contact form
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

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/lento-coffee.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**
   
   Add these in Vercel Dashboard → Project Settings → Environment Variables:
   
   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | All |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` | All |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-03-15` | All |
   | `SANITY_API_TOKEN` | Your Sanity write token | All |
   | `NEXT_PUBLIC_SITE_URL` | Your Vercel domain | Production |

4. **Deploy!**
   - Click "Deploy"
   - Vercel builds and deploys automatically

#### Post-Deployment Checklist

- [ ] Test both `/en` and `/ar` locales
- [ ] Verify theme switching (light/dark mode)
- [ ] Check Sanity CMS connection
- [ ] Test contact form submission
- [ ] Test responsive design on mobile
- [ ] Verify image optimization is working

#### Automatic Optimizations

The project includes:
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, XSS Protection
- **Caching**: Optimized for fonts, images, and videos
- **Compression**: Enabled for all responses
- **Edge Caching**: Configured via `vercel.json`

---

## 🎯 Design Philosophy

Lento Coffee embodies the intersection of **slow craftsmanship** and **cultural heritage**:

- **Slow**: Gentle animations, thoughtful spacing, patient pacing
- **Heritage**: Arabian carpet patterns, traditional motifs, cultural authenticity
- **Luxury**: Premium color palettes, elegant typography, refined details
- **Modern**: Clean interfaces, smooth interactions, responsive layouts

---

## 🆕 Recent Updates

### Contact Form (December 2024)
- ✅ Working form submission to Sanity CMS
- ✅ Loading states with spinner animation
- ✅ Success/error feedback with icons
- ✅ Form validation (client & server)
- ✅ Bilingual support (EN/AR)
- ✅ Status workflow in Sanity Studio

### UI Enhancements
- ✅ 3D Coffee Bean in hero section
- ✅ Glassmorphism navbar with scroll effects
- ✅ Smooth snap-scrolling on landing page
- ✅ Lazy loading for products
- ✅ Skeleton loading states

### CMS Integration
- ✅ Dynamic categories from Sanity
- ✅ Dynamic products from Sanity
- ✅ Contact submissions storage
- ✅ Organized Studio structure

---

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📝 License

© 2024 Lento Coffee. All rights reserved.

---

## 🙏 Credits

- **Design Inspiration**: Traditional Arabian & Persian carpets
- **Fonts**: Google Fonts (Amiri, Cairo, Inter, Noto Naskh Arabic)
- **Icons**: Lucide React
- **3D**: React Three Fiber, Three.js
- **Framework**: Next.js by Vercel
- **CMS**: Sanity.io

---

**Built with ☕ and patience**
