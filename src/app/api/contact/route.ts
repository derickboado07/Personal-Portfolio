import { NextResponse } from "next/server";

export const runtime = "nodejs";
const recentRequests = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return NextResponse.json({ error: "Email delivery is not configured. Please use an email draft." }, { status: 503 });
  const origin = request.headers.get("origin");
  if (origin && new URL(request.url).origin !== origin) return NextResponse.json({ error: "This request is not allowed." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Please submit the contact form." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 20_000) return NextResponse.json({ error: "This message is too long." }, { status: 413 });
  const now = Date.now();
  for (const [address, entry] of recentRequests) if (entry.reset < now) recentRequests.delete(address);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const prior = recentRequests.get(ip);
  if (prior && prior.count >= 5 && prior.reset > now) return NextResponse.json({ error: "Please wait a few minutes before sending another message." }, { status: 429 });
  if (!prior && recentRequests.size >= 1000) recentRequests.delete(recentRequests.keys().next().value!);
  recentRequests.set(ip, { count: (prior?.count || 0) + 1, reset: prior?.reset || now + 15 * 60 * 1000 });
  try {
    const raw = await request.text();
    if (raw.length > 20_000) return NextResponse.json({ error: "This message is too long." }, { status: 413 });
    const data: Record<string, unknown> = JSON.parse(raw);
    if (data.website) return NextResponse.json({ error: "Unable to submit this form." }, { status: 400 });
    const valid = (value: unknown, min: number, max: number): value is string => typeof value === "string" && value.trim().length >= min && value.trim().length <= max;
    if (!valid(data.name, 2, 150) || !valid(data.email, 3, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !valid(data.subject, 3, 150) || !valid(data.message, 10, 5000)) return NextResponse.json({ error: "Please check your name, email, subject, and message." }, { status: 400 });
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: data.email.trim(), subject: `Portfolio enquiry: ${data.subject.replace(/[\r\n]/g, " ").trim()}`, text: `From: ${data.name.trim()} <${data.email.trim()}>\n\n${data.message.trim()}` }), signal: AbortSignal.timeout(15_000) });
    if (!response.ok) return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please try the email draft instead." }, { status: 502 });
    return NextResponse.json({ accepted: true });
  } catch { return NextResponse.json({ error: "The message could not be submitted. Please try again or use an email draft." }, { status: 400 }); }
}
