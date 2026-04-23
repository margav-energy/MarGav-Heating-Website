
# MarGav Heating Website

Marketing website for MarGav Heating built with React + Vite and Tailwind utilities.

## Features

- Glassmorphic responsive header with active-section highlighting
- Full-screen mobile navigation overlay (scroll lock + close button)
- Hero, About, Services, Testimonials, Partners and Contact sections
- Finance disclaimer banner below hero
- Floating WhatsApp chat button
- Footer with updated company, contact and legal information
- Partner/accreditation logo marquee (grayscale, right-to-left loop)

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide icons
- Motion (`motion/react`)

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Notes

- Main app entry: `src/app/App.tsx`
- UI sections: `src/app/components`
- Brand/media assets: `src/assets`
- Environment templates: `.env.example`

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Push this project to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the repository.
4. Keep defaults for Vite:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables from `.env` (if needed).
6. Click **Deploy**.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

For production deploy:

```bash
vercel --prod
```

## Contact Details Used In Site

- Phone: `01889 256069`
- Email: `sales@margav.energy`
- Address: `Unit 7-8, Kimberley Business Park, Kimberley Way, Rugeley WS15 1RE`
  