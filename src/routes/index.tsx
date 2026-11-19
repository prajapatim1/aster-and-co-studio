import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import teamImg from "@/assets/about-team.webp.asset.json";
import { Header, Brand, NAV } from "@/components/site/Header";
import { ContactForm } from "@/components/site/ContactForm";

const TITLE = "Aster & Co. — Strategy & digital innovation consultancy";
const DESC = "Aster & Co. helps ambitious organizations turn complexity into focused strategy and useful digital experiences. Book a discovery call.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const EMAIL = "hello@asterandco.example";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionHead({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="reveal grid gap-6 border-t border-foreground/80 pt-6 md:grid-cols-12">
      <p className="eyebrow md:col-span-3"><span className="text-primary">{eyebrow}</span></p>
      <div className="md:col-span-9">
        <h2 id={id} className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[4/5] w-full max-w-md select-none">
      <div className="animate-drift absolute right-[4%] top-[6%] size-[62%] rounded-full bg-terracotta-soft" />
      <div className="absolute bottom-[8%] left-[2%] size-[46%] rounded-[48%_52%_40%_60%] bg-sage-soft" />
      <div className="absolute left-[10%] top-[14%] w-[58%] border border-foreground/70 bg-card p-4 shadow-[6px_6px_0_0_var(--ink)]">
        <p className="eyebrow !text-[0.65rem]">Signal / Noise</p>
        <svg viewBox="0 0 200 80" className="mt-3 w-full">
          <polyline fill="none" stroke="var(--border)" strokeWidth="1.5" points="0,60 20,30 40,55 60,20 80,62 100,35 120,58 140,28 160,50 180,40 200,52" />
          <polyline fill="none" stroke="var(--terracotta)" strokeWidth="2.5" points="0,64 50,52 100,40 150,26 200,14" />
        </svg>
        <p className="mt-2 font-display text-2xl">+38%</p>
        <p className="text-xs text-muted-foreground">focus, quarter over quarter</p>
      </div>
      <div className="absolute bottom-[16%] right-[4%] w-[54%] bg-ink p-4 text-ink-foreground">
        <p className="font-mono text-[0.68rem] leading-relaxed opacity-80">priorities.sort(by: impact)<br />→ 3 bets, not 30</p>
        <div className="mt-3 flex gap-1.5">
          {[90, 64, 40].map((w, i) => <span key={i} className="h-1.5 rounded-full bg-terracotta" style={{ width: `${w / 3}%`, opacity: 1 - i * 0.25 }} />)}
        </div>
      </div>
      <span className="absolute right-[10%] top-[2%] font-display text-7xl italic text-primary">&amp;</span>
      <span className="absolute bottom-[2%] left-[48%] eyebrow !text-[0.62rem]">Fig. 01 — Clarity</span>
    </div>
  );
}

const SERVICES = [
  { n: "01", t: "Strategy & Positioning", d: "Decide where to play and how to win — then say it so plainly your whole team can repeat it.", items: ["Market & customer research", "Positioning and narrative", "Prioritized growth roadmap"] },
  { n: "02", t: "Digital Products", d: "Turn the plan into products people actually use, shipped in weeks rather than quarters.", items: ["Product discovery & prototyping", "UX and interface design", "Build partnership & launch"] },
  { n: "03", t: "Brand Systems", d: "A coherent identity that scales from pitch deck to product without losing its voice.", items: ["Identity & visual language", "Messaging frameworks", "Living design systems"] },
];

const STEPS = [
  { t: "Find the signal", d: "Two to three weeks of interviews, data and honest questions to separate what matters from what is merely loud." },
  { t: "Make the plan", d: "A short list of bets, sequenced and owned — with the trade-offs written down so decisions stick." },
  { t: "Build with purpose", d: "We design and ship alongside your team, measuring against the outcomes we agreed at the start." },
];

const WORK = [
  { tag: "Healthcare", client: "Meridian Clinics", ch: "A patient booking journey that lost half its visitors before step three.", m: "−42%", ml: "drop-off in booking", tone: "bg-sage-soft", shape: "rounded-full" },
  { tag: "Financial services", client: "Halden Mutual", ch: "Four product lines, four brands, and no clear reason to choose any of them.", m: "2.1×", ml: "qualified inbound leads", tone: "bg-terracotta-soft", shape: "rounded-none rotate-45" },
  { tag: "Climate tech", client: "Verdant Grid", ch: "A brilliant technology that investors and customers struggled to understand.", m: "9 wks", ml: "from brief to launch", tone: "bg-sand", shape: "rounded-[60%_40%_55%_45%]" },
];

function Index() {
  useReveal();
  const year = new Date().getFullYear();
  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-sm bg-ink px-4 py-3 text-ink-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {/* Hero */}
        <section id="top" aria-labelledby="hero-title" className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow"><span className="mr-2 inline-block size-2 rounded-full bg-sage align-middle" />Strategy &amp; digital innovation</p>
            <h1 id="hero-title" className="mt-6 text-5xl leading-[0.98] sm:text-7xl lg:text-[5.5rem]">Clarity for what comes <em className="text-primary">next.</em></h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl">We help ambitious organizations turn complexity into focused strategy — and the strategy into digital experiences people find genuinely useful.</p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 font-medium text-primary-foreground transition-colors hover:bg-ink">Book a discovery call</a>
              <a href="#work" className="inline-flex min-h-11 items-center font-medium link-underline">Explore our work <span aria-hidden="true" className="ml-2">→</span></a>
            </div>
          </div>
          <div className="lg:col-span-5"><HeroVisual /></div>
        </section>

        {/* Trust */}
        <section aria-labelledby="trust-title" className="border-y border-border">
          <div className="container-page flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-12">
            <h2 id="trust-title" className="eyebrow shrink-0 !font-sans !tracking-[0.16em]">Trusted by teams at</h2>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 text-foreground/70">
              <li className="font-display text-2xl italic">Luma</li>
              <li className="text-lg font-semibold uppercase tracking-[0.3em]">Fieldwork</li>
              <li className="font-display text-2xl">North<span className="text-primary">line</span></li>
              <li className="text-xl font-medium lowercase tracking-tight">arcwell°</li>
              <li className="font-display text-2xl tracking-[0.08em]">MORROW</li>
            </ul>
          </div>
          <p className="container-page pb-4 text-xs text-muted-foreground">Fictional organizations, shown for illustration.</p>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="container-page py-20 sm:py-28">
          <SectionHead id="about-title" eyebrow="About" title="Small team. Senior attention." />
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
            <figure className="reveal lg:col-span-7">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={teamImg.url} width={1200} height={900} loading="lazy" decoding="async" sizes="(min-width: 1024px) 680px, 100vw"
                  alt="The Aster & Co. team gathered around a worktable in a sunlit studio, reviewing notes and sketches together."
                  className="size-full object-cover object-center" />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">Our studio, mid-workshop.</figcaption>
            </figure>
            <div className="reveal lg:col-span-5">
              <p className="font-display text-2xl leading-snug">Most consultancies sell you partners and staff you with juniors. We stayed small on purpose.</p>
              <p className="mt-6 text-muted-foreground">Every engagement is led by the people you meet in the first call — strategists, designers and technologists who have built products and brands from the inside. We work in tight, cross-disciplinary pods, so insight turns into decisions and decisions into shipped work without getting lost in a handoff.</p>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[["14", "senior practitioners"], ["120+", "engagements since 2014"], ["87%", "clients who return"]].map(([v, l]) => (
                  <div key={l}><dt className="sr-only">{l}</dt><dd className="font-display text-4xl text-primary sm:text-5xl">{v}</dd><dd className="mt-2 text-sm text-muted-foreground">{l}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" aria-labelledby="services-title" className="bg-card py-20 sm:py-28">
          <div className="container-page">
            <SectionHead id="services-title" eyebrow="Services" title="Three ways we help — usually in combination." intro="Start with the question that keeps you up at night. We'll bring the disciplines it needs." />
            <ul className="mt-14 grid gap-px bg-border md:grid-cols-3">
              {SERVICES.map((s) => (
                <li key={s.t} className="reveal flex flex-col bg-card p-6 sm:p-8 md:first:pl-0">
                  <span className="font-mono text-sm text-primary">{s.n}</span>
                  <h3 className="mt-6 text-3xl">{s.t}</h3>
                  <p className="mt-4 text-muted-foreground">{s.d}</p>
                  <ul className="mt-8 space-y-2.5 border-t border-border pt-6 text-sm">
                    {s.items.map((i) => <li key={i} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-sage" />{i}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" aria-labelledby="approach-title" className="container-page py-20 sm:py-28">
          <SectionHead id="approach-title" eyebrow="Approach" title="A simple process, rigorously kept." />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <li key={s.t} className="reveal relative">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-foreground font-display text-xl">{i + 1}</span>
                  {i < 2 && <span aria-hidden="true" className="hidden h-px flex-1 bg-border md:block" />}
                </div>
                <h3 className="mt-6 text-2xl">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Work */}
        <section id="work" aria-labelledby="work-title" className="bg-muted py-20 sm:py-28">
          <div className="container-page">
            <SectionHead id="work-title" eyebrow="Selected work" title="Problems worth solving, outcomes worth measuring." intro="Illustrative case studies. Client names and metrics are fictional examples of the work we do." />
            <ul className="mt-14 grid gap-6 lg:grid-cols-3">
              {WORK.map((w, i) => (
                <li key={w.client} className="reveal">
                  <article aria-labelledby={`case-${i}`} className="flex h-full flex-col border border-foreground/80 bg-card">
                    <div className={`relative h-40 overflow-hidden ${w.tone}`} aria-hidden="true">
                      <span className={`absolute -right-6 -top-6 size-32 border border-foreground/40 ${w.shape}`} />
                      <span className="absolute bottom-4 left-5 font-display text-6xl leading-none">{w.m}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="eyebrow">{w.tag}</p>
                      <h3 id={`case-${i}`} className="mt-3 text-2xl">{w.client}</h3>
                      <p className="mt-3 flex-1 text-muted-foreground"><span className="font-medium text-foreground">Challenge: </span>{w.ch}</p>
                      <p className="mt-6 border-t border-border pt-4 text-sm"><span className="font-display text-xl text-primary">{w.m}</span> {w.ml} <span className="text-muted-foreground">(illustrative)</span></p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Testimonial */}
        <section aria-labelledby="quote-title" className="container-page py-20 sm:py-28">
          <h2 id="quote-title" className="sr-only">What clients say</h2>
          <figure className="reveal mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Sample testimonial</span>
            <blockquote className="mt-8 font-display text-3xl leading-snug sm:text-4xl">
              <p>“They asked the question we'd been avoiding for two years, then helped us answer it in six weeks. The roadmap is still on our wall.”</p>
            </blockquote>
            <figcaption className="mt-8 text-sm"><span className="font-semibold">Priya Anand</span><span className="text-muted-foreground"> — COO, Fieldwork (fictional)</span></figcaption>
          </figure>
        </section>

        {/* Conversion band */}
        <section aria-labelledby="band-title" className="bg-ink text-ink-foreground">
          <div className="container-page flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="band-title" className="text-4xl sm:text-5xl">Have a complex challenge?</h2>
              <p className="mt-3 max-w-lg opacity-80">Thirty minutes, no pitch deck. You'll leave with at least one useful idea.</p>
            </div>
            <a href="#contact" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-terracotta-soft px-7 font-medium text-foreground transition-colors hover:bg-ink-foreground">Book a discovery call</a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="container-page py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-primary">Contact</p>
              <h2 id="contact-title" className="mt-4 text-4xl sm:text-5xl">Let's talk about what's next.</h2>
              <p className="mt-5 text-muted-foreground">Tell us a little about your project. A partner — not a sales team — will reply within two working days.</p>
              <p className="mt-8 text-sm text-muted-foreground">Prefer email?</p>
              <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center break-all font-display text-xl link-underline">{EMAIL}</a>
            </div>
            <div className="lg:col-span-7 lg:col-start-6"><ContactForm /></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="container-page grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Brand />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">Strategy and digital innovation for organizations ready for what comes next.</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="eyebrow !font-sans">Explore</h2>
            <ul className="mt-3">
              {[...NAV, { href: "#contact", label: "Contact" }].map((n) => <li key={n.href}><a href={n.href} className="inline-flex min-h-11 items-center text-sm hover:text-primary">{n.label}</a></li>)}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <h2 className="eyebrow !font-sans">Studio</h2>
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
              42 Linden Yard, Unit 3<br />Bristol BS1 4XX (fictional)<br />
              <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center text-foreground link-underline">{EMAIL}</a>
            </address>
            <ul className="mt-2 flex gap-2" aria-label="Social media">
              {[["in", "Aster & Co. on LinkedIn (placeholder)"], ["ig", "Aster & Co. on Instagram (placeholder)"], ["dr", "Aster & Co. on Dribbble (placeholder)"]].map(([s, l]) => (
                <li key={s}><a href="#top" aria-label={l} className="grid size-11 place-items-center rounded-full border border-border text-xs font-semibold uppercase hover:border-primary hover:text-primary">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-page flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} Aster &amp; Co. A fictional company for demonstration.</p>
          <a href="#top" className="inline-flex min-h-11 items-center hover:text-foreground">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
