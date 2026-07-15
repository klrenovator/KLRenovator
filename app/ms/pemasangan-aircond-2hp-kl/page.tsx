import { InstallationLandingPage } from "@/components/installation-landing-page";
import { getInstallationMetadata } from "@/config/installation-page-content";

export const metadata = getInstallationMetadata("2hp", "ms");

export default function Page() {
  return <InstallationLandingPage pageKey="2hp" locale="ms" />;
}
