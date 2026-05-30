export type Category =
    | "Pottery"
    | "Textiles"
    | "Paintings"
    | "Bamboo Crafts"
    | "Jewelry"
    | "Handicrafts";

export interface Artisan {
    id: string;
    name: string;
    craft: string;
    location: string;
    state: string;
    bio: string;
    story: string;
    avatar: string;
    cover: string;
    generations: number;
    rating: number;
    productsCount: number;
}

export interface Product {
    id: string;
    title: string;
    category: Category;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    artisanId: string;
    badge?: "AI Featured" | "Bestseller" | "Trending" | "20% Off" | "New";
    description: string;
    story: string;
    hashtags: string[];
    location: string;
    inStock: number;
}

export interface Review {
    id: string;
    productId: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

export interface AIGeneratedContent {
    productTitle: string;
    productDescription: string;
    culturalStory: string;
    instagramCaption: string;
    facebookPost: string;
    marketingCopy: string;
    seoKeywords: string[];
    hashtags: string[];
    englishTranslation: string;
    hindiTranslation: string;
    suggestedPrice?: { min: number; max: number };
    targetAudience?: string[];
    festivalHooks?: string[];
}
