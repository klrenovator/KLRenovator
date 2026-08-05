import { InstallationLandingPage } from "@/components/installation-landing-page";
import { getInstallationMetadata } from "@/config/installation-page-content";

export const metadata = getInstallationMetadata("1hp", "zh");

export default function Page() {
  return <InstallationLandingPage pageKey="1hp" locale="zh" />;
}
