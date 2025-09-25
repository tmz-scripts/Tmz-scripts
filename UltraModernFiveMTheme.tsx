
import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsProvider } from "./components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/ui/select";
import { Separator } from "./components/ui/separator";
import { CommandDialog, CommandInput, CommandList, CommandItem, CommandEmpty } from "./components/ui/command";
import { Star, ShoppingCart, Search, ShieldCheck, Zap, Sparkles, ChevronRight, X, Cpu, CloudDownload, Wrench, Menu, Sun, Moon, Github, CreditCard } from "lucide-react";

/*
  Ultra‑modern FiveM script shop (Most‑inspired, original UI)
  – Gradient mesh background, glass cards, micro‑interactions, command palette.
  – Accessible, responsive, dark‑first, subtle parallax, quick‑view.
  – Drop-in single file React component.
*/

const PRODUCTS = [
  { id: "traffic-ai", title: "Traffic AI Controller", price: 24, rating: 4.8, framework: "Standalone", tags: ["AI","Vehicles"], image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200", featured: true, blurb: "Smarter NPC driving, fewer pileups, dynamic lights." },
  { id: "qb-jobs", title: "QBCore Advanced Jobs", price: 32, rating: 4.7, framework: "QBCore", tags: ["Economy","Jobs"], image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200", blurb: "Plug‑and‑play careers with progression and payouts." },
  { id: "esx-garage", title: "ESX Premium Garage", price: 19, rating: 4.5, framework: "ESX", tags: ["Vehicles"], image: "https://images.unsplash.com/photo-1518306727298-4c17e1bf6941?q=80&w=1200", blurb: "Storage, impounds, keys, valet, and UI themes." },
  { id: "heist-framework", title: "Heist Framework Pro", price: 44, rating: 4.9, framework: "Standalone", tags: ["Heists","Gameplay"], image: "https://images.unsplash.com/photo-1517814649130-543c1c3fef07?q=80&w=1200", featured: true, blurb: "Scalable multi‑stage robberies with dynamic guards." },
  { id: "police-mdt", title: "Police MDT Suite", price: 29, rating: 4.6, framework: "QBCore", tags: ["Police","UI"], image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200", blurb: "Cases, BOLOs, warrants, evidence chain, exports." },
  { id: "banking-esx", title: "ESX Banking & Cards", price: 21, rating: 4.4, framework: "ESX", tags: ["Economy"], image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=1200", blurb: "Accounts, cards, IBAN, invoices, taxes, exports." },
  { id: "inventory-ux", title: "Inventory UX Overhaul", price: 27, rating: 4.7, framework: "Standalone", tags: ["UI","QoL"], image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200", blurb: "Drag‑and‑drop, tooltips, weight, quick‑split, skins." },
  { id: "qb-housing", title: "QBCore Housing System", price: 35, rating: 4.8, framework: "QBCore", tags: ["Housing","Gameplay"], image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200", blurb: "Ownership, interiors, stash perms, realtor flow." },
];

const CASE_STUDIES = [
  { id: "sapphire-rp", title: "Sapphire RP: +30% retention", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200", summary: "Heist Pro + economy rebalance boosted mid‑term engagement.", link: "#" },
  { id: "neon-city", title: "Neon City: 1.5× peak CCU", image: "https://images.unsplash.com/photo-1520083300261-8a9a3aa00fdf?q=80&w=1200", summary: "Traffic AI + MDT cut griefing and improved RP depth.", link: "#" },
  { id: "outlaw-pines", title: "Outlaw Pines: ARPPU +22%", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200", summary: "Housing + Banking enabled tasteful monetization tiers.", link: "#" },
];

const MARQUEE = [
  "Instant delivery", "Fraud‑safe licensing", "Optimized net events", "Zero bloat", "Accessible UIs", "Type‑safe exports"
];

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefers);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add('dark') : root.classList.remove('dark');
  }, [dark]);
  return { dark, setDark } as const;
}

function GradientBG() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  return (
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y }} className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-[80px] blur-3xl opacity-[.35] dark:opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(99,102,241,.18),transparent),radial-gradient(800px_500px_at_90%_10%,rgba(56,189,248,.18),transparent),radial-gradient(900px_700px_at_50%_120%,rgba(20,184,166,.18),transparent)]" />
      <div className="absolute inset-0 mix-blend-soft-light bg-[linear-gradient(120deg,rgba(255,255,255,.06)_0%,rgba(255,255,255,0)_60%)]" />
      <div className="absolute inset-0 opacity-[.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.div>
  );
}

function Rating({ value }: { value: number }) {
  const stars = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < stars ? "fill-current" : "opacity-30"}`} />
      ))}
      <span className="ml-1 text-sm opacity-70">{value.toFixed(1)}</span>
    </div>
  );
}

function ProductCard({ item, onAdd, onQuick }: any) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="group rounded-3xl overflow-hidden border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,.2)]">
        <div className="relative">
          <img src={item.image} alt="Preview" className="h-52 w-full object-cover" />
          {item.featured && (
            <Badge className="absolute top-3 left-3">Featured</Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <span className="line-clamp-1">{item.title}</span>
            <span className="text-base font-semibold">${item.price}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm opacity-80 line-clamp-2">{item.blurb}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{item.framework}</Badge>
            <Rating value={item.rating} />
          </div>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t: string) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={() => onAdd(item)}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Buy now
            </Button>
            <Button variant="secondary" onClick={() => onQuick(item)}>Quick view</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Topbar({ onOpenCart, dark, setDark, onOpenCmd }: any) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-400" />
          <span className="font-bold text-xl tracking-tight">ScriptHub</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#store" className="opacity-80 hover:opacity-100">Store</a>
          <a href="#cases" className="opacity-80 hover:opacity-100">Case Studies</a>
          <a href="#pricing" className="opacity-80 hover:opacity-100">Pricing</a>
          <a href="#blog" className="opacity-80 hover:opacity-100">Blog</a>
          <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onOpenCmd} aria-label="Open command">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
          </Button>
          <Button className="hidden sm:inline-flex" onClick={onOpenCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Cart
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpenMenu(!openMenu)} aria-label="Open menu">☰</Button>
        </div>
      </div>
      {openMenu && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {[["Store","#store"],["Case Studies","#cases"],["Pricing","#pricing"],["Blog","#blog"],["Contact","#contact"]].map(([label, href]) => (
            <a key={label} href={href} className="block text-sm opacity-90 py-2">{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -30]);
  return (
    <section className="relative overflow-hidden">
      <GradientBG />
      <motion.div style={{ y }} className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Ultra‑modern FiveM <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 bg-clip-text text-transparent">script store</span>
          </motion.h1>
          <p className="mt-6 text-lg opacity-80 max-w-xl">Performance‑driven, accessible resources for ESX, QBCore, and standalone. Instant licensing. Zero bloat.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#store"><Button>Browse Scripts</Button></a>
            <a href="#contact"><Button variant="secondary"><Wrench className="mr-2 h-4 w-4"/>Custom Work</Button></a>
          </div>
          <div className="mt-8 flex items-center gap-6 opacity-80 text-sm">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Secure licensing</div>
            <div className="flex items-center gap-2"><CloudDownload className="h-4 w-4"/> Instant delivery</div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4"/> Optimized</div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .1 }}>
          <div className="relative rounded-[28px] border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-4 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1400" className="rounded-2xl" alt="Editor screenshot" />
            <div className="absolute -bottom-6 -right-6 hidden md:block">
              <Card className="rounded-2xl shadow-xl">
                <CardContent className="p-4 flex items-center gap-3">
                  <Cpu className="h-5 w-5" />
                  <div>
                    <div className="text-sm font-semibold">120–180 FPS</div>
                    <div className="text-xs opacity-70">on popular frameworks</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-y border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <motion.div className="flex gap-10 py-3 whitespace-nowrap" animate={{ x: [0, -600] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
            {Array.from({ length: 3 }).flatMap(() => MARQUEE).map((t, i) => (
              <span key={i} className="text-sm opacity-80">{t} •</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Store({ onAdd, onQuick }: any) {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => tab === "All" || p.framework === tab);
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    if (sort === "price-asc") list = [...list].sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") list = [...list].sort((a,b)=>b.price-a.price);
    if (sort === "popular") list = [...list].sort((a,b)=>b.rating - a.rating);
    return list;
  }, [tab, q, sort]);

  return (
    <section id="store" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Store</h2>
          <p className="opacity-80 mt-2 max-w-2xl">Production‑ready FiveM resources. Instant license after checkout. Free minor updates.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort"/></SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most popular</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70" />
            <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search scripts…" className="pl-9" />
          </div>
        </div>
      </div>

      <TabsProvider value={tab} onValueChange={setTab}>
        <Tabs value={tab} onValueChange={setTab} className="mt-6">
          <TabsList className="grid grid-cols-4 max-w-xl">
            {['All','ESX','QBCore','Standalone'].map(t => (
              <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tab} className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p)=> (
                <ProductCard key={p.id} item={p} onAdd={onAdd} onQuick={onQuick} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </TabsProvider>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="cases" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Case Studies</h2>
          <p className="opacity-80 mt-2 max-w-2xl">How teams shipped memorable gameplay loops and stable economies.</p>
        </div>
        <Button variant="secondary">View all <ChevronRight className="ml-1 h-4 w-4"/></Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {CASE_STUDIES.map(c => (
          <Card key={c.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl">
            <img src={c.image} alt="Case study" className="h-48 w-full object-cover" />
            <CardHeader>
              <CardTitle className="text-xl">{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-80 text-sm">{c.summary}</p>
              <Button variant="link" className="px-0 mt-1">Read more →</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Support & Updates</h2>
        <p className="opacity-80 mt-2">Simple, predictable pricing for studios of any size.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {[{
          name: "Indie",
          price: "$0",
          desc: "Community support, bugfix updates",
          features: ["Single‑server license","Documentation access","Community Discord"]
        },{
          name: "Studio",
          price: "$12/mo",
          desc: "Priority support & roadmap input",
          features: ["3 server licenses","Priority tickets","Beta builds"]
        },{
          name: "Enterprise",
          price: "Contact",
          desc: "Custom features & SLAs",
          features: ["Unlimited servers","Custom integrations","SLA support"]
        }].map((plan, i)=> (
          <Card key={plan.name} className={`rounded-3xl border-white/10 ${i===1? "ring-2 ring-indigo-500" : ""}`}>
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span>{plan.name}</span>
                <span className="text-2xl font-extrabold">{plan.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="opacity-80">{plan.desc}</p>
              <Separator />
              <ul className="space-y-2 text-sm">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2">✔ {f}</li>
                ))}
              </ul>
              <Button className="w-full">Choose plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  const posts = [
    { id: 1, title: "September Update: Heist Balancer", date: "Sep 12, 2025", excerpt: "New difficulty scaling, better NPC pathing, and exploit fixes." },
    { id: 2, title: "Optimizing Client Performance", date: "Aug 28, 2025", excerpt: "How we keep draw calls and network usage under control." },
    { id: 3, title: "QBCore vs ESX in 2025", date: "Jul 07, 2025", excerpt: "Trade‑offs we see in real deployments across 50+ servers." },
  ];
  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">From the blog</h2>
          <p className="opacity-80 mt-2 max-w-2xl">Changelogs, deep dives, and lessons learned shipping production resources.</p>
        </div>
        <Button variant="secondary">All posts</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {posts.map(p => (
          <Card key={p.id} className="rounded-3xl border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">{p.title}</CardTitle>
              <div className="text-sm opacity-60">{p.date}</div>
            </CardHeader>
            <CardContent>
              <p className="opacity-80 text-sm">{p.excerpt}</p>
              <Button variant="link" className="px-0 mt-1">Read more →</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Let’s build something great</h2>
          <p className="opacity-80 mt-2">Need custom work or a feature request? Tell us what you’re building.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">✔ Secure payments via Stripe</div>
            <div className="flex items-center gap-2">✔ Private repo access</div>
            <div className="flex items-center gap-2">✔ VAT/GST invoices</div>
            <div className="flex items-center gap-2">✔ Roadmap voting</div>
          </div>
        </div>
        <Card className="rounded-3xl border-white/10">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Your name" />
              <Input placeholder="Email" type="email" />
            </div>
            <Input placeholder="Framework (ESX, QBCore, Standalone)" />
            <Input placeholder="Subject" />
            <textarea placeholder="Tell us about your project…" className="w-full h-32 rounded-md border bg-transparent p-3" />
            <Button className="w-full">Send message</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-400" />
          <p className="mt-3 text-sm opacity-80">Premium FiveM resources for high‑quality roleplay communities.</p>
        </div>
        <div>
          <div className="font-semibold">Products</div>
          <ul className="mt-2 space-y-1 text-sm opacity-80">
            <li><a href="#store">All scripts</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#blog">Changelog</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-2 space-y-1 text-sm opacity-80">
            <li><a href="#cases">Case studies</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Terms & License</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Newsletter</div>
          <div className="mt-2 flex gap-2">
            <Input placeholder="Email address" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 pb-10 text-xs opacity-60 text-center">© {new Date().getFullYear()} ScriptHub. Not affiliated with Rockstar Games or Take‑Two. For FiveM (Cfx.re) only.</div>
    </footer>
  );
}

export default function UltraModernFiveMTheme() {
  const { dark, setDark } = useTheme();
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{id:string; title:string; price:number}[]>([]);
  const [quick, setQuick] = useState<any | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);

  function addToCart(item:any){
    setCartOpen(true);
    setCart(prev => prev.some(p => p.id === item.id) ? prev : [...prev, { id: item.id, title: item.title, price: item.price }]);
  }

  const subtotal = cart.reduce((s,i)=>s+i.price,0);

  return (
    <div className={dark? "dark" : ""}>
      <div className="min-h-screen bg-white text-black dark:bg-[#070a0f] dark:text-white">
        <Topbar onOpenCart={()=>setCartOpen(true)} dark={dark} setDark={setDark} onOpenCmd={()=>setCmdOpen(true)} />
        <Hero />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-6">
          {[{ title: "Secure Licensing", text: "Per‑server keys with automatic activation and fraud checks." },
            { title: "Performance First", text: "Client and server optimized; idle usage near zero." },
            { title: "Polished UX", text: "Clean UIs, clear configs, and thorough docs." }].map((f) => (
            <Card key={f.title} className="rounded-3xl border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="font-semibold">{f.title}</div>
                <p className="opacity-80 text-sm">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Store onAdd={addToCart} onQuick={setQuick} />
        <CaseStudies />
        <Pricing />
        <Blog />
        <Contact />
        <Footer />

        {/* Cart drawer */}
        {cartOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={()=>setCartOpen(false)} />
            <div className="absolute right-0 inset-y-0 w-full sm:max-w-md bg-white dark:bg-[#0b0d12] border-l border-white/10 p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold">Your cart</h3>
              <div className="mt-6 space-y-4">
                {cart.length===0 ? (
                  <div className="text-sm opacity-80">No items yet. Explore the store and add scripts you like.</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm opacity-70">Single‑server license</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="font-semibold">${item.price}</div>
                        <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10" onClick={()=>setCart(c=>c.filter(x=>x.id!==item.id))}>✕</button>
                      </div>
                    </div>
                  ))
                )}
                <div className="h-px w-full bg-black/10 dark:bg-white/10" />
                <div className="flex items-center justify-between">
                  <div className="text-sm opacity-80">Subtotal</div>
                  <div className="font-semibold">${subtotal}</div>
                </div>
                <Button className="w-full">Checkout</Button>
                <p className="text-xs opacity-60">VAT calculated at checkout. By purchasing you agree to our license.</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick view modal */}
        {quick && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={()=>setQuick(null)} />
            <div className="relative z-10 w-[90%] max-w-5xl rounded-2xl border border-white/10 bg-white dark:bg-[#0b0d12] p-4">
              <div className="text-lg font-semibold mb-2">{quick.title}</div>
              <div className="grid md:grid-cols-2 gap-6">
                <img src={quick.image} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />
                <div className="space-y-3">
                  <p className="opacity-80">{quick.blurb}</p>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-black/10 dark:bg-white/10">{quick.framework}</span>
                    <Rating value={quick.rating} />
                  </div>
                  <ul className="text-sm opacity-80 list-disc pl-5 space-y-1">
                    <li>Type‑safe exports</li>
                    <li>Examples & docs included</li>
                    <li>Free minor updates</li>
                  </ul>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-2xl font-bold">${quick.price}</div>
                    <div className="flex gap-2">
                      <Button variant="secondary">Live Demo</Button>
                      <Button onClick={()=>{addToCart(quick);}}>Add to cart</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Command palette */}
        <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
          <CommandInput placeholder="Type to search scripts, pages…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            {PRODUCTS.map(p => (
              <CommandItem key={p.id} onSelect={()=>{ setCmdOpen(false); setQuick(p); }}>
                <span className="mr-2">🔎</span>{p.title}
              </CommandItem>
            ))}
          </CommandList>
        </CommandDialog>
      </div>
    </div>
  );
}
