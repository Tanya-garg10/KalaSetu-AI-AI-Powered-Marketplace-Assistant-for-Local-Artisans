# 🪔 KalaSetu AI

> Bridging Traditional Crafts with Modern Digital Markets

KalaSetu AI is an AI-powered marketplace that empowers India's master artisans to list, market and sell their handmade crafts globally — in their own language. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Firebase** and **Groq AI**.

## ✨ Features

- 🛍 Marketplace with category filters, search, sort, festival picks
- 📦 Product detail pages with cultural stories, reviews, artisan profiles
- 👤 Artisan story pages with AI-generated storytelling
- 🪄 **AI Listing Studio** Powered by Groq:
  - Voice-to-text product description (Web Speech API)
  - Auto-generated title, description, cultural story
  - Instagram caption, Facebook post, marketing copy
  - 15 hashtags + 8 SEO keywords
  - English & Hindi translations
  - Smart pricing, target audience, festival hooks
- 📊 Artisan dashboard with charts (Recharts) and product table
- 🛡 Admin dashboard with marketplace KPIs
- 🔐 Firebase Authentication (Google + Email) with graceful demo fallback
- 🌙 Dark mode, mobile-first responsive, toast notifications

## 🚀 Quick start

```bash
npm install
cp .env.local.example .env.local   # add your GROQ_API_KEY (optional)
npm run dev
```

Visit http://localhost:3000

> 💡 The app runs out-of-the-box without any API keys — Groq falls back to a curated mock generator and Firebase falls back to a local demo auth.

## 🔧 Environment variables

| Key | Purpose |
| --- | --- |
| `GROQ_API_KEY` | Groq AI API key for content generation |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Auth, Firestore, Storage credentials |

## 🗂 Folder structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/generate/    # Groq API route
│   ├── marketplace/     # Marketplace + product detail
│   ├── artisans/[id]/   # Artisan story
│   ├── upload/          # AI Listing Studio
│   ├── dashboard/       # Artisan dashboard
│   ├── admin/           # Admin dashboard
│   ├── login/, signup/  # Auth pages
│   └── layout.tsx
├── components/
│   ├── ui/              # ShadCN-style primitives
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── product-card.tsx
│   ├── auth-provider.tsx
│   └── theme-provider.tsx
└── lib/
    ├── data.ts          # Sample artisans, products, reviews
    ├── groq.ts        # Groq integration + mock fallback
    ├── firebase.ts      # Firebase wrapper + demo fallback
    ├── types.ts
    └── utils.ts
```

## 🪧 Deploy to Vercel

1. Push to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Add `GROQ_API_KEY` and the Firebase env vars in project settings.
4. Deploy.

## 📄 License

This project is open source under the [MIT License](./LICENSE).
Sample artisan stories and product copy are illustrative; cultural rights to
the crafts referenced (Jaipur Blue Pottery, Banarasi, Madhubani, Dhokra,
Pashmina, Pattachitra, Channapatna, Kantha, Bidri, Meenakari) belong to the
artisan communities of India.

## 🙏 Credits

- Imagery: [Unsplash](https://unsplash.com)
- Icons: [Lucide](https://lucide.dev)
- AI: [Groq](https://groq.com/)
- Auth + DB: [Firebase](https://firebase.google.com/)

Made with ❤️ for the artisans of India.
