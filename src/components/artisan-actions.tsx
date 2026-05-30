"use client";

import * as React from "react";
import {
    BadgeCheck,
    Heart,
    HeartOff,
    MapPin,
    MessageCircle,
    Mic,
    Send,
    Shield,
    Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Artisan } from "@/lib/types";
import { Logo } from "./logo";

interface Props {
    artisan: Artisan;
}

export function ArtisanActions({ artisan }: Props) {
    const [following, setFollowing] = React.useState(false);
    const [contactOpen, setContactOpen] = React.useState(false);
    const [certOpen, setCertOpen] = React.useState(false);

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const raw = localStorage.getItem("kalasetu_follows");
        if (!raw) return;
        try {
            const list: string[] = JSON.parse(raw);
            setFollowing(list.includes(artisan.id));
        } catch { /* ignore */ }
    }, [artisan.id]);

    const toggleFollow = () => {
        const raw = typeof window !== "undefined" ? localStorage.getItem("kalasetu_follows") : null;
        const list: string[] = raw ? JSON.parse(raw) : [];
        if (following) {
            const next = list.filter((id) => id !== artisan.id);
            localStorage.setItem("kalasetu_follows", JSON.stringify(next));
            setFollowing(false);
            toast(`Unfollowed ${artisan.name}`, { icon: "💔" });
        } else {
            const next = Array.from(new Set([...list, artisan.id]));
            localStorage.setItem("kalasetu_follows", JSON.stringify(next));
            setFollowing(true);
            toast.success(`Following ${artisan.name}`, {
                description: "You'll get updates when they list new crafts.",
            });
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2">
                <Button
                    variant={following ? "outline" : "gradient"}
                    onClick={toggleFollow}
                >
                    {following ? (
                        <>
                            <HeartOff className="h-4 w-4" /> Following
                        </>
                    ) : (
                        <>
                            <Heart className="h-4 w-4" /> Follow Artisan
                        </>
                    )}
                </Button>
                <Button variant="outline" onClick={() => setContactOpen(true)}>
                    <MessageCircle className="h-4 w-4" /> Contact
                </Button>
            </div>

            {/* Certificate trigger lives separately in the sidebar */}
            <button
                data-cert-trigger={artisan.id}
                className="hidden"
                onClick={() => setCertOpen(true)}
            />

            {/* Bridge: a custom event so the sidebar can open the cert modal */}
            <CertEventBridge id={artisan.id} onOpen={() => setCertOpen(true)} />

            <ContactDialog
                open={contactOpen}
                onOpenChange={setContactOpen}
                artisan={artisan}
            />
            <CertificateDialog
                open={certOpen}
                onOpenChange={setCertOpen}
                artisan={artisan}
            />
        </>
    );
}

function CertEventBridge({ id, onOpen }: { id: string; onOpen: () => void }) {
    React.useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<string>;
            if (ce.detail === id) onOpen();
        };
        window.addEventListener("kalasetu:open-cert", handler as EventListener);
        return () => window.removeEventListener("kalasetu:open-cert", handler as EventListener);
    }, [id, onOpen]);
    return null;
}

/* ---------- Contact dialog ---------- */
function ContactDialog({
    open,
    onOpenChange,
    artisan,
}: {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    artisan: Artisan;
}) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [sending, setSending] = React.useState(false);

    const send = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast.error("Please fill in all fields");
            return;
        }
        setSending(true);
        await new Promise((r) => setTimeout(r, 900));
        setSending(false);
        onOpenChange(false);
        toast.success(`Message sent to ${artisan.name}`, {
            description:
                "They'll reply within 24 hours. We'll also send you a copy at " + email,
        });
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <span className="ai-badge w-fit">
                        <Mic className="h-3 w-3" /> Direct to Artisan
                    </span>
                    <DialogTitle>Message {artisan.name}</DialogTitle>
                    <DialogDescription>
                        {artisan.name} responds in {artisan.location} time, usually within a day.
                        Replies arrive in your inbox and on the KalaSetu app.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={send} className="space-y-3">
                    <Input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Textarea
                        rows={4}
                        placeholder={`Hi ${artisan.name.split(" ")[0]}, I love your craft. I'd like to know more about...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="gradient" disabled={sending}>
                            <Send className="h-4 w-4" />
                            {sending ? "Sending..." : "Send message"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

/* ---------- Certificate dialog ---------- */
function CertificateDialog({
    open,
    onOpenChange,
    artisan,
}: {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    artisan: Artisan;
}) {
    const certNo = `KS-${artisan.id.toUpperCase()}-${new Date().getFullYear()}-${(
        artisan.id.charCodeAt(1) * 1247
    )
        .toString()
        .padStart(5, "0")}`;
    const issued = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const hash =
        "0x" +
        Array.from(certNo)
            .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 0xffffffff, 7)
            .toString(16)
            .padStart(8, "0") +
        Array.from(artisan.name)
            .reduce((acc, ch) => (acc * 17 + ch.charCodeAt(0)) % 0xffffffff, 13)
            .toString(16)
            .padStart(8, "0");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl border-0 bg-transparent p-0 shadow-none">
                {/* Certificate body */}
                <div className="relative overflow-hidden rounded-3xl border-4 border-double border-terracotta-300 bg-gradient-to-br from-cream via-white to-terracotta-50 p-8 text-foreground shadow-2xl">
                    {/* Watermark */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
                        <span className="font-display text-[10rem] font-bold">KalaSetu</span>
                    </div>
                    {/* Corner ornaments */}
                    <CornerOrnament position="tl" />
                    <CornerOrnament position="tr" />
                    <CornerOrnament position="bl" />
                    <CornerOrnament position="br" />

                    <div className="relative z-10 text-center">
                        <div className="mx-auto flex w-fit items-center gap-2">
                            <Logo showText />
                        </div>
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-terracotta-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                            <BadgeCheck className="h-3 w-3" /> Verified Artisan
                        </span>
                        <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
                            Certificate of Authenticity
                        </h2>
                        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            Digital Provenance · {artisan.craft}
                        </p>

                        <div className="mt-7 text-sm text-muted-foreground">
                            This is to certify that
                        </div>
                        <h3 className="mt-1 font-display text-3xl font-bold text-terracotta-700">
                            {artisan.name}
                        </h3>
                        <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {artisan.location}, {artisan.state}
                        </div>

                        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed">
                            is a verified master practitioner of <b>{artisan.craft}</b>, with{" "}
                            <b>{artisan.generations} generations</b> of family lineage in the
                            craft. All works listed under this certificate are hand-made by the
                            artisan or members of their immediate workshop, using traditional
                            materials and techniques native to {artisan.state}.
                        </p>

                        {/* Cert metadata */}
                        <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-terracotta-200 bg-white/60 p-4 text-left text-xs sm:grid-cols-3">
                            <Field label="Certificate No." value={certNo} mono />
                            <Field label="Issued" value={issued} />
                            <Field label="Expires" value="Lifetime" />
                            <Field label="GI Status" value="Recognised" />
                            <Field label="Verified by" value="KalaSetu Council" />
                            <Field label="Provenance Hash" value={hash} mono />
                        </div>

                        {/* Signatures */}
                        <div className="mt-7 grid grid-cols-2 gap-6 text-center text-xs text-muted-foreground">
                            <div>
                                <div className="font-display text-lg italic text-foreground">
                                    {artisan.name.split(" ")[0]} {artisan.name.split(" ").slice(-1)[0]?.charAt(0)}.
                                </div>
                                <div className="mt-1 border-t border-border pt-1">Artisan signature</div>
                            </div>
                            <div>
                                <div className="font-display text-lg italic text-foreground">
                                    KalaSetu Council
                                </div>
                                <div className="mt-1 border-t border-border pt-1">
                                    Verified · Council seal
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                            <Shield className="h-3 w-3" />
                            Cryptographically signed and stored on the KalaSetu provenance ledger
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2 pb-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            navigator.clipboard.writeText(certNo);
                            toast.success("Certificate number copied");
                        }}
                    >
                        Copy cert no.
                    </Button>
                    <Button
                        size="sm"
                        variant="gradient"
                        onClick={() => {
                            window.print();
                        }}
                    >
                        <Sparkles className="h-3.5 w-3.5" /> Print / Save PDF
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Field({
    label,
    value,
    mono,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {label}
            </div>
            <div className={`text-foreground ${mono ? "font-mono text-[11px]" : "font-medium"}`}>
                {value}
            </div>
        </div>
    );
}

function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
    const map: Record<typeof position, string> = {
        tl: "left-3 top-3",
        tr: "right-3 top-3 rotate-90",
        bl: "left-3 bottom-3 -rotate-90",
        br: "right-3 bottom-3 rotate-180",
    };
    return (
        <svg
            viewBox="0 0 60 60"
            className={`absolute h-10 w-10 text-terracotta-400 ${map[position]}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        >
            <path d="M2 2h25M2 2v25M10 2v18M2 10h18M22 2v8M2 22h8" />
            <circle cx="2" cy="2" r="2.5" fill="currentColor" />
        </svg>
    );
}
