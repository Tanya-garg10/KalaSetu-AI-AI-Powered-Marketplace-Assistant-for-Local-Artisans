import { NextResponse } from "next/server";
import { generateMarketingContent } from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productName, category, price, description, location } = body ?? {};
        if (!productName || !category || !description) {
            return NextResponse.json(
                { error: "productName, category and description are required" },
                { status: 400 }
            );
        }
        const content = await generateMarketingContent({
            productName,
            category,
            price: Number(price) || 0,
            description,
            location: location || "India",
        });
        return NextResponse.json({ content });
    } catch (err: any) {
        return NextResponse.json(
            { error: err?.message ?? "Something went wrong" },
            { status: 500 }
        );
    }
}
