import { InstallationLandingPage } from "@/components/installation-landing-page";
import { getInstallationMetadata } from "@/config/installation-page-content";

export const metadata = getInstallationMetadata("ceiling-cassette", "zh");

export default function Page() {
  return <InstallationLandingPage pageKey="ceiling-cassette" locale="zh" />;
}
