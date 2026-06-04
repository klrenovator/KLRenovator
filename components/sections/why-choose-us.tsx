"use client";

import {
  FaShieldHalved,
  FaUserCheck,
  FaToolbox,
  FaRegClock,
  FaMoneyBillWave,
  FaAward,
} from "react-icons/fa6";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { useLang } from "@/context/language-context";

export const WhyChooseUs = () => {
  const { t } = useLang();

  const FEATURES = [
    {
      icon: FaShieldHalved,
      title: t("why_1_title"),
      desc: t("why_1_desc"),
    },
    {
      icon: FaUserCheck,
      title: t("why_2_title"),
      desc: t("why_2_desc"),
    },
    {
      icon: FaToolbox,
      title: t("why_3_title"),
      desc: t("why_3_desc"),
    },
    {
      icon: FaRegClock,
      title: t("why_4_title"),
      desc: t("why_4_desc"),
    },
    {
      icon: FaMoneyBillWave,
      title: t("why_5_title"),
      desc: t("why_5_desc"),
    },
    {
      icon: FaAward,
      title: t("why_6_title"),
      desc: t("why_6_desc"),
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className={eyebrow()}>{t("why_eyebrow")}</p>
            <h2 className="mt-3">
              <span className={title({ size: "md" })}>{t("why_title1")}</span>
              <span className={title({ size: "md", color: "brand" })}>
                {t("why_title2")}
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 border border-slate-200 overflow-hidden">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="bg-white p-6 sm:p-8 h-full hover:bg-slate-50/50 transition-all duration-200 flex flex-col justify-start">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-slate-950 text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-base font-black uppercase tracking-tight text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
