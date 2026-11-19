import { useId, useRef, useState, type FormEvent } from "react";
import { INTERESTS, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact-validation";

const EMPTY: ContactValues = { name: "", email: "", company: "", interest: "", message: "" };
const field = "mt-2 block w-full min-h-12 rounded-sm border bg-card px-3.5 py-2.5 text-base text-foreground transition-colors focus:border-ring focus:outline-2 focus:outline-offset-0 focus:outline-ring";

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const set = (k: keyof ContactValues) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched) setErrors(validateContact(next));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validateContact(values);
    setErrors(errs);
    const firstBad = Object.keys(errs)[0];
    if (firstBad) { formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(firstBad))}`)?.focus(); return; }
    setSent(values.name.trim().split(" ")[0] ?? values.name.trim());
    setValues(EMPTY); setTouched(false);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border-l-2 border-sage bg-sage-soft/50 p-8">
        <p className="eyebrow">Message received (demo)</p>
        <h3 className="mt-3 text-3xl">Thank you, {sent}.</h3>
        <p className="mt-3 max-w-md text-muted-foreground">This is a demonstration site, so nothing was sent. On a live site, a partner would reply within two working days with a few times for a 30-minute call.</p>
        <button type="button" onClick={() => setSent(null)} className="mt-6 min-h-11 font-medium link-underline">Send another message</button>
      </div>
    );
  }

  const err = (k: keyof ContactValues) => errors[k] && (
    <p id={id(k) + "-err"} className="mt-1.5 text-sm text-destructive">{errors[k]}</p>
  );
  const aria = (k: keyof ContactValues) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? id(k) + "-err" : undefined });
  const cls = (k: keyof ContactValues) => `${field} ${errors[k] ? "border-destructive" : "border-input"}`;
  const count = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Discovery call request">
      <div aria-live="polite" className="sr-only">{touched && count > 0 ? `${count} field${count > 1 ? "s need" : " needs"} attention.` : ""}</div>
      <div>
        <label htmlFor={id("name")} className="text-sm font-medium">Name <span aria-hidden="true" className="text-primary">*</span></label>
        <input id={id("name")} name="name" autoComplete="name" required value={values.name} onChange={set("name")} className={cls("name")} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={id("email")} className="text-sm font-medium">Work email <span aria-hidden="true" className="text-primary">*</span></label>
        <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={set("email")} className={cls("email")} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor={id("company")} className="text-sm font-medium">Company <span className="font-normal text-muted-foreground">(optional)</span></label>
        <input id={id("company")} name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={cls("company")} {...aria("company")} />
        {err("company")}
      </div>
      <div>
        <label htmlFor={id("interest")} className="text-sm font-medium">Project interest <span aria-hidden="true" className="text-primary">*</span></label>
        <select id={id("interest")} name="interest" required value={values.interest} onChange={set("interest")} className={cls("interest")} {...aria("interest")}>
          <option value="">Select an area…</option>
          {INTERESTS.map((i) => <option key={i}>{i}</option>)}
        </select>
        {err("interest")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("message")} className="text-sm font-medium">What are you working on? <span aria-hidden="true" className="text-primary">*</span></label>
        <textarea id={id("message")} name="message" rows={5} required value={values.message} onChange={set("message")} className={`${cls("message")} resize-y`} {...aria("message")} />
        {err("message")}
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-muted-foreground">We only use your details to reply. No newsletters, no sharing. <span className="block">* Required</span></p>
        <button type="submit" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-primary px-7 font-medium text-primary-foreground transition-colors hover:bg-ink">Request a discovery call</button>
      </div>
    </form>
  );
}
