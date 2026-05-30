"use client";

import * as React from "react";
import Image from "next/image";
import {
    Upload,
    Mic,
    MicOff,
    Sparkles,
    Loader2,
    Copy,
    Languages,
    Tag,
    Wand2,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIES } from "@/lib/data";
import type { AIGeneratedContent } from "@/lib/types";
import { toast } from "sonner";

export default function UploadPage() {
    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState<string>("Pottery");
    const [price, setPrice] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [isRecording, setIsRecording] = React.useState(false);
    const [content, setContent] = React.useState<AIGeneratedContent | null>(null);
    const [loading, setLoading] = React.useState(false);

    const recognitionRef = React.useRef<any>(null);

    const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImageUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const toggleRecording = () => {
        const SR =
            (typeof window !== "undefined" &&
                ((window as any).SpeechRecognition ||
                    (window as any).webkitSpeechRecognition)) ||
            null;
        if (!SR) {
            toast.error("Voice recognition not supported in this browser. Please type instead.");
            return;
        }
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
            return;
        }
        const rec = new SR();
        rec.lang = "en-IN";
        rec.continuous = true;
        rec.interimResults = true;
        rec.onresult = (e: any) => {
            const transcript = Array.from(e.results)
                .map((r: any) => r[0].transcript)
                .join(" ");
            setDescription(transcript);
        };
        rec.onerror = () => setIsRecording(false);
        rec.onend = () => setIsRecording(false);
        rec.start();
        recognitionRef.current = rec;
        setIsRecording(true);
        toast("Listening... speak about your craft", { icon: "🎤" });
    };

    const generate = async () => {
        if (!name || !description) {
            toast.error("Please add a product name and a short description first.");
            return;
        }
        setLoading(true);
        setContent(null);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    productName: name,
                    category,
                    price: Number(price) || 0,
                    description,
                    location: location || "India",
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error ?? "Generation failed");
            setContent(data.content);
            toast.success("AI marketing kit generated!");
        } catch (err: any) {
            toast.error(err?.message ?? "Couldn't reach the AI service");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-page py-10">
            <div className="mb-8">
                <span className="pill">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Listing Studio · Powered by Groq
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                    Upload a craft. Get a complete marketing kit in 10 seconds.
                </h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Speak in any language, snap a photo. KalaSetu&apos;s AI will write your title,
                    cultural story, captions, hashtags and translations.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-5">
                {/* Form */}
                <div className="lg:col-span-2">
                    <div className="rounded-3xl border bg-card p-6">
                        <h2 className="font-display text-lg font-bold">Product details</h2>

                        {/* Image */}
                        <div className="mt-5">
                            <Label>Product image</Label>
                            <label className="mt-2 flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-secondary/40 transition hover:border-terracotta-400">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt="Product"
                                        width={600}
                                        height={400}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-muted-foreground">
                                        <Upload className="h-6 w-6" />
                                        <span className="mt-2 text-xs">Click or drag to upload</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={onImage}
                                />
                            </label>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <Field label="Product name">
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jaipur Blue Pottery Vase"
                                />
                            </Field>
                            <Field label="Category">
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((c) => (
                                            <SelectItem key={c.name} value={c.name}>
                                                {c.emoji} {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field label="Price (₹)">
                                <Input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="1200"
                                />
                            </Field>
                            <Field label="Artisan location">
                                <Input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Jaipur, Rajasthan"
                                />
                            </Field>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <Label>Describe your craft</Label>
                                <button
                                    type="button"
                                    onClick={toggleRecording}
                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${isRecording
                                            ? "bg-red-500 text-white"
                                            : "bg-secondary text-foreground hover:bg-secondary/70"
                                        }`}
                                >
                                    {isRecording ? (
                                        <>
                                            <MicOff className="h-3 w-3" /> Stop
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="h-3 w-3" /> Voice
                                        </>
                                    )}
                                </button>
                            </div>
                            <Textarea
                                className="mt-2"
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Speak or type about the materials, technique, story..."
                            />
                        </div>

                        <Button
                            onClick={generate}
                            variant="gradient"
                            size="lg"
                            className="mt-5 w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Generating with Groq...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="h-4 w-4" />
                                    Generate Marketing Kit
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-3">
                    {!content && !loading && <EmptyOutput />}
                    {loading && <LoadingOutput />}
                    {content && <Output content={content} onRegenerate={generate} />}
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <Label>{label}</Label>
            {children}
        </div>
    );
}

function EmptyOutput() {
    return (
        <div className="grid h-full min-h-[500px] place-items-center rounded-3xl border border-dashed bg-card/60 p-10 text-center">
            <div>
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-terracotta-500 to-teal-500 text-white shadow-lg">
                    <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">
                    Your AI marketing kit will appear here
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Fill in the details on the left and tap{" "}
                    <span className="font-medium text-foreground">Generate</span>. Groq will craft
                    a title, story, captions, hashtags and Hindi translation in seconds.
                </p>
            </div>
        </div>
    );
}

function LoadingOutput() {
    return (
        <div className="space-y-4 rounded-3xl border bg-card p-6">
            <div className="flex items-center gap-3 text-sm text-terracotta-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                Crafting your marketing kit with Groq...
            </div>
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="h-20 overflow-hidden rounded-2xl bg-secondary/50 shimmer"
                />
            ))}
        </div>
    );
}

function Output({
    content,
    onRegenerate,
}: {
    content: AIGeneratedContent;
    onRegenerate: () => void;
}) {
    const copy = (text: string, name: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${name} copied`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-display text-2xl font-bold">Marketing Kit</h2>
                    <p className="text-xs text-muted-foreground">
                        Powered by Groq · Tap any card to edit before posting
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={onRegenerate}>
                    <RefreshCw className="h-3.5 w-3.5" />
                    Regenerate
                </Button>
            </div>

            <Tabs defaultValue="content">
                <TabsList>
                    <TabsTrigger value="content">Listing</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="i18n">Translations</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-3">
                    <OutputCard
                        title="Product Title"
                        value={content.productTitle}
                        onCopy={() => copy(content.productTitle, "Title")}
                    />
                    <OutputCard
                        title="Product Description"
                        value={content.productDescription}
                        multiline
                        onCopy={() => copy(content.productDescription, "Description")}
                    />
                    <OutputCard
                        title="Cultural Story"
                        value={content.culturalStory}
                        multiline
                        onCopy={() => copy(content.culturalStory, "Story")}
                        accent
                    />
                </TabsContent>

                <TabsContent value="social" className="space-y-3">
                    <OutputCard
                        title="Instagram Caption"
                        value={content.instagramCaption}
                        multiline
                        onCopy={() => copy(content.instagramCaption, "Caption")}
                    />
                    <OutputCard
                        title="Facebook Post"
                        value={content.facebookPost}
                        multiline
                        onCopy={() => copy(content.facebookPost, "Facebook post")}
                    />
                    <OutputCard
                        title="Marketing Banner Copy"
                        value={content.marketingCopy}
                        onCopy={() => copy(content.marketingCopy, "Banner copy")}
                    />
                </TabsContent>

                <TabsContent value="seo" className="space-y-3">
                    <div className="rounded-2xl border bg-card p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <Tag className="h-4 w-4 text-terracotta-600" />
                                15 Hashtags
                            </div>
                            <button
                                onClick={() => copy(content.hashtags.join(" "), "Hashtags")}
                                className="text-xs text-primary"
                            >
                                Copy all
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {content.hashtags.map((h) => (
                                <span
                                    key={h}
                                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-terracotta-700"
                                >
                                    {h}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl border bg-card p-5">
                        <div className="mb-3 text-sm font-semibold">SEO Keywords</div>
                        <div className="flex flex-wrap gap-2">
                            {content.seoKeywords.map((k) => (
                                <span
                                    key={k}
                                    className="rounded-md border bg-secondary/40 px-2.5 py-1 text-xs"
                                >
                                    {k}
                                </span>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="i18n" className="space-y-3">
                    <OutputCard
                        title="English Translation"
                        value={content.englishTranslation}
                        multiline
                        icon={Languages}
                        onCopy={() => copy(content.englishTranslation, "English")}
                    />
                    <OutputCard
                        title="Hindi · हिन्दी"
                        value={content.hindiTranslation}
                        multiline
                        icon={Languages}
                        onCopy={() => copy(content.hindiTranslation, "Hindi")}
                        accent
                    />
                </TabsContent>

                <TabsContent value="insights" className="space-y-3">
                    {content.suggestedPrice && (
                        <div className="rounded-2xl border bg-card p-5">
                            <div className="text-sm font-semibold">Smart Pricing Suggestion</div>
                            <div className="mt-2 font-display text-2xl font-bold text-terracotta-700">
                                ₹{content.suggestedPrice.min.toLocaleString("en-IN")} – ₹
                                {content.suggestedPrice.max.toLocaleString("en-IN")}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Based on craft, region, materials and current marketplace demand.
                            </p>
                        </div>
                    )}
                    {content.targetAudience && (
                        <div className="rounded-2xl border bg-card p-5">
                            <div className="text-sm font-semibold">Recommended Target Audience</div>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/85">
                                {content.targetAudience.map((a) => (
                                    <li key={a}>{a}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {content.festivalHooks && (
                        <div className="rounded-2xl border bg-gradient-to-br from-terracotta-50 to-cream p-5">
                            <div className="text-sm font-semibold">Festival Promotion Ideas 🪔</div>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/85">
                                {content.festivalHooks.map((f) => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function OutputCard({
    title,
    value,
    multiline,
    onCopy,
    icon: Icon = Sparkles,
    accent,
}: {
    title: string;
    value: string;
    multiline?: boolean;
    onCopy: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    accent?: boolean;
}) {
    const [text, setText] = React.useState(value);
    React.useEffect(() => setText(value), [value]);

    return (
        <div
            className={`rounded-2xl border p-5 ${accent ? "border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-cream" : "bg-card"
                }`}
        >
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icon className="h-4 w-4 text-terracotta-600" />
                    {title}
                </div>
                <button
                    onClick={onCopy}
                    className="inline-flex items-center gap-1 text-xs text-primary"
                >
                    <Copy className="h-3 w-3" /> Copy
                </button>
            </div>
            {multiline ? (
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                />
            ) : (
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                />
            )}
        </div>
    );
}
