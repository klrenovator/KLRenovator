import { InstallationLandingPage } from "@/components/installation-landing-page";
import { getInstallationMetadata } from "@/config/installation-page-content";

export const metadata = getInstallationMetadata("window-unit", "zh");

export default function Page() {
  return <InstallationLandingPage pageKey="window-unit" locale="zh" />;
}
