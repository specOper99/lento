# Creating a New Website Clone

This guide explains how to create a new website instance from this template with your own branding, theme colors, and content.

## Quick Start (5 minutes)

### 1. Fork or Clone the Repository

```bash
# Clone the repository
git clone https://github.com/specOper99/easy-landing-page.git my-new-site
cd my-new-site

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and customize it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```bash
# REQUIRED: Your Brand
NEXT_PUBLIC_SITE_NAME=Your Brand Name
NEXT_PUBLIC_SITE_TITLE=Your Brand Name - Your Tagline
NEXT_PUBLIC_SITE_TAGLINE=Your Tagline Here

# REQUIRED: Your Brand Color (one color - the system generates the rest!)
NEXT_PUBLIC_BRAND_COLOR=#1E4B8B  # Example: Navy Blue

# REQUIRED: Your Contact Info
NEXT_PUBLIC_ADDRESS_EN=Your City, Country
NEXT_PUBLIC_ADDRESS_AR=مدينتك، بلدك
NEXT_PUBLIC_PHONE=+1 234 567 8901
NEXT_PUBLIC_EMAIL=hello@yourbrand.com
```

### 3. Set Up Sanity CMS

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click **"Create new project"**
3. Name your project and select a plan (free tier works)
4. Copy your **Project ID** from the dashboard
5. Go to **API** > **Tokens** and create a new token with **Editor** permissions

Add these to your `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your new site!

---

## Configuration Options

### Brand Color

The magic happens with just **one color**! Provide your primary brand color and the system automatically generates:

- Light mode color palette
- Dark mode color palette
- All accent and secondary colors
- Harmonious, accessible color combinations

```bash
# Examples of brand colors:
NEXT_PUBLIC_BRAND_COLOR=#8B1E1E  # Deep Red (default)
NEXT_PUBLIC_BRAND_COLOR=#1E4B8B  # Navy Blue
NEXT_PUBLIC_BRAND_COLOR=#1E8B4B  # Forest Green
NEXT_PUBLIC_BRAND_COLOR=#8B4B1E  # Burnt Orange
NEXT_PUBLIC_BRAND_COLOR=#4B1E8B  # Royal Purple
NEXT_PUBLIC_BRAND_COLOR=#8B1E6B  # Magenta
```

### Branding

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Display name (navbar, footer) | "Café Arabica" |
| `NEXT_PUBLIC_SITE_TITLE` | Full SEO title | "Café Arabica - Premium Coffee" |
| `NEXT_PUBLIC_SITE_TAGLINE` | Short tagline | "Premium Coffee, Perfect Blend" |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Meta description for SEO | "Experience the finest..." |
| `NEXT_PUBLIC_SITE_KEYWORDS` | SEO keywords (comma-separated) | "coffee,premium,arabica" |

### Contact Information

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ADDRESS_EN` | Address in English |
| `NEXT_PUBLIC_ADDRESS_AR` | Address in Arabic |
| `NEXT_PUBLIC_PHONE` | Phone number |
| `NEXT_PUBLIC_EMAIL` | Email address |
| `NEXT_PUBLIC_HOURS_EN` | Business hours (English) |
| `NEXT_PUBLIC_HOURS_AR` | Business hours (Arabic) |

### Social Media

Leave empty if not used:

```bash
NEXT_PUBLIC_SOCIAL_INSTAGRAM=https://instagram.com/yourbrand
NEXT_PUBLIC_SOCIAL_TWITTER=https://twitter.com/yourbrand
NEXT_PUBLIC_SOCIAL_FACEBOOK=https://facebook.com/yourbrand
NEXT_PUBLIC_SOCIAL_TIKTOK=https://tiktok.com/@yourbrand
NEXT_PUBLIC_SOCIAL_YOUTUBE=https://youtube.com/@yourbrand
```

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git remote set-url origin https://github.com/your-username/your-new-site.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Add your environment variables in the **Environment Variables** section
5. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`!

### Environment Variables in Vercel

Add all the variables from your `.env.local` to Vercel:

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add each variable with the same names and values

---

## Sanity CMS Setup

### Schema Migration

The Sanity schema (products, categories, contact submissions) is already configured. When you run the project, Sanity will automatically set up your content structure.

### Adding Content

1. Start the dev server: `npm run dev`
2. Go to `/manage-content` in your browser
3. Log in with your Sanity account
4. Start adding products and categories

### Importing Data

If you want to import existing product data:

```bash
# Export from existing Sanity project
npx sanity dataset export production ./backup.tar.gz --project-id OLD_PROJECT_ID

# Import to new project  
npx sanity dataset import ./backup.tar.gz production --project-id NEW_PROJECT_ID
```

---

## Customization Beyond Configuration

### Locale Files

For additional text customization, edit:
- `i18n/locales/en.json` - English translations
- `i18n/locales/ar.json` - Arabic translations

### Fonts

To change fonts, edit `app/globals.css` and update the Google Fonts import at the top.

### Images and Assets

Replace files in the `public/` directory with your own assets:
- Logo images
- Favicon
- Open Graph images

---

## Troubleshooting

### Colors Not Updating

1. Clear browser cache
2. Restart the dev server
3. Ensure the brand color is a valid hex code (e.g., `#1E4B8B`)

### Sanity Connection Issues

1. Verify your Project ID is correct
2. Check that the API token has write permissions
3. Ensure the dataset name matches (usually `production`)

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

---

## Support

For issues or questions:
- Check the existing [GitHub Issues](https://github.com/specOper99/easy-landing-page/issues)
- Create a new issue with:
  - Your environment variables (without tokens!)
  - Error messages
  - Screenshots if relevant
