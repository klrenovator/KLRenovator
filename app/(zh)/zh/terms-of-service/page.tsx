import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// 服务条款 — /terms-of-service 的中文版（Part 4）。

const LAST_UPDATED = "2026年8月22日";

export const metadata: Metadata = {
  title: "服务条款 | KL Renovator",
  description:
    padMetaDescription("KL Renovator（Multicore Dynamics Resources）服务条款：报价与价格、付款方式、1个月工艺保修、取消与改期及现场进场规定，适用于吉隆坡及雪兰莪冷气服务。"),
  openGraph: {
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp",
      width: 1200,
      height: 630,
      alt: "KL Renovator 服务条款",
    }],
  },
  alternates: buildTrilingualHreflang("/terms-of-service", "zh"),
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-100 py-7 last:border-0">
      <BreadcrumbSchema items={[
        { name: "首页", url: "https://www.klrenovator.com/" },
        { name: "服务条款", url: "https://www.klrenovator.com/zh/terms-of-service" },
      ]} />
      <h2 className="mb-3 text-lg font-black text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function TermsOfServicePageZH() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">法律条款</p>
      <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
        服务条款
      </h1>
      <p className="mt-3 text-sm text-slate-500">最后更新：{LAST_UPDATED}</p>

      <div className="mt-8 max-w-xl">
        <PrimaryJobPhoto
          seed="https://www.klrenovator.com/zh/terms-of-service"
          pageUrl="https://www.klrenovator.com/zh/terms-of-service"
          title="KL Renovator 服务条款"
          locale="zh"
          hints={["installation"]}
          sizes="(min-width: 1024px) 576px, (min-width: 640px) 80vw, 100vw"
        />
      </div>
      <div className="mt-8">
        <Section title="1. 我们是谁">
          <p>
            本条款适用于<strong>{siteConfig.legalName}</strong>（以{" "}
            <strong>{siteConfig.name}</strong> 名义经营，SSM 注册号 {siteConfig.ssmFull}
            ）在马来西亚吉隆坡及雪兰莪提供的冷气安装、保养、维修及相关服务。确认预约即表示您接受本条款。
          </p>
        </Section>

        <Section title="2. 报价与价格">
          <p>
            本网站公布的价格（例如基本保养 RM 99 起、压力化学清洗 RM 120 起、挂壁式安装 RM 199
            起）均为起步价。最终价格取决于机型、HP 匹数、管道走向及现场条件。任何价格都会在开工前通过
            WhatsApp 或现场与您确认，未经确认的价格不会开工。
          </p>
          <p>
            如需额外材料（例如超出包含的7英尺铜管，按 HP 每英尺 RM 17–27
            计），额外费用会在现场测量、报价并经您批准后才开始施工。
          </p>
        </Section>

        <Section title="3. 预约">
          <p>
            通过本网站提交的预订为预约申请，只有当我们回复确认日期与时间后预订才成立。当天上门视技师排线情况而定，不作保证；如需改期我们会尽早通知您。
          </p>
        </Section>

        <Section title="4. 付款">
          <p>
            我们接受现金、银行转账、DuitNow 及电子钱包。大工程如事先协商亦可安排信用卡付款。除非大型项目另有约定，标准服务均为完工并经您确认机组运行正常后付款——无需预付。
          </p>
        </Section>

        <Section title="5. 工艺保修">
          <p>
            我们完成的服务、维修及安装工程均享有<strong>1个月工艺保修</strong>
            （自完工日起）。保修期内如出现属保修范围的问题，请 WhatsApp {siteConfig.phoneDisplay}
            ，我们会返工处理。保修仅覆盖施工工艺，不包括制造商缺陷、与我们的施工无关的零件损坏、交付后的外力损坏，或他人施工造成的故障。
          </p>
        </Section>

        <Section title="6. 取消与改期">
          <p>
            您可在预约时间前尽早通过 WhatsApp 免费取消或改期。如技师已抵达现场而工作被当场取消，可能收取交通费。多次失约的客户，后续预订或需提前确认。
          </p>
        </Section>

        <Section title="7. 进场、安全与大厦规定">
          <p>
            您须为待服务机组提供安全、合法的进场条件，包括高层作业所需的管理处批准、押金或货梯预约。我们的技师遵守各大厦的保安与进场程序。因大厦批准缺失、区域上锁、进场环境危险或电源不合规导致的延误，我们不承担责任。
          </p>
        </Section>

        <Section title="8. 旧机与既有状况">
          <p>
            在吉隆坡与雪兰莪，我们服务的许多机组机龄已达10年以上。若保养或拆机可能暴露既有隐患（例如老化电容、脆化管道或锈蚀排水盘），我们会先说明风险并报价，再进行额外工作。对非我们施工造成的既有缺陷，我们不承担责任。
          </p>
        </Section>

        <Section title="9. 责任限制">
          <p>
            因服务引起的任何索赔，我们的责任以该工程已收取的金额为限。本条款不排除马来西亚法律不容排除的责任。
          </p>
        </Section>

        <Section title="10. 适用法律">
          <p>本条款受马来西亚法律管辖，相关争议提交马来西亚法院管辖。</p>
        </Section>

        <Section title="11. 联系我们">
          <p>
            有关本条款的问题：WhatsApp {siteConfig.phoneDisplay} 或电子邮件{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-sky-700 underline">
              {siteConfig.email}
            </a>
            。另请参阅我们的{" "}
            <NextLink href="/zh/privacy-policy" className="font-semibold text-sky-700 underline">
              隐私政策
            </NextLink>
            。
          </p>
        </Section>
      </div>
    </div>
  );
}
