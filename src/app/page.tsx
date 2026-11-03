import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { MissionVision } from "@/components/sections/mission-vision";
import { About } from "@/components/sections/about";
import { AboutCategory } from "@/components/sections/about-category";
import { Projects } from "@/components/sections/projects";
import { VideoWork } from "@/components/sections/video-work";
import { ProjectsCategory } from "@/components/sections/projects-category";
import { Skills } from "@/components/sections/skills";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { CreativeDivider } from "@/components/ui/creative-divider";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Navigation /><main id="main-content"><Hero /><MissionVision /><CreativeDivider /><AboutCategory about={<About />} journey={<Journey />} /><ProjectsCategory web={<Projects platform="web" />} mobile={<Projects platform="mobile" />} video={<VideoWork />} /><Skills /><Contact /></main><Footer /></>;
}

