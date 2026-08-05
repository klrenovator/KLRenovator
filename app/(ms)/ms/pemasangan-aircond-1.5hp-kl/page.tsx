import { InstallationLandingPage } from "@/components/installation-landing-page";
import { getInstallationMetadata } from "@/config/installation-page-content";

export const metadata = getInstallationMetadata("1.5hp", "ms");

export default function Page() {
  return <InstallationLandingPage pageKey="1.5hp" locale="ms" />;
}
