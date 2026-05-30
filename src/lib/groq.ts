import Groq from "groq-sdk";
import type { AIGeneratedContent } from "./types";

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export async function generateMarketingContent(input: {
    productName: string;
    category: string;
    price: number;
    description: string;
    location: string;
}): Promise<AIGeneratedContent> {
    if (!apiKey) {
        return mockContent(input);
    }

    try {
        const client = new Groq({ apiKey });

        const system = `You are an Indian artisan marketing expert. You always respond with strict JSON only — no prose, no markdown fences. The JSON must match the schema given by the user exactly.`;

        const user = `A craftsperson uploaded a product. Generate a complete marketing kit.

PRODUCT
- Name: ${input.productName}
- Category: ${input.category}
- Price: ₹${input.price}
- Artisan description: ${input.description}
- Location: ${input.location}

Return ONLY this JSON shape (no extra keys):
{
  "productTitle": "evocative SEO title (max 70 chars)",
  "productDescription": "warm 2-3 sentence ecommerce description in English",
  "culturalStory": "120-150 word story about the craft, region and tradition",
  "instagramCaption": "Instagram caption with emojis and a CTA, 2-3 short paragraphs",
  "facebookPost": "Facebook post, slightly longer, friendly tone, mentions the artisan",
  "marketingCopy": "punchy banner copy under 25 words",
  "seoKeywords": ["8 SEO keywords"],
  "hashtags": ["15 relevant hashtags including #"],
  "englishTranslation": "polished English description",
  "hindiTranslation": "natural Hindi translation in Devanagari",
  "suggestedPrice": { "min": number, "max": number },
  "targetAudience": ["3-4 audience personas"],
  "festivalHooks": ["3 Indian festival promo angles e.g. Diwali, Navratri, Eid"]
}`;

        const completion = await client.chat.completions.create({
            model,
            temperature: 0.7,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: system },
                { role: "user", content: user },
            ],
        });

        const text = completion.choices[0]?.message?.content ?? "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON in Groq response");
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed as AIGeneratedContent;
    } catch (err) {
        console.error("Groq error, falling back to mock:", err);
        return mockContent(input);
    }
}

function mockContent(input: {
    productName: string;
    category: string;
    price: number;
    description: string;
    location: string;
}): AIGeneratedContent {
    return {
        productTitle: `Handcrafted ${input.productName} — Authentic ${input.category} from ${input.location}`,
        productDescription: `A beautifully handmade ${input.productName.toLowerCase()} created by a master artisan from ${input.location}. ${input.description} Each piece is one-of-a-kind, made with traditional techniques and natural materials.`,
        culturalStory: `Born in the heart of ${input.location}, this ${input.category.toLowerCase()} carries the soul of generations. The artisan family has preserved this craft for over a century, passing down techniques through whispered lessons by lamplight. Every motif tells a story of monsoon festivals, harvest songs and the rivers that shaped their village. When you bring this piece home, you bring with it the rhythm of the potter's wheel, the loom's heartbeat and the quiet pride of an India that still believes in making things by hand.`,
        instagramCaption: `✨ When tradition meets your living room ✨\n\nMeet the ${input.productName} — handcrafted in ${input.location} with love, patience and a 100-year-old technique. 🪔\n\nTap the link in bio to take a piece of India home. 🇮🇳\n\n#HandmadeInIndia #ArtisanMade #SupportLocal`,
        facebookPost: `Every ${input.productName.toLowerCase()} you see here was shaped by hands that have practiced this craft for decades. From the workshops of ${input.location}, this piece arrives at your door carrying the warmth of the artisan family who made it. By choosing it, you support a livelihood and keep a centuries-old tradition alive. ❤️`,
        marketingCopy: `Own a piece of India. Handmade in ${input.location}, delivered to your door with a story.`,
        seoKeywords: [
            `handmade ${input.category.toLowerCase()}`,
            `${input.location} ${input.category.toLowerCase()}`,
            "indian handicrafts",
            "artisan made",
            "traditional craft",
            "ethical shopping",
            "made in india",
            "buy handmade online",
        ],
        hashtags: [
            "#KalaSetuAI",
            "#HandmadeInIndia",
            "#ArtisanMade",
            `#${input.category.replace(/\s/g, "")}`,
            `#${input.location.split(",")[0].replace(/\s/g, "")}`,
            "#SupportLocal",
            "#IndianHeritage",
            "#TraditionalCraft",
            "#MadeWithLove",
            "#VocalForLocal",
            "#CraftIndia",
            "#ShopHandmade",
            "#IndianArtisans",
            "#HeritageArt",
            "#SlowMade",
        ],
        englishTranslation: `An exquisite handmade ${input.productName.toLowerCase()} from the artisan workshops of ${input.location}, crafted using traditional techniques refined over generations.`,
        hindiTranslation: `${input.location} के कारीगरों द्वारा हाथ से बनाई गई ${input.productName} — सदियों पुरानी परंपरा से जन्मी, प्रेम से तैयार और आपके घर के लिए बनी।`,
        suggestedPrice: {
            min: Math.round(input.price * 0.9),
            max: Math.round(input.price * 1.3),
        },
        targetAudience: [
            "Urban millennials decorating their first home",
            "NRI buyers seeking authentic Indian decor",
            "Conscious gifters during festival season",
            "Boutique hotels and curated retail stores",
        ],
        festivalHooks: [
            "Diwali Gifting Edit — light up homes with handcrafted heritage",
            "Navratri Decor Drop — celebrate nine nights with nine artisans",
            "Eid & Karva Chauth bundles for thoughtful gifting",
        ],
    };
}
