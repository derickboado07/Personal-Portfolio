import { NavigationClient } from "@/components/navigation-client";
import { BrandLogo } from "@/components/ui/brand-logo";

export function Navigation() {
  return <NavigationClient logo={<BrandLogo variant="navigation" />} />;
}
