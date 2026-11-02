"use client";

import Link from "next/link";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="status-page container"><p className="section-kicker mono">A SMALL INTERRUPTION</p><h1>Let’s take that<br />one more time.</h1><p>Something couldn’t be loaded. Please try again.</p><div className="hero-ctas"><button className="button button-primary" onClick={reset}>Try again</button><Link href="/" className="button button-secondary">Back home</Link></div></main>;
}
