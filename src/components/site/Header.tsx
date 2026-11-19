import { useEffect, useRef, useState } from "react";

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#work", label: "Work" },
];

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-grid size-9 shrink-0 place-items-center whitespace-nowrap rounded-full bg-ink font-display text-[0.95rem] leading-none tracking-tighter text-ink-foreground ${className}`}>
      A<span className="text-terracotta-soft">&</span>
    </span>
  );
}

export function Brand() {
  return (
    <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label="Aster & Co. — back to top">
      <Mark />
      <span className="font-display text-xl tracking-tight">Aster <span className="italic text-primary">&amp;</span> Co.</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === "Tab" && panelRef.current) {
        const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1]?.focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0]?.focus(); }
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Brand />
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground transition-colors hover:bg-primary sm:inline-flex">Start a conversation</a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className={`absolute left-0 h-px w-5 bg-foreground transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-5 bg-foreground transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" ref={panelRef} className="border-t border-border bg-background md:hidden" style={{ height: "calc(100dvh - 4.5rem)" }}>
          <nav aria-label="Mobile" className="container-page py-6">
            <ul className="divide-y divide-border border-y border-border">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center font-display text-2xl">{n.label}</a></li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-medium text-ink-foreground">Start a conversation</a>
          </nav>
        </div>
      )}
    </header>
  );
}
