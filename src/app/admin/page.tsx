"use client";

import Image from "next/image";
import { SmartImage } from "@/components/smart-image";
import { CraftIllustration } from "@/components/craft-illustration";
import {
    Users,
    ShoppingBag,
    Sparkles,
    Globe2,
    TrendingUp,
} from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import {
    ARTISANS,
    CATEGORY_SALES,
    PRODUCTS,
    SALES_DATA,
} from "@/lib/data";

const PIE_COLORS = ["#C9621D", "#DD7E3A", "#0E7A6E", "#F3C39A", "#A84D14", "#0B5F56"];

export default function AdminPage() {
    return (
        <div className="container-page py-10">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Admin Dashboard</p>
                    <h1 className="font-display text-3xl font-bold sm:text-4xl">
                        KalaSetu AI Control Center
                    </h1>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    All systems healthy
                </span>
            </div>

            {/* KPIs */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi label="Total Artisans" value="52,184" delta="+1,284 this week" icon={Users} />
                <Kpi label="Live Products" value="186,422" delta="+4,108 this week" icon={ShoppingBag} />
                <Kpi label="AI Listings Generated" value="1.24M" delta="+38% MoM" icon={Sparkles} />
                <Kpi label="Countries Reached" value="84" delta="+6 this quarter" icon={Globe2} />
            </div>

            {/* Charts */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border bg-card p-6 lg:col-span-2">
                    <h3 className="font-display text-lg font-bold">Marketplace GMV</h3>
                    <p className="text-xs text-muted-foreground">Monthly gross merchandise value</p>
                    <div className="mt-4 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={SALES_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#C9621D" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <h3 className="font-display text-lg font-bold">Popular categories</h3>
                    <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CATEGORY_SALES}
                                    dataKey="value"
                                    nameKey="name"
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

            {/* Tables */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-bold">Top Artisans</h3>
                        <span className="text-xs text-muted-foreground">By revenue Â· last 30 days</span>
                    </div>
                    <ul className="mt-4 divide-y">
                        {ARTISANS.map((a, i) => (
                            <li key={a.id} className="flex items-center gap-3 py-3">
                                <span className="w-5 text-sm text-muted-foreground">{i + 1}</span>
                                <div className="relative h-9 w-9 overflow-hidden rounded-full">
                                    <SmartImage src={a.avatar} alt={a.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold">{a.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {a.craft} Â· {a.location}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-emerald-600">
                                    <TrendingUp className="h-3 w-3" />
                                    +{20 - i * 2}%
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-bold">Latest products</h3>
                        <span className="text-xs text-muted-foreground">Pending review</span>
                    </div>
                    <ul className="mt-4 divide-y">
                        {PRODUCTS.slice(0, 6).map((p) => (
                            <li key={p.id} className="flex items-center gap-3 py-3">
                                <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                                    <CraftIllustration title={p.title} category={p.category} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold">{p.title}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {p.category} Â· {p.location}
                                    </div>
                                </div>
                                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium">
                                    â‚¹{p.price.toLocaleString("en-IN")}
                                </span>
                            </li>
                        ))}
                    </ul>
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
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    {delta}
                </span>
            </div>
            <div className="mt-4 font-display text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </div>
    );
}
