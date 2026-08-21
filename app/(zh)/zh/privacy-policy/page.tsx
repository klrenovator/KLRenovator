import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";

const LAST_UPDATED = "2026年8月6日";

export const metadata: Metadata = {
  title: "隐私政策 | KL Renovator",
  description:
    padMetaDescription("KL Renovator (Multicore Dynamics Resources) 如何根据马来西亚《2010年个人数据保护法》(PDPA) 收集、使用、存储和保护您的个人数据。"),
  openGraph: {
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp",
      width: 1200,
      height: 630,
      alt: "KL Renovator 隐私政策",
    }],
  },
  alternates: buildTrilingualHreflang("/privacy-policy", "zh"),
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-100 py-7 last:border-0">
      <h2 className="mb-3 text-lg font-black text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPageZH() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">法律声明</p>
      <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
        隐私政策
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        最后更新：{LAST_UPDATED} · 依据马来西亚《2010年个人数据保护法》(PDPA) 发布
      </p>

      <div className="mt-8 max-w-xl">
        <PrimaryJobPhoto
          seed="https://www.klrenovator.com/zh/privacy-policy"
          pageUrl="https://www.klrenovator.com/zh/privacy-policy"
          title="KL Renovator 隐私政策"
          locale="zh"
          hints={["basic-servicing"]}
          sizes="(min-width: 1024px) 576px, (min-width: 640px) 80vw, 100vw"
        />
      </div>
      <div className="mt-8">
        <Section title="1. 我们是谁">
          <p>
            本网站由 <strong>{siteConfig.legalName}</strong>（经营名称为 <strong>{siteConfig.name}</strong>，SSM 注册号：{siteConfig.ssmFull}）运营。我们是一家在马来西亚吉隆坡与雪兰莪州提供冷气安装与维修保养服务的专业机构。在政策中，“我们”均指代该公司。
          </p>
        </Section>

        <Section title="2. 我们收集哪些个人数据">
          <p>我们仅收集向您报价及完成冷气服务所需的信息：</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>预约与咨询详情</strong> — 您的姓名、电话号码、服务地址、所需服务、冷气类型/匹数/数量，以及您首选的预约日期和时间。
            </li>
            <li>
              <strong>安装详情</strong> — 房产类型、楼层、铜管大概长度以及是否自带机器。这用于评估报价及是否需要公寓管理处 (JMB/MC) 进场许可。
            </li>
            <li>
              <strong>沟通记录</strong> — 您通过 WhatsApp、电话或邮件与我们联系时提供的内容。
            </li>
            <li>
              <strong>技术与使用数据</strong> — 通过 Google Analytics 4 与 Microsoft Clarity 收集的匿名 IP、浏览器类型、访问页面及引荐来源。
            </li>
          </ul>
          <p>
            我们不在本网站收集任何支付卡信息，亦不会主动收集未成年人信息。
          </p>
        </Section>

        <Section title="3. 我们为什么使用这些数据">
          <ul className="ml-5 list-disc space-y-1.5">
            <li>在施工前准备报价并确认价格。</li>
            <li>安排技术人员上门并就预约事宜与您沟通。</li>
            <li>为您所进行的服务提供施工质保支持。</li>
            <li>履行马来西亚会计、税务及相关法律记录保存要求。</li>
            <li>了解用户关注的服务内容以持续改进网站体验。</li>
          </ul>
          <p>
            我们绝不出售您的个人数据，亦不与第三方共享用于营销目的。
          </p>
        </Section>

        <Section title="4. 数据的共享与披露">
          <p>
            我们仅与协助我们运营业务的必要技术服务商共享数据：
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>Supabase</strong> — 安全加密的预约数据存储数据库。
            </li>
            <li>
              <strong>Google (日历与分析)</strong> — 技师日程排班及网站访问统计。
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — 网站使用体验分析。
            </li>
            <li>
              <strong>Vercel</strong> — 网站云托管服务。
            </li>
            <li>
              <strong>我们的技术人员</strong> — 履行上门服务所需的姓名、联系电话与地址。
            </li>
          </ul>
        </Section>

        <Section title="5. 数据保存期限">
          <p>
            预约记录将根据马来西亚税务与会计法规要求保存至多七年，以用于保修凭据核验。未转化为实际预约的日常咨询记录将在不需要时安全删除。
          </p>
        </Section>

        <Section title="6. 数据安全保护">
          <p>
            数据通过 HTTPS 加密传输，存储在具备严格访问控制的数据库中，后台管理系统经过服务器端鉴权保护。我们采取合理且严格的技术与管理措施保障您的个人隐私安全。
          </p>
        </Section>

        <Section title="7. 您在 PDPA 下的权利">
          <p>您拥有以下法定权利：</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>申请查阅我们所持有的关于您的个人数据。</li>
            <li>申请更正不准确、不完整或已过期的个人数据。</li>
            <li>撤回同意或限制我们使用您的数据。</li>
            <li>在无特定法律留存要求的情况下申请删除数据。</li>
          </ul>
        </Section>

        <Section title="8. Cookie 与分析技术">
          <p>
            我们使用 Google Analytics 与 Microsoft Clarity 收集匿名互动数据以优化网站体验。您可在浏览器设置中随时禁用 Cookie，网站主要功能仍可正常使用。
          </p>
        </Section>

        <Section title="9. 联系我们">
          <p>
            如对本政策或您的个人数据有任何疑问，请联系 <strong>{siteConfig.legalName}</strong>：
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              电子邮件：{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-sky-600 underline"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              电话 / WhatsApp：{" "}
              <a href={`tel:${siteConfig.phone}`} className="font-semibold text-sky-600 underline">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>地址：{siteConfig.address}</li>
          </ul>
        </Section>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-600">
          如需咨询预约服务，请访问{" "}
          <NextLink href="/zh/contact" className="font-black text-sky-600 hover:text-sky-800">
            联系我们
          </NextLink>
          。
        </p>
      </div>
    </div>
  );
}
