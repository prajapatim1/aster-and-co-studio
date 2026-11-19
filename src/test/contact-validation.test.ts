import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/contact-validation";

const ok = { name: "Ada", email: "ada@luma.io", company: "", interest: "Digital Products", message: "We need help planning our next product." };

describe("contact form validation", () => {
  it("accepts a complete submission with optional company empty", () => {
    expect(validateContact(ok)).toEqual({});
  });
  it("requires name", () => expect(validateContact({ ...ok, name: " " }).name).toBeDefined());
  it("rejects malformed email", () => expect(validateContact({ ...ok, email: "ada@luma" }).email).toBeDefined());
  it("requires a project interest", () => expect(validateContact({ ...ok, interest: "" }).interest).toBeDefined());
  it("requires a message of at least 20 characters", () =>
    expect(validateContact({ ...ok, message: "Too short" }).message).toBeDefined());
});
