"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, BriefcaseBusiness, Check, CodeXml, Copy, Download, LoaderCircle, Mail, Video } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import "./media-contact.css";

type FormValues = { name: string; email: string; subject: string; message: string };
type FieldErrors = Partial<Record<keyof FormValues, string>>;
const initialValues: FormValues = { name: "", email: "", subject: "", message: "" };

export function ContactForm({ email, serviceConfigured }: { email: string; serviceConfigured: boolean }) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "draft" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  function validate() {
    const found: FieldErrors = {};
    if (values.name.trim().length < 2) found.name = "Please enter your name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) found.email = "Please enter a valid email address.";
    if (values.subject.trim().length < 3) found.subject = "Please add a subject (at least 3 characters).";
    if (values.message.trim().length < 10) found.message = "Tell me a little more (at least 10 characters).";
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${first}"]`)?.focus();
      return false;
    }
    return true;
  }
  function messageBody() { return `Hi Derick,\n\n${values.message.trim()}\n\nFrom: ${values.name.trim()}\nReply to: ${values.email.trim()}`; }
  function openDraft() {
    const address = email ? encodeURIComponent(email).replace(/%40/g, "@") : "";
    window.location.href = `mailto:${address}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(messageBody())}`;
    setState("draft");
    setFeedback(email ? "Email draft prepared. Finish sending it in your email app. No message has been sent from this website." : "Draft prepared. Derick’s email has not been published yet, so add a confirmed recipient in your email app before sending. No message has been sent.");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    if (!serviceConfigured) { openDraft(); return; }
    setState("sending"); setFeedback("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, website: new FormData(event.currentTarget).get("website") }) });
      const result: { error?: string } = await response.json();
      if (!response.ok) throw new Error(result.error || "The message could not be submitted. Please try the email draft instead.");
      setState("sent"); setFeedback("Your message was accepted for delivery. Thank you for reaching out."); setValues(initialValues);
    } catch (error) { setState("error"); setFeedback(error instanceof Error ? error.message : "Something went wrong. Please try the email draft instead."); }
  }
  async function copyMessage() {
    if (!validate()) return;
    try { await navigator.clipboard.writeText(`Subject: ${values.subject}\n\n${messageBody()}`); setCopied(true); setFeedback("Message copied. Paste it into your preferred email or messaging app."); setTimeout(() => setCopied(false), 2500); }
    catch { setFeedback("Clipboard access is unavailable. You can copy your message directly from the form."); }
  }
  function downloadDraft() {
    if (!validate()) return;
    const subjectBytes = new TextEncoder().encode(values.subject.replace(/[\r\n]/g, " "));
    const safeSubject = `=?UTF-8?B?${btoa(String.fromCharCode(...subjectBytes))}?=`;
    const draft = `X-Unsent: 1\r\nTo: ${email}\r\nSubject: ${safeSubject}\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n${messageBody().replace(/\n/g, "\r\n")}`;
    const url = URL.createObjectURL(new Blob([draft], { type: "message/rfc822" }));
    const link = document.createElement("a"); link.href = url; link.download = "hello-derick.eml"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(email ? "Email draft downloaded. Open it in your email app to review and send." : "Email draft downloaded. Add Derick’s confirmed email address before sending.");
  }
  function field(name: keyof FormValues, label: string, placeholder: string, type = "text") {
    return <div className={`contact-field ${name === "message" ? "contact-field-full" : ""}`}><label htmlFor={`${id}-${name}`}>{label} <span aria-hidden="true">*</span></label>{name === "message" ? <textarea id={`${id}-${name}`} name={name} rows={5} maxLength={5000} required value={values[name]} placeholder={placeholder} onChange={(event) => setValues({ ...values, [name]: event.target.value })} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined} /> : <input id={`${id}-${name}`} name={name} type={type} maxLength={name === "email" ? 254 : 150} required autoComplete={name === "name" ? "name" : name === "email" ? "email" : undefined} value={values[name]} placeholder={placeholder} onChange={(event) => setValues({ ...values, [name]: event.target.value })} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined} />}{errors[name] && <span id={`${id}-${name}-error`} className="contact-field-error">{errors[name]}</span>}</div>;
  }
  const socialLinks = [{ label: "GitHub", href: profile.links.github, Icon: CodeXml }, { label: "LinkedIn", href: profile.links.linkedin, Icon: BriefcaseBusiness }, { label: "Video portfolio", href: profile.links.videoPortfolio, Icon: Video }].filter((link) => link.href);

  return <section id="contact" tabIndex={-1} className="section contact-section" aria-labelledby="contact-heading"><div className="container contact-layout"><Reveal className="contact-intro"><p className="section-kicker">06 / THE NEXT CHAPTER</p><h2 id="contact-heading" className="section-heading"><TextReveal>Let’s build<br />what’s next.</TextReveal></h2><p className="contact-statement">Let’s create something <span className="gradient-text">remarkable.</span></p><p className="section-description">{profile.opportunitySummary}</p><div className="contact-location"><span className="contact-orbit" aria-hidden="true" /><span>{profile.location.toUpperCase()}<br /><small>GOOD IDEAS CAN COME FROM ANYWHERE.</small></span></div>{email && <a className="contact-email" href={`mailto:${email}`}><Mail size={17} />{email}<ArrowUpRight size={16} /></a>}{socialLinks.length > 0 && <div className="contact-socials" aria-label="Social profiles">{socialLinks.map(({ label, href, Icon }) => <a href={href} key={label} target="_blank" rel="noopener noreferrer"><Icon size={16} />{label}<ArrowUpRight size={13} /></a>)}</div>}</Reveal><Reveal delay={0.12} className="contact-form-wrap"><div className="contact-form-heading"><span>LET’S START A CONVERSATION</span><Mail size={18} /></div><form ref={form} onSubmit={submit} noValidate className="contact-form" aria-describedby={`${id}-delivery-note`}><div className="contact-fields">{field("name", "Your name", "What should I call you?")}{field("email", "Email address", "you@example.com", "email")}<div className="contact-subject">{field("subject", "Opportunity or project?", "An internship, a website, a dashboard…")}</div>{field("message", "Your message", "Tell me about the opportunity or idea you have in mind…")}</div><div className="contact-honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this empty</label><input type="text" id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div><p id={`${id}-delivery-note`} className="contact-delivery-note">{serviceConfigured ? "Your message will be sent securely by email. All fields are required." : email ? "This opens a draft in your email app. Review it there and press send." : "Email details are coming soon. You can prepare, copy, or download a draft; add a confirmed recipient before sending."}</p><button className="contact-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? <><LoaderCircle className="contact-spinner" size={18} />Sending message…</> : state === "sent" ? <><Check size={18} />Message submitted</> : <>{serviceConfigured ? "Send Message" : "Prepare Email Draft"}<ArrowUpRight size={19} /></>}</button><div className="contact-alternatives"><button type="button" onClick={copyMessage}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy message"}</button><button type="button" onClick={downloadDraft}><Download size={14} />Download draft</button>{state === "error" && <button type="button" onClick={() => { if (validate()) openDraft(); }}><Mail size={14} />Use email app</button>}</div><p className={`contact-feedback ${state === "error" ? "is-error" : ""}`} role={state === "error" ? "alert" : "status"} aria-live="polite">{feedback}</p></form></Reveal></div></section>;
}
