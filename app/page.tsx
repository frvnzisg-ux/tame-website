"use client";

import { FormEvent, useEffect, useState } from "react";

type WaitlistState = {
  loading: boolean;
  message: string;
  error: string;
};

const features = [
  {
    icon: "O1",
    title: "Finances Dashboard",
    description: "Net worth, monthly surplus, savings rate, and upcoming obligations in one view."
  },
  {
    icon: "O2",
    title: "Connected Accounts",
    description: "All bank, credit, and investment accounts with balances and sync status."
  },
  {
    icon: "O3",
    title: "Debt Payoff",
    description: "Track APR, payment impact, and payoff date with avalanche or snowball strategy."
  },
  {
    icon: "O4",
    title: "Home and Vehicle",
    description: "Monitor equity, insurance, maintenance, and recurring ownership costs."
  },
  {
    icon: "O5",
    title: "Documents and Benefits",
    description: "Stay ahead of renewals, expiration dates, and use-it-or-lose-it balances."
  },
  {
    icon: "O6",
    title: "Life Calendar",
    description: "Payments, renewals, and action windows aligned in one operational timeline."
  }
];

const testimonials = [
  {
    quote:
      "Tame gave me the first week in years where my life felt coordinated instead of reactive.",
    name: "Maya R.",
    title: "Founder, Design Studio"
  },
  {
    quote:
      "I finally have one place for priorities, routines, and follow-through. It feels incredibly clean.",
    name: "Elliot K.",
    title: "Product Lead"
  },
  {
    quote:
      "It does not guilt you into productivity. It helps you choose what matters and execute calmly.",
    name: "Sana P.",
    title: "Operations Manager"
  }
];

function WaitlistForm({ source }: { source: "hero" | "banner" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<WaitlistState>({ loading: false, message: "", error: "" });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ loading: true, message: "", error: "" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `homepage_${source}` })
      });
      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setState({
          loading: false,
          message: "",
          error: result.error ?? "Unable to submit right now. Please try again."
        });
        return;
      }

      setEmail("");
      setState({
        loading: false,
        message: result.message ?? "You are on the waitlist.",
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
    <form onSubmit={onSubmit} className="w-full max-w-xl">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`waitlist-${source}`}>
          Email
        </label>
        <input
          id={`waitlist-${source}`}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@company.com"
          className="w-full rounded-xl border border-white/12 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--amber)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={state.loading}
          className="rounded-xl bg-[var(--amber)] px-5 py-3 text-sm font-semibold text-[#101010] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.loading ? "Joining..." : source === "hero" ? "Get Early Access" : "Join the Waitlist"}
        </button>
      </div>
      <p className="mt-2 text-xs text-white/55">
        No spam. Product updates only. Early access invites roll out weekly.
      </p>
      {state.message ? <p className="mt-2 text-sm text-[var(--ok)]">{state.message}</p> : null}
      {state.error ? <p className="mt-2 text-sm text-[var(--danger)]">{state.error}</p> : null}
    </form>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeModule, setActiveModule] = useState<"finances" | "accounts" | "debt" | "home">(
    "finances"
  );
  const appSignupUrl = process.env.NEXT_PUBLIC_APP_SIGNUP_URL || "/signup";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition ${
          scrolled ? "border-white/12 bg-[#0a0a0acc] backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#" className="text-4xl leading-none tracking-tight text-[var(--text)] logo-word">
            tame<span className="text-[var(--amber)]">.</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/72 md:flex">
            <a href="#modules" className="hover:text-white">Modules</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How It Works</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="/blog" className="hover:text-white">Blog</a>
          </div>
          <a
            href="/signup"
            className="rounded-lg border border-transparent bg-[var(--amber)] px-4 py-2 text-sm font-semibold text-[#101010] transition hover:brightness-105"
          >
            Get Early Access
          </a>
        </nav>
      </header>

      <main>
        <section className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 pb-20 pt-14 md:grid-cols-[1.02fr_1fr] md:px-10 md:pt-20">
          <div data-reveal className="reveal">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/50">Life Operating System</p>
            <h1 className="display-font text-5xl leading-[0.95] tracking-tight md:text-8xl">
              Get everything out of your head.
              <br />
              See what matters.
              <br />
              Move with calm.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/70">
              Tame brings your tasks, goals, habits, and life admin into one system that feels clear,
              practical, and stable.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={appSignupUrl}
                className="rounded-lg bg-[var(--amber)] px-6 py-3 text-sm font-semibold text-[#111] transition hover:brightness-105"
              >
                Start Free in 2 Minutes
              </a>
              <a
                href="#modules"
                className="rounded-lg border border-white/15 bg-[#111] px-6 py-3 text-sm font-semibold text-white hover:bg-[#151515]"
              >
                Explore Live Modules
              </a>
            </div>

            <div className="mt-8">
              <WaitlistForm source="hero" />
            </div>
          </div>

          <div data-reveal className="reveal">
            <div className="glass-card overflow-hidden rounded-2xl p-3">
              <div className="rounded-xl border border-white/10 bg-[#0f0f0f]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Dashboard</p>
                    <p className="text-xs text-white/45">Monday, March 9 · Demo mode · All nominal</p>
                  </div>
                  <span className="rounded-full border border-[#4c3f15] bg-[#231f12] px-3 py-1 text-xs text-[var(--amber)]">
                    Demo
                  </span>
                </div>

                <div className="grid gap-2 border-b border-white/10 p-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["NET WORTH", "$18,430", "text-[var(--amber)]"],
                    ["MONTHLY SURPLUS", "$1,715", "text-[var(--ok)]"],
                    ["SAVINGS RATE", "33%", "text-[var(--teal)]"],
                    ["ACTION NEEDED", "2", "text-[var(--danger)]"]
                  ].map(([label, value, cls]) => (
                    <div key={label} className="rounded-lg border border-white/10 bg-[#121212] p-2.5">
                      <p className="text-[10px] tracking-[0.18em] text-white/45">{label}</p>
                      <p className={`mt-1 text-2xl leading-none ${cls}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 p-3 md:grid-cols-[180px_1fr]">
                  <aside className="rounded-lg border border-white/10 bg-[#111] p-3">
                    <p className="mb-2 text-[10px] tracking-[0.18em] text-white/45">NAVIGATION</p>
                    <div className="space-y-1 text-sm">
                      <div className="rounded-md border border-white/10 bg-[#171717] px-2 py-1.5 text-white">Dashboard</div>
                      <div className="px-2 py-1.5 text-white/65">Finances</div>
                      <div className="px-2 py-1.5 text-white/65">Accounts</div>
                      <div className="px-2 py-1.5 text-white/65">Debt Payoff</div>
                      <div className="px-2 py-1.5 text-white/65">Life Calendar</div>
                    </div>
                  </aside>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-white/10 bg-[#111] p-3">
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Income Waterfall</p>
                      <div className="space-y-2">
                        {[72, 44, 29, 22, 16].map((w, i) => (
                          <div key={String(i)} className="flex items-center gap-2">
                            <span className="w-16 text-xs text-white/55">Item {i + 1}</span>
                            <div className="h-1.5 flex-1 rounded-full bg-[#2a2a2a]">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${w}%`,
                                  background: i < 2 ? "#f08080" : i < 4 ? "#80c8f0" : "#c8f080"
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-[#111] p-3">
                        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Upcoming</p>
                        <p className="text-sm text-white/75">Eversource Electric · due in 4 days</p>
                        <p className="mt-1 text-sm text-[var(--danger)]">$158.40</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-[#111] p-3">
                        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Focus Timer</p>
                        <p className="display-font text-3xl leading-none text-[var(--teal)]">24:17</p>
                        <div className="mt-2 h-1.5 rounded-full bg-[#2a2a2a]">
                          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[var(--teal)] to-[var(--amber)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal className="reveal border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
            <p className="text-sm text-white/80">
              Trusted by <span className="font-semibold text-white">2,400+ early users</span> building calmer
              systems for work and life
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["AL", "JR", "MN", "SK", "TP"].map((initials) => (
                  <span
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0a0a0a] bg-[#c8f080] text-xs font-semibold text-[#0e0e0e]"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span className="text-sm text-white/70">★★★★★ 4.9/5</span>
            </div>
          </div>
        </section>

        <section id="modules" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
          <div data-reveal className="reveal mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Module Demonstrations</p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
              The exact modules users rely on inside Tame.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">
              The homepage now mirrors real in-app surfaces: finances, accounts, debt payoff, and
              home operations with the same visual language used in product.
            </p>
          </div>

          <div data-reveal className="reveal mb-4 inline-flex flex-wrap gap-2 rounded-lg border border-white/10 bg-[#101010] p-1">
            {[
              ["finances", "Finances"],
              ["accounts", "Accounts"],
              ["debt", "Debt Payoff"],
              ["home", "Home"]
            ].map(([key, label]) => (
              <button
                key={String(key)}
                type="button"
                onClick={() => setActiveModule(key as "finances" | "accounts" | "debt" | "home")}
                className={`rounded-md px-4 py-2 text-sm transition ${
                  activeModule === key
                    ? "bg-[var(--amber)] text-[#121212] font-semibold"
                    : "text-white/70 hover:bg-[#171717] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeModule === "finances" ? (
            <article className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-sm font-semibold">Finances</p>
                <span className="text-xs text-[var(--amber)]">Income Waterfall</span>
              </div>
              <div className="mb-3 grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">NET WORTH</p>
                  <p className="text-2xl text-[var(--amber)]">$18,430</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">SURPLUS</p>
                  <p className="text-2xl text-[var(--ok)]">$1,715</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">SAVINGS</p>
                  <p className="text-2xl text-[var(--teal)]">33%</p>
                </div>
              </div>
              <div className="space-y-2">
                {[82, 46, 34, 21, 11].map((w, i) => (
                  <div key={String(i)} className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-white/55">Line {i + 1}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-[#2a2a2a]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${w}%`,
                          background: i < 2 ? "#f08080" : i < 4 ? "#80c8f0" : "#c8f080"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {activeModule === "accounts" ? (
            <article className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-sm font-semibold">Accounts</p>
                <span className="text-xs text-[var(--teal)]">6 connected</span>
              </div>
              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <div className="space-y-2 text-sm">
                  {[
                    ["Chase Checking", "$4,210", "text-[var(--ok)]"],
                    ["Marcus HYSA", "$11,640", "text-[var(--ok)]"],
                    ["Fidelity 401k", "$18,200", "text-[var(--ok)]"],
                    ["Capital One Quicksilver", "-$2,140", "text-[var(--danger)]"],
                    ["Citi Double Cash", "-$2,280", "text-[var(--danger)]"]
                  ].map(([name, amount, color]) => (
                    <div key={String(name)} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#121212] px-3 py-2">
                      <span className="text-white/78">{name}</span>
                      <span className={String(color)}>{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Recent Transactions</p>
                  <div className="space-y-2 text-xs text-white/72">
                    <div className="flex justify-between"><span>Whole Foods</span><span>-$67.42</span></div>
                    <div className="flex justify-between"><span>Direct Deposit</span><span className="text-[var(--ok)]">+$2,600.00</span></div>
                    <div className="flex justify-between"><span>Shell Gas Station</span><span>-$52.40</span></div>
                    <div className="flex justify-between"><span>Eversource Electric</span><span>-$158.40</span></div>
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          {activeModule === "debt" ? (
            <article className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-sm font-semibold">Debt Payoff</p>
                <span className="text-xs text-[var(--danger)]">Avalanche strategy</span>
              </div>
              <div className="mb-4 space-y-4">
                {[
                  ["Capital One Quicksilver", "APR 24.99%", "62%", "#f08080"],
                  ["Citi Double Cash", "APR 21.49%", "55%", "#f08080"],
                  ["Car Loan - Honda Civic", "APR 6.9%", "34%", "#80c8f0"]
                ].map(([name, sub, width, color]) => (
                  <div key={String(name)}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-white/78">{name}</span>
                      <span className="text-white/45">{sub}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#2a2a2a]">
                      <div className="h-full rounded-full" style={{ width: String(width), background: String(color) }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="rounded-lg border border-[#5a2222] bg-[#211313] p-3 text-xs text-white/75">
                  <p className="font-semibold text-[#f08080]">Avalanche</p>
                  <p className="mt-1">Pays highest APR first. Saves more interest over time.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-3 text-xs text-white/75">
                  <p className="font-semibold text-[var(--teal)]">Snowball</p>
                  <p className="mt-1">Pays smallest balance first. Builds momentum quickly.</p>
                </div>
              </div>
            </article>
          ) : null}

          {activeModule === "home" ? (
            <article className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-sm font-semibold">Home</p>
                <span className="text-xs text-[var(--amber)]">Property overview</span>
              </div>
              <div className="mb-3 grid gap-2 sm:grid-cols-4">
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">HOME VALUE</p>
                  <p className="text-2xl text-[var(--amber)]">$485,000</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">EQUITY</p>
                  <p className="text-2xl text-[var(--teal)]">$186,500</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">MONTHLY COST</p>
                  <p className="text-2xl text-[var(--amber)]">$2,919</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">INSURANCE</p>
                  <p className="text-2xl text-white">$142</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-white/72">
                <div className="rounded-lg border border-white/10 bg-[#121212] px-3 py-2">
                  Equity progress: <span className="text-[var(--teal)]">38%</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] px-3 py-2">
                  Insurance renewal: <span className="text-white">May 2026</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] px-3 py-2">
                  Next maintenance task: <span className="text-[var(--danger)]">Dryer vent cleaning</span>
                </div>
              </div>
            </article>
          ) : null}
        </section>

        <section id="features" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
          <div data-reveal className="reveal mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Features</p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
              Everything you need to run life with clarity.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <article
                key={feature.title}
                data-reveal
                className="reveal glass-card rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--amber)]"
                style={{ transitionDelay: `${idx * 35}ms` }}
              >
                <p className="mb-3 text-xs tracking-[0.2em] text-white/50">{feature.icon}</p>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
          <div data-reveal className="reveal mb-12">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">How It Works</p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
              Capture once. Align automatically. Execute clearly.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Capture everything",
                text: "Brain dump tasks, notes, and ideas instantly before they fragment your attention."
              },
              {
                n: "02",
                title: "Tame organizes it",
                text: "Smart rules and intelligent structure sort your life into meaningful priorities."
              },
              {
                n: "03",
                title: "Live with clarity",
                text: "Daily focus, habits, and goals stay aligned so progress feels calm and sustainable."
              }
            ].map((step, idx) => (
              <div key={step.n} data-reveal className="reveal relative">
                <article className="glass-card h-full rounded-2xl p-6">
                  <p className="display-font text-4xl text-[var(--amber)]">{step.n}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{step.text}</p>
                </article>
                {idx < 2 ? (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-[var(--amber)] to-transparent md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
          <div data-reveal className="reveal mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Testimonials</p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
              Built for thoughtful people who want less noise.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} data-reveal className="reveal glass-card rounded-2xl p-6">
                <p className="mb-4 text-3xl text-[var(--amber)]">"</p>
                <p className="text-sm leading-7 text-white/80">{item.quote}</p>
                <p className="mt-5 text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-white/55">{item.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:px-10">
          <div data-reveal className="reveal relative overflow-hidden rounded-2xl border border-white/12 bg-[#101010] p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_80%_20%,rgba(128,200,240,0.14),transparent),radial-gradient(55%_85%_at_20%_80%,rgba(200,240,128,0.18),transparent)]" />
            <div className="relative">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">Get Early Access</p>
              <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
                Ready to replace overwhelm with a clear operating system?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                Join the waitlist for early access, product updates, and invite-only onboarding.
              </p>
              <div className="mt-8">
                <WaitlistForm source="banner" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/12 bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:px-10">
          <div>
            <p className="logo-word text-4xl leading-none text-[var(--text)]">
              tame<span className="text-[var(--amber)]">.</span>
            </p>
            <p className="mt-2 text-sm text-white/60">Life OS for calm, aligned execution.</p>
            <p className="mt-3 text-xs text-white/45">(c) 2025 Tame. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-end gap-5 text-sm text-white/70">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How It Works</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="/blog" className="hover:text-white">Blog</a>
            <a href="https://x.com" aria-label="X" className="hover:text-white">X</a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">IG</a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">IN</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

