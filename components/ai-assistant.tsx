// ─────────────────────────────────────────────────────────────────────────
// AI Aircond Expert Assistant — chat UI.
// The engine (lib/aircond-assistant.ts) is deterministic and knowledge-
// based; this component only renders messages and cards. Fully responsive:
// on mobile the chat panel becomes a full-height column.
// ─────────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaPaperPlane, FaRobot, FaSpinner } from "react-icons/fa6";
import { FiRotateCcw } from "react-icons/fi";
import NextLink from "next/link";
import { waLink } from "@/lib/whatsapp";
import { trackToolUse } from "@/lib/analytics";
import {
  answer,
  welcomeMessage,
  type AssistantCard,
  type AssistantContext,
  type AssistantMessage,
} from "@/lib/aircond-assistant";

function PricingCard({ card }: { card: Extract<AssistantCard, { type: "pricing" }> }) {
  return (
    <div className="mt-3 rounded-xl border border-sky-100 bg-sky-50/60 overflow-hidden">
      <p className="px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-sky-700 bg-sky-100/70">{card.title}</p>
      <table className="w-full text-sm">
        <tbody>
          {card.rows.map((row, i) => (
            <tr key={i} className="border-t border-sky-100/80">
              <td className="px-4 py-2 text-slate-700 font-medium">{row.label}</td>
              <td className="px-4 py-2 text-right font-black text-slate-900 whitespace-nowrap">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {card.note && <p className="px-4 py-2.5 text-[11px] text-slate-500 italic border-t border-sky-100/80">{card.note}</p>}
    </div>
  );
}

function QuoteCard({ card }: { card: Extract<AssistantCard, { type: "quote" }> }) {
  return (
    <div className="mt-3 rounded-xl border border-sky-100 bg-white shadow-sm overflow-hidden">
      <p className="px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-sky-700 bg-sky-50">{card.title}</p>
      <ul className="px-4 py-3 space-y-2">
        {card.lines.map((line, i) => (
          <li key={i} className="flex items-start justify-between gap-3 text-sm">
            <span className="text-slate-700 font-medium">
              {line.label}
              <span className="block text-[11px] text-slate-400">{line.detail}</span>
            </span>
            <span className="font-black text-slate-900 whitespace-nowrap">RM {line.amount}</span>
          </li>
        ))}
        {card.discount && (
          <li className="flex items-start justify-between gap-3 text-sm border-t border-slate-100 pt-2">
            <span className="text-emerald-700 font-bold">{card.discount}</span>
          </li>
        )}
      </ul>
      <div className="flex items-center justify-between px-4 py-2.5 bg-sky-600 text-white">
        <span className="text-[11px] font-black uppercase tracking-widest">Estimated Total</span>
        <span className="font-black">RM {card.total}</span>
      </div>
      <p className="px-4 py-2.5 text-[11px] text-slate-500 italic">{card.note}</p>
    </div>
  );
}

function HpCard({ card }: { card: Extract<AssistantCard, { type: "hp" }> }) {
  return (
    <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
      <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700 mb-3">{card.title}</p>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white rounded-lg p-3 border border-emerald-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BTU</p>
          <p className="text-lg font-black text-slate-900">{card.btu.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-emerald-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">HP</p>
          <p className="text-lg font-black text-slate-900">{card.hp}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-emerald-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Install</p>
          <p className="text-lg font-black text-slate-900">RM {card.installFrom}</p>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-slate-500 italic">{card.note}</p>
    </div>
  );
}

function ServiceCard({ card }: { card: Extract<AssistantCard, { type: "service" }> }) {
  return (
    <div className="mt-3 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
      <p className="text-[11px] font-black uppercase tracking-widest text-violet-700 mb-1.5">{card.title}</p>
      <p className="font-black text-slate-900 text-base">{card.service}</p>
      <p className="text-xs font-bold text-violet-700 mt-0.5">{card.price}</p>
      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{card.why}</p>
      <NextLink href={card.href} className="inline-block mt-3 text-xs font-black text-violet-700 hover:text-violet-900 border border-violet-200 hover:border-violet-400 bg-white px-3 py-2 rounded-lg transition-all">
        View details →
      </NextLink>
    </div>
  );
}

function LinksCard({ card }: { card: Extract<AssistantCard, { type: "links" }> }) {
  return (
    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2.5">{card.title}</p>
      <ul className="space-y-2">
        {card.links.map((link, i) => (
          <li key={i}>
            <NextLink href={link.href} className="text-sm font-bold text-sky-700 hover:text-sky-900 hover:underline">
              → {link.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessageBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-sky-600 text-white px-4 py-3 text-sm font-medium leading-relaxed shadow-sm">
          {message.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-sky-600 text-white shadow-md mt-1" aria-hidden="true">
        <FaRobot className="h-4 w-4" />
      </span>
      <div className="max-w-[88%]">
        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-slate-700 leading-relaxed shadow-sm">
          <p>{message.text}</p>
          {message.cards?.map((card, i) => {
            switch (card.type) {
              case "pricing":
                return <PricingCard key={i} card={card} />;
              case "quote":
                return <QuoteCard key={i} card={card} />;
              case "hp":
                return <HpCard key={i} card={card} />;
              case "service":
                return <ServiceCard key={i} card={card} />;
              case "links":
                return <LinksCard key={i} card={card} />;
              default:
                return null;
            }
          })}
        </div>
        {message.suggested && message.suggested.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {message.suggested.map((s) => (
              <SuggestionChip key={s} label={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SuggestionChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      // The parent listens to this custom event; the chip itself does not
      // need to know about the chat state.
      onClick={() => window.dispatchEvent(new CustomEvent("ai-suggest", { detail: label }))}
      className="text-left text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 px-3.5 py-2 rounded-full transition-colors"
    >
      {label}
    </button>
  );
}

export function AiAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>([welcomeMessage()]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState<AssistantContext>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Refs keep the global suggestion-chip listener and the send guard on the
  // latest render's closure, so rapid chip clicks can never double-send.
  const sendRef = useRef<(t: string) => Promise<void>>(async () => {});
  const typingRef = useRef(false);

  useEffect(() => {
    const onSuggest = (e: Event) => {
      const label = (e as CustomEvent<string>).detail;
      if (label) void sendRef.current(label);
    };
    window.addEventListener("ai-suggest", onSuggest);
    return () => window.removeEventListener("ai-suggest", onSuggest);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || typingRef.current) return;
    typingRef.current = true;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = answer(text, context);
    trackToolUse("ai-assistant", { intent: reply.intent });
    // Small delay so the typing indicator is visible and the interaction feels natural.
    await new Promise((r) => setTimeout(r, 550 + Math.min(900, reply.message.text.length * 3)));
    setMessages((m) => [...m, { ...reply.message, role: "assistant" as const }]);
    setContext(reply.context);
    typingRef.current = false;
    setTyping(false);
  }
  sendRef.current = send;

  function reset() {
    setMessages([welcomeMessage()]);
    setContext({});
    trackToolUse("ai-assistant", { action: "reset" });
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col" style={{ maxHeight: "78vh" }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-700 via-violet-600 to-sky-600 px-5 py-4 text-white flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur" aria-hidden="true">
          <FaRobot className="h-5 w-5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-black leading-tight text-sm sm:text-base">Aircond Expert Assistant</p>
          <p className="text-[11px] text-violet-100 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Online · trained on KL Renovator 2026 pricing
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset conversation"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <FiRotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 bg-slate-50 space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {typing && (
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-sky-600 text-white shadow-md mt-1" aria-hidden="true">
              <FaRobot className="h-4 w-4" />
            </span>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm flex items-center gap-2">
              <FaSpinner className="h-3.5 w-3.5 text-violet-600 animate-spin" />
              <span className="text-xs font-bold text-slate-500">Thinking…</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="border-t border-slate-200 bg-white p-3.5 flex gap-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask anything… e.g. "How much is installation for 2 HP?"'
          aria-label="Ask the aircond assistant"
          className="flex-1 min-w-0 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none px-4 py-3 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          aria-label="Send message"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          <FaPaperPlane className="h-4 w-4" />
        </button>
      </form>

      {/* WhatsApp handoff */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 py-2.5 flex items-center justify-between gap-3">
        <p className="text-[11px] text-slate-500 font-medium">
          Need a confirmed booking? Talk to a real technician:
        </p>
        <a
          href={waLink("Hi KL Renovator! I was just chatting with your AI assistant and I'd like to confirm a booking. Here are my details:\n\n📍 Location:\n❄️ Service needed:\n🔢 Units / HP:\n\nPlease confirm price and availability. Thank you!")}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3.5 py-2 rounded-lg transition-colors shrink-0"
        >
          <FaWhatsapp className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
