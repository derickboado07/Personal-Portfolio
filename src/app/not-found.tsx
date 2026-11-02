import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="status-page container"><p className="section-kicker mono">404 / FRAME NOT FOUND</p><h1>Looks like this frame<br />missed the final cut.</h1><p>The page you’re looking for isn’t in this sequence.</p><Link href="/" className="button button-primary"><ArrowLeft size={17} /> Back to the portfolio</Link></main>;
}
