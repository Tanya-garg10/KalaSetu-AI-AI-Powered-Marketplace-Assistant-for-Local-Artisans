# 🪔 KalaSetu AI

> Bridging Traditional Crafts with Modern Digital Markets

KalaSetu AI is an AI-powered marketplace that empowers India's master artisans to list, market and sell their handmade crafts globally — in their own language. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Firebase** and **Groq AI**.

## ✨ Features

- 🎨 Stunning Indian-meets-modern landing page (warm terracotta + teal palette)
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

The fastest way to put KalaSetu AI live in under 5 minutes.

### Option A — One-click via dashboard (recommended)

1. Push this repo to GitHub (already done if you cloned us).
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repo.
3. Framework preset will auto-detect as **Next.js** — leave defaults.
4. Add these environment variables in the **Environment Variables** panel:

   | Key | Value | Required |
   | --- | --- | --- |
   | `GROQ_API_KEY` | from [console.groq.com/keys](https://console.groq.com/keys) | yes |
   | `GROQ_MODEL` | `llama-3.3-70b-versatile` | optional |
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | your Firebase web key | optional |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` | optional |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | your Firebase project ID | optional |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` | optional |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | your sender ID | optional |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | your Firebase app ID | optional |

5. Click **Deploy**. First build takes ~2 minutes. You'll get a URL like
   `https://kalasetu-ai.vercel.app`.

> 💡 Without Firebase env vars the app runs in **demo mode**: any email/password
> signs you in (state stored in localStorage). Perfect for hackathon judging.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel              # first deploy: link / create project, follow prompts
vercel --prod       # promote to production
```

When the CLI asks `Set up and deploy?` choose **Yes**, then accept defaults
(scope = your account, link to existing project = No, project name =
`kalasetu-ai`, code dir = `./`, modify settings = No).

After the first deploy, set env vars:

```bash
vercel env add GROQ_API_KEY production
vercel env add GROQ_MODEL production
# (Firebase vars optional — repeat for each)
vercel --prod
```

### Auto-deploy on every push

Vercel automatically deploys every push to `main` to production, and every
pull request gets a preview URL. No CI config needed.

## 🛣 Roadmap & Future Improvements

KalaSetu AI is a hackathon-quality MVP. The vision is much larger — here's
what's next, organised by horizon.

### Near-term (next 4 weeks)

- 📸 **AI image enhancement** — auto-clean product photos taken on entry-level
  phones (background removal, exposure fix, white-balance) using a vision
  model before listing.
- 🛒 **Cart, checkout & Razorpay/Stripe integration** — currently the
  marketplace is read-only; add full purchase flow with order tracking.
- 🗣 **Voice input in 12 Indian languages** — extend the AI Studio voice
  recorder to use Whisper / IndicWhisper for Tamil, Bengali, Marathi, Telugu
  and others, not just English-India.
- 📦 **Shipping label generator** — integrate Shiprocket / Delhivery to print
  prepaid labels straight from the dashboard, since rural artisans rarely
  have access to courier accounts.
- 🪪 **Verified Artisan KYC** — replace the demo certificate with a real
  Aadhaar-linked artisan verification flow (Digilocker API).

### Mid-term (3–6 months)

- 📱 **Mobile app (React Native + Expo)** — currently a waitlist page; ship
  Android first since 90% of artisan users are on Android. Offline-first with
  background sync.
- 💬 **WhatsApp listing bot** — let artisans send a photo + voice note to a
  WhatsApp number and receive an AI-generated listing back, no app needed.
- 🤝 **Buyer-artisan chat** — replace the contact-form modal with persistent
  Firestore-backed messaging, with auto-translation between buyer and
  artisan languages.
- 🏦 **Direct UPI payouts** — every order disburses straight to the artisan's
  bank/UPI within 24 hours, no middleman wallet.
- 🧠 **Smart festival drops** — AI calendar that auto-suggests products and
  collections to surface ahead of Diwali, Eid, Karva Chauth, Christmas etc.,
  with dynamic banners and pricing nudges.

### Long-term (6–18 months)

- 🌍 **International marketplace** — multi-currency, GST-compliant cross-border
  checkout for buyers in the US / EU / Middle East. Includes IGST, IEC code
  registration help and DGFT compliance.
- 🪡 **Co-creation studio** — AI matches buyers to artisans for custom commissions,
  with milestone-based escrow payments and AR previews of in-progress work.
- 🏛 **Provenance on-chain** — replace the JSON-fingerprint cert with a real
  Polygon-based provenance ledger so each piece has a tamper-proof origin
  record buyers can verify with a QR scan.
- 🤖 **Vision-grade authenticity AI** — train a model on each craft's signature
  motifs to flag counterfeits and protect GI-tagged crafts (Banarasi, Bidri,
  Channapatna, Pashmina) from imitation.
- 🎓 **KalaSetu Academy** — short, voice-first video courses in Indian
  languages teaching pricing, packaging, photography, and digital basics.
  Free for verified artisans.
- 🌱 **Impact dashboard** — public, transparent metrics: total artisan income
  paid out, % to women, % to SC/ST/tribal communities, festivals served,
  trees planted by bamboo crafts. Updated live.
- 🏪 **Physical pop-ups** — partner with city malls, airports and hotels for
  curated KalaSetu corners with the same QR-linked story experience.

### Ideas under exploration

- 🎙 **AI co-narrator** — when an artisan records their voice note, the AI
  doesn't just transcribe — it asks gentle follow-up questions ("kya yeh
  motif aapki maa ne sikhaya?") to capture richer cultural context.
- 🪡 **Group buys for raw materials** — a shared marketplace where 10 weavers
  in a village can pool orders for silk or zari to access wholesale prices.
- 🕊 **Heir-loom programme** — registered KalaSetu pieces can be passed to a
  new owner with the provenance and story intact, like an art-world title
  deed.

Have an idea? Open an issue or PR on the repo. We read every one.

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
