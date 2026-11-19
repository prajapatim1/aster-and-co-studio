export type ContactValues = { name: string; email: string; company: string; interest: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const INTERESTS = ["Strategy & Positioning", "Digital Products", "Brand Systems", "Not sure yet"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  if (!name) e.name = "Please tell us your name.";
  else if (name.length > 100) e.name = "Please keep your name under 100 characters.";
  const email = v.email.trim();
  if (!email) e.email = "We need a work email to reply.";
  else if (!EMAIL_RE.test(email) || email.length > 255) e.email = "That email doesn't look quite right — try name@company.com.";
  if (v.company.trim().length > 120) e.company = "Please keep the company name under 120 characters.";
  if (!(INTERESTS as readonly string[]).includes(v.interest)) e.interest = "Choose the area closest to your project.";
  const msg = v.message.trim();
  if (msg.length < 20) e.message = "A sentence or two (20+ characters) helps us prepare.";
  else if (msg.length > 2000) e.message = "Please keep the message under 2,000 characters.";
  return e;
}
