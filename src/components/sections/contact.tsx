import { profile } from "@/data/portfolio";
import { ContactForm } from "./contact-form";

export function Contact() {
  const serviceConfigured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
  return <ContactForm email={process.env.CONTACT_TO_EMAIL || profile.email} serviceConfigured={serviceConfigured} />;
}
