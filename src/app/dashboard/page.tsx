"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { SmartImage } from "@/components/smart-image";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar,
} from "recharts";
import {
    Plus,
    Sparkles,
    TrendingUp,
    ShoppingBag,
    Eye,
    Heart,
    ArrowUpRight,
    Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { CATEGORY_SALES, PRODUCTS, SALES_DATA } from "@/lib/data";
import { formatINR } from "@/lib/utils";

const PIE_COLORS = ["#C9621D", "#DD7E3A", "#0E7A6E", "#F3C39A", "#A84D14", "#0B5F56"];

export default function DashboardPage() {
    const { user } = useAuth();
    const myProducts = PRODUCTS.slice(0, 5);

    return (
        <div className="container-page py-10">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Welcome back,</p>
                    <h1 className="font-display text-3xl font-bold sm:text-4xl">
                        Namaste, {user?.displayName?.split(" ")[0] ?? "Artisan"} ðŸ™
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                        Here&apos;s what&apos;s happening with your shop today. Your AI marketing assistant
                        is ready when you are.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/marketplace">
                            <Eye className="h-4 w-4" />
                            View shop
                        </Link>
                    </Button>
                    <Button variant="gradient" asChild>
                        <Link href="/upload">
                            <Plus className="h-4 w-4" />
                            Upload Product
                        </Link>
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi
                    label="Total Revenue"
                    value={formatINR(355300)}
                    delta="+24.6%"
                    icon={TrendingUp}
                />
                <Kpi
                    label="Orders this month"
                    value="78"
                    delta="+12.1%"
                    icon={ShoppingBag}
                />
                <Kpi
                    label="Profile views"
                    value="12,840"
                    delta="+38.4%"
                    icon={Eye}
                />
                <Kpi
                    label="Wishlists"
                    value="2,193"
                    delta="+9.2%"
                    icon={Heart}
                />
            </div>

            {/* Charts */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border bg-card p-6 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-display text-lg font-bold">Sales overview</h3>
                            <p className="text-xs text-muted-foreground">Last 10 months</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                            +24.6% vs previous period
                        </span>
                    </div>
                    <div className="mt-5 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={SALES_DATA}>
                                <defs>
                                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#C9621D" stopOpacity={0.45} />
                                        <stop offset="100%" stopColor="#C9621D" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: "1px solid #eee",
                                        fontSize: 12,
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#C9621D"
                                    strokeWidth={2.5}
                                    fill="url(#g1)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <h3 className="font-display text-lg font-bold">Sales by category</h3>
                    <div className="mt-3 h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CATEGORY_SALES}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                >
                                    {CATEGORY_SALES.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    iconType="circle"
                                    wrapperStyle={{ fontSize: 12 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* AI assistant + product table */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border bg-gradient-to-br from-terracotta-700 to-terracotta-900 p-6 text-white lg:col-span-1">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">
                            AI Marketing Assistant
                        </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                        Ready to write your next listing?
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                        Upload a photo and a 30-second voice note. Groq will generate the title,
                        story, captions, hashtags and translations.
                    </p>
                    <div className="mt-5 space-y-2 text-sm">
                        <Suggestion text="Run a Diwali campaign with festival hooks" />
                        <Suggestion text="Translate top 5 listings into Tamil" />
                        <Suggestion text="Suggest pricing for your new pottery line" />
                    </div>
                    <Button variant="gradient" size="lg" className="mt-6 w-full" asChild>
                        <Link href="/upload">
                            <Wand2 className="h-4 w-4" />
                            Open AI Studio
                        </Link>
                    </Button>
                </div>

                <div className="rounded-3xl border bg-card p-6 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-display text-lg font-bold">Your products</h3>
                            <p className="text-xs text-muted-foreground">{myProducts.length} active listings</p>
                        </div>
                        <Link href="/upload" className="text-sm font-medium text-primary">
                            Manage all â†’
                        </Link>
                    </div>
                    <div className="mt-5 overflow-hidden rounded-xl border">
                        <table className="w-full text-sm">
                            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                                <tr>
                                    <th className="p-3">Product</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Stock</th>
                                    <th className="p-3">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myProducts.map((p) => (
                                    <tr key={p.id} className="border-t">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                                                    <SmartImage
                                                        src={p.image}
                                                        alt={p.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="line-clamp-1 font-medium">{p.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-muted-foreground">{p.category}</td>
                                        <td className="p-3 font-semibold">{formatINR(p.price)}</td>
                                        <td className="p-3">{p.inStock}</td>
                                        <td className="p-3">â­ {p.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Orders bar */}
            <div className="mt-6 rounded-3xl border bg-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-display text-lg font-bold">Orders by month</h3>
                        <p className="text-xs text-muted-foreground">
                            Smooth growth, especially during festival season
                        </p>
                    </div>
                </div>
                <div className="mt-5 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={SALES_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis dataKey="month" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#0E7A6E" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function Kpi({
    label,
    value,
    delta,
    icon: Icon,
}: {
    label: string;
    value: string;
    delta: string;
    icon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-terracotta-600">
                    <Icon className="h-4 w-4" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    <ArrowUpRight className="h-3 w-3" />
                    {delta}
                </span>
            </div>
            <div className="mt-4 font-display text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </div>
    );
}

function Suggestion({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            {text}
        </div>
    );
}
