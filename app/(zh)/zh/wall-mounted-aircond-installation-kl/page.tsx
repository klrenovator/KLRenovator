import { InstallationLandingPage } from "@/components/installation-landing-page";
import { getInstallationMetadata } from "@/config/installation-page-content";

export const metadata = getInstallationMetadata("wall-mounted", "zh");

export default function Page() {
  return <InstallationLandingPage pageKey="wall-mounted" locale="zh" />;
}
