"use client";

import { FormEvent, useMemo, useState } from "react";

type Plan = {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

type WaitlistState = {
  loading: boolean;
  message: string;
  error: string;
};

const steps = [
  {
    title: "Connect your accounts",
    text: "Securely link bank and card accounts so Tame can build a live picture of your financial life."
  },
  {
    title: "See what matters now",
    text: "Get one prioritized feed for bills, renewals, documents, and deadlines that need attention."
  },
  {
    title: "Take action in minutes",
    text: "Handle payments, subscriptions, and recurring admin tasks from one calm operating system."
  }
];

const features = [
  {
    title: "Unified money view",
    text: "Income, spending, subscriptions, and recurring charges in one timeline."
  },
  {
    title: "Life admin tracker",
    text: "Track paperwork, renewals, and obligations that usually fall through the cracks."
  },
  {
    title: "Smart reminders",
    text: "Timely, practical alerts without noise, guilt, or notification overload."
  },
  {
    title: "What-if planning",
    text: "Model decisions before money leaves your account so you can plan with confidence."
  },
  {
    title: "Calendar of obligations",
    text: "A single calendar for bills, benefits, home tasks, and non-financial deadlines."
  },
  {
    title: "Actionable workflows",
    text: "From due notices to completed actions, Tame helps you follow through faster."
  }
];

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    description: "For building your baseline system and reducing day-to-day chaos.",
    features: ["Core dashboard", "Up to 5 bills and 5 documents", "Basic life calendar"],
    cta: "Start Free"
  },
  {
    name: "Pro",
    monthly: 9,
    annual: 79,
    description: "For full coverage and automation across money and life admin.",
    features: [
      "Unlimited tracking across all modules",
      "Automation features and guided workflows",
      "Forgotten subscription detection"
    ],
    cta: "Join Pro",
    highlight: true
  }
];

const faqs = [
  {
    question: "Is Tame a budgeting app?",
    answer:
      "Tame includes budgeting signals, but it is broader: money, subscriptions, documents, benefits, and life deadlines in one system."
  },
  {
    question: "How secure is account connection?",
    answer:
      "Tame is designed with a security-first architecture and uses established banking connection providers. Final compliance details can be published on your security page."
  },
  {
    question: "Can I cancel the Pro plan anytime?",
    answer:
      "Yes. You can cancel anytime and keep access through the end of your active billing period."
  },
  {
    question: "Who is Tame built for?",
    answer:
      "People who feel like modern life admin became a second job and want one clear system to stay on top of it."
  }
];

function formatPrice(monthly: boolean, plan: Plan) {
  if (plan.name === "Free") return "$0";
  return monthly ? `$${plan.monthly}/mo` : `$${plan.annual}/yr`;
}

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<WaitlistState>({
    loading: false,
    message: "",
    error: ""
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ loading: true, message: "", error: "" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setState({
          loading: false,
          message: "",
          error: result.error ?? "Something went wrong. Please try again."
        });
        return;
      }

      setEmail("");
      setState({
        loading: false,
        message: result.message ?? "You're on the list.",
        error: ""
      });
    } catch {
      setState({
        loading: false,
        message: "",
        error: "Network error. Please try again."
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className={compact ? "w-full max-w-lg" : "w-full max-w-xl"}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={compact ? "email-compact" : "email-main"}>
          Email address
        </label>
        <input
          id={compact ? "email-compact" : "email-main"}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="name@company.com"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[#7f7f79] focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={state.loading}
          className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {state.loading ? "Submitting..." : "Join Waitlist"}
        </button>
      </div>
      <p className="mt-2 text-xs text-[#8e8e88]">
        No spam. Product updates only. You can unsubscribe anytime.
      </p>
      {state.message ? <p className="mt-2 text-sm text-[#55c896]">{state.message}</p> : null}
      {state.error ? <p className="mt-2 text-sm text-[#f05555]">{state.error}</p> : null}
    </form>
  );
}

export default function Home() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const yearlySavings = useMemo(() => plans[1].monthly * 12 - plans[1].annual, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(70%_70%_at_50%_0%,rgba(200,240,128,0.08),transparent_60%),var(--background)] text-[var(--text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[#0b0b0b]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#" className="block">
            <p className="display-font text-4xl leading-none tracking-tight">
              tame<span className="text-[var(--accent)]">.</span>
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Life Operating System
            </p>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-[#a8a8a2] md:flex">
            <a href="#how-it-works" className="transition hover:text-[var(--text)]">
              How It Works
            </a>
            <a href="#features" className="transition hover:text-[var(--text)]">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-[var(--text)]">
              Pricing
            </a>
            <a href="#faq" className="transition hover:text-[var(--text)]">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              Menu
            </button>
            <a
              href="#cta"
              className="hidden rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90 md:inline-block"
            >
              Join Waitlist
            </a>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-[var(--border)] bg-[#0e0e0e] px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a
                href="#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 inline-block rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold text-black"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-24 pt-16 md:grid-cols-[1.2fr_1fr] md:px-10 md:pt-24">
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Calm control for modern life
            </p>
            <h1 className="display-font max-w-3xl text-5xl leading-[0.95] tracking-tight md:text-8xl">
              Money and life admin, finally in one place.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#b2b2ad]">
              Tame helps you stay ahead of expenses, subscriptions, documents,
              benefits, and deadlines without the overwhelm. No shame. No noise.
              Just practical clarity and follow-through.
            </p>

            <div className="mt-9">
              <WaitlistForm />
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-5">
            <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4">
              <p className="text-sm font-medium text-[#d8d8d3]">Live overview</p>
              <span className="rounded-full border border-[#1e4e34] bg-[#0d2418] px-3 py-1 text-xs font-semibold text-[#3dd08f]">
                Live sync
              </span>
            </div>
            <div className="space-y-2">
              {[
                ["Monthly surplus", "$847", "text-[var(--accent)]"],
                ["Upcoming bills", "$612", "text-[#f0f0ec]"],
                ["Admin tasks due", "4", "text-[#f0f0ec]"],
                ["Subscriptions", "$126", "text-[#f0f0ec]"],
                ["Renewals this month", "3", "text-[#f0f0ec]"]
              ].map(([label, value, valueColor]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5"
                >
                  <span className="text-sm text-[#a4a49e]">{label}</span>
                  <span className={`text-sm font-semibold ${valueColor}`}>{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              How It Works
            </p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-5xl">
              A simple flow that turns chaos into clarity.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#a8a8a2]">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Features
            </p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-5xl">
              Built for real life, not just budgeting.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6"
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#a8a8a2]">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                Pricing
              </p>
              <h2 className="display-font text-4xl leading-none tracking-tight md:text-5xl">
                Start free. Upgrade when you want automation.
              </h2>
              <p className="mt-3 text-sm text-[#a8a8a2]">
                Annual billing saves ${yearlySavings} per year on Pro.
              </p>
            </div>

            <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-1">
              <button
                type="button"
                onClick={() => setIsMonthly(true)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  isMonthly ? "bg-[var(--accent)] text-black" : "text-[#a8a8a2]"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsMonthly(false)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  !isMonthly ? "bg-[var(--accent)] text-black" : "text-[#a8a8a2]"
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl border p-7 ${
                  plan.highlight
                    ? "border-[var(--accent)] bg-[linear-gradient(180deg,rgba(200,240,128,0.08),rgba(255,255,255,0.01))]"
                    : "border-[var(--border)] bg-[var(--surface-1)]"
                }`}
              >
                <p className="text-sm font-semibold text-[#d7d7d2]">{plan.name}</p>
                <p className="display-font mt-2 text-5xl leading-none tracking-tight">
                  {formatPrice(isMonthly, plan)}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#a8a8a2]">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-[#d3d3ce]">
                  {plan.features.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`mt-7 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                    plan.highlight
                      ? "bg-[var(--accent)] text-black hover:opacity-90"
                      : "border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--surface-1)]"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              FAQ
            </p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-5xl">
              Questions people ask before joining.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <article
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-1)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-base font-semibold">{faq.question}</span>
                    <span className="text-xl text-[var(--muted)]">{open ? "-" : "+"}</span>
                  </button>
                  {open ? (
                    <p className="border-t border-[var(--border)] px-5 py-4 text-sm leading-6 text-[#a8a8a2]">
                      {faq.answer}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section id="cta" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8 md:px-10">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-1)] px-7 py-12 md:px-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Get Early Access
            </p>
            <h2 className="display-font text-5xl leading-[0.95] tracking-tight md:text-6xl">
              No shame. No chaos. Just clarity.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#a8a8a2]">
              Join the waitlist and get updates as Tame rolls out full automation,
              account support, and deeper life-admin workflows.
            </p>
            <div className="mt-8">
              <WaitlistForm compact />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 text-sm text-[var(--muted)] md:grid-cols-[1fr_auto] md:px-10">
          <div>
            <p className="display-font text-3xl leading-none text-[var(--text)]">
              tame<span className="text-[var(--accent)]">.</span>
            </p>
            <p className="mt-2 max-w-md text-xs leading-5">
              Tame is building the operating system for modern life admin.
            </p>
            <p className="mt-3 text-xs">(c) {new Date().getFullYear()} Tame. All rights reserved.</p>
          </div>
          <div className="flex items-end gap-5">
            <a href="#" className="transition hover:text-[var(--text)]">
              Terms
            </a>
            <a href="#" className="transition hover:text-[var(--text)]">
              Privacy
            </a>
            <a href="#" className="transition hover:text-[var(--text)]">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
