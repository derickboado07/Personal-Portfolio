import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Analytics } from "@/components/sections/analytics";
import { VideoWork } from "@/components/sections/video-work";
import { Skills } from "@/components/sections/skills";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { CreativeDivider } from "@/components/ui/creative-divider";

export const metadata = { alternates: { canonical: "/" }, openGraph: { url: "/" } };

export default function Home() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Navigation /><main id="main-content"><Hero /><CreativeDivider /><About /><Projects /><Analytics /><VideoWork /><Skills /><Journey /><Contact /></main><Footer /></>;
}
