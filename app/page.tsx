"use client";

import { FormEvent, useEffect, useState } from "react";

type WaitlistState = {
  loading: boolean;
  message: string;
  error: string;
};

const features = [
  {
    icon: "FIN",
    title: "Finances Dashboard",
    description: "Net worth, monthly surplus, savings rate, and upcoming obligations in one view."
  },
  {
    icon: "ACC",
    title: "Connected Accounts",
    description: "All bank, credit, and investment accounts with balances and sync status."
  },
  {
    icon: "DBT",
    title: "Debt Payoff",
    description: "Track APR, payment impact, and payoff date with avalanche or snowball strategy."
  },
  {
    icon: "HME",
    title: "Home and Vehicle",
    description: "Monitor equity, insurance, maintenance, and recurring ownership costs."
  },
  {
    icon: "DOC",
    title: "Documents and Benefits",
    description: "Stay ahead of renewals, expiration dates, and use-it-or-lose-it balances."
  },
  {
    icon: "CAL",
    title: "Life Calendar",
    description: "Payments, renewals, and action windows aligned in one operational timeline."
  }
];

const testimonials = [
  {
    quote:
      "For the first time, my finances and life admin live in one place. I stopped missing things.",
    name: "Maya R.",
    title: "Founder, Design Studio"
  },
  {
    quote:
      "The module layout feels like a control center: accounts, debt, renewals, and next actions.",
    name: "Elliot K.",
    title: "Product Lead"
  },
  {
    quote:
      "Tame helps me run my household like an operating system, not a pile of disconnected apps.",
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
  const [activeModule, setActiveModule] = useState<
    "finances" | "accounts" | "debt" | "home" | "documents" | "calendar"
  >("finances");
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
        <section className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 pb-20 pt-14 md:grid-cols-[0.95fr_1.05fr] md:px-10 md:pt-20">
          <div data-reveal className="reveal">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/50">Life Operating System</p>
            <h1 className="display-font max-w-2xl text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Money plus life admin.
              <br />
              One clear system.
              <br />
              Built to keep up.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/70">
              Connect your banks, track expenses, plan debt payoff, and stay ahead of documents,
              benefits, renewals, and deadlines with one operational view.
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
              <div className="rounded-xl border border-white/10 bg-[#0e0e0f]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Dashboard</p>
                    <p className="text-xs text-white/45">Monday, March 9 · 3 accounts connected · All nominal</p>
                  </div>
                  <span className="rounded-full border border-[#22422d] bg-[#102017] px-3 py-1 text-xs text-[var(--ok)]">
                    Live sync
                  </span>
                </div>

                <div className="grid gap-2 border-b border-white/10 p-3 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    ["NET WORTH", "$18,430", "text-[var(--amber)]"],
                    ["MONTHLY SURPLUS", "$1,715", "text-[var(--ok)]"],
                    ["SAVINGS RATE", "33%", "text-[var(--teal)]"],
                    ["EXPIRING SOON", "4", "text-[#f5c971]"],
                    ["ACTION NEEDED", "2", "text-[var(--danger)]"]
                  ].map(([label, value, cls]) => (
                    <div key={label} className="rounded-lg border border-white/10 bg-[#111112] p-2.5">
                      <p className="text-[10px] tracking-[0.18em] text-white/45">{label}</p>
                      <p className={`mt-1 text-2xl leading-none ${cls}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 p-3 md:grid-cols-[minmax(0,1fr)_240px]">
                  <div className="space-y-3">
                    <div className="rounded-lg border border-white/10 bg-[#111112]">
                      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                        <p className="text-xs font-semibold text-white">Income Waterfall - March</p>
                        <span className="text-xs text-[var(--amber)]">Full view</span>
                      </div>
                      <div className="space-y-1.5 px-3 py-3 text-xs">
                        {[
                          ["Rent", 71, "-$1,450"],
                          ["Car Loan", 35, "-$310"],
                          ["Car Insurance", 24, "-$180"],
                          ["Utilities", 18, "-$158"],
                          ["Food and Dining", 26, "-$414"],
                          ["Transport", 14, "-$282"],
                          ["Subscriptions", 11, "-$130"]
                        ].map(([label, width, value], i) => (
                          <div key={String(label)} className="grid grid-cols-[118px_1fr_60px] items-center gap-2">
                            <span className="text-white/58">{label}</span>
                            <div className="h-1.5 rounded-full bg-[#2a2a2a]">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${width}%`,
                                  background: i < 2 ? "#f08080" : i < 6 ? "#80c8f0" : "#c8f080"
                                }}
                              />
                            </div>
                            <span className="text-right text-white/62">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#111112]">
                      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                        <p className="text-xs font-semibold text-white">Upcoming - 30 Days</p>
                        <span className="text-xs text-[var(--amber)]">Calendar</span>
                      </div>
                      <div className="space-y-2 px-3 py-3 text-xs">
                        {[
                          ["Mar 8", "Eversource Electric", "$158.00", "Urgent", "text-[var(--danger)]"],
                          ["Mar 12", "Comcast Xfinity", "$89.99", "Auto", "text-[var(--ok)]"],
                          ["Mar 15", "Progressive Insurance", "$180.00", "Auto", "text-white/70"],
                          ["Mar 22", "Driver's License Renewal", "-", "18 days", "text-[#f5c971]"]
                        ].map(([date, item, amount, tag, amountColor]) => (
                          <div key={String(item)} className="grid grid-cols-[42px_1fr_auto_auto] items-center gap-2">
                            <span className="text-white/40">{date}</span>
                            <span className="text-white/76">{item}</span>
                            <span className={String(amountColor)}>{amount}</span>
                            <span className="rounded-full border border-white/12 px-1.5 py-0.5 text-[10px] text-white/65">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <aside className="space-y-3">
                    <div className="rounded-lg border border-white/10 bg-[#111112]">
                      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                        <p className="text-xs font-semibold">Net Worth</p>
                        <span className="text-xs text-[var(--amber)]">All accounts</span>
                      </div>
                      <div className="px-3 py-3">
                        <p className="text-4xl leading-none text-[var(--amber)]">$18,430</p>
                        <p className="mt-1 text-xs text-[var(--ok)]">+$320 this month · +$4,100 this year</p>
                      </div>
                      <div className="space-y-1 border-t border-white/10 px-3 py-2 text-xs">
                        {[
                          ["Chase Checking", "$4,210", "text-[var(--ok)]"],
                          ["Marcus HYSA", "$11,640", "text-[var(--ok)]"],
                          ["Fidelity 401k", "$18,200", "text-[var(--ok)]"],
                          ["Capital One", "-$2,140", "text-[var(--danger)]"]
                        ].map(([name, amount, cls]) => (
                          <div key={String(name)} className="flex items-center justify-between">
                            <span className="text-white/62">{name}</span>
                            <span className={String(cls)}>{amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#111112] p-3">
                      <p className="mb-2 text-xs font-semibold text-white">Savings Rate</p>
                      <p className="text-4xl leading-none text-[var(--teal)]">33%</p>
                      <div className="mt-3 h-1.5 rounded-full bg-[#2a2a2a]">
                        <div className="h-full w-[66%] rounded-full bg-gradient-to-r from-[var(--teal)] to-[var(--amber)]" />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-y-1 text-[11px] text-white/60">
                        <span>Feb</span><span className="text-right">29%</span>
                        <span>Mar</span><span className="text-right text-[var(--amber)]">33%</span>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal className="reveal border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
            <p className="text-sm text-white/80">
              Trusted by <span className="font-semibold text-white">2,400+ early users</span> organizing
              finances, deadlines, and life admin in one operating system
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
              Built from the same module architecture shown in-app: Finances, Accounts, Debt
              Payoff, Home, Documents and Benefits, and Life Calendar.
            </p>
          </div>

          <div data-reveal className="reveal mb-4 inline-flex flex-wrap gap-2 rounded-lg border border-white/10 bg-[#101010] p-1">
            {[
              ["finances", "Finances"],
              ["accounts", "Accounts"],
              ["debt", "Debt Payoff"],
              ["home", "Home"],
              ["documents", "Documents"],
              ["calendar", "Life Calendar"]
            ].map(([key, label]) => (
              <button
                key={String(key)}
                type="button"
                onClick={() =>
                  setActiveModule(
                    key as "finances" | "accounts" | "debt" | "home" | "documents" | "calendar"
                  )
                }
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
              <div className="grid gap-3 lg:grid-cols-[1fr_250px]">
                <div>
                  <div className="mb-3 grid gap-2 sm:grid-cols-3 text-sm">
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
                  <div className="rounded-lg border border-white/10 bg-[#121212] p-3">
                    <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">Income waterfall - March</p>
                    <div className="space-y-2">
                      {[
                        ["Rent", 82, "-$1,450"],
                        ["Car Loan", 46, "-$310"],
                        ["Food and Dining", 34, "-$414"],
                        ["Transport", 21, "-$282"],
                        ["Subscriptions", 11, "-$130"]
                      ].map(([label, width, value], i) => (
                        <div key={String(label)} className="grid grid-cols-[110px_1fr_60px] items-center gap-2 text-xs">
                          <span className="text-white/55">{label}</span>
                          <div className="h-1.5 rounded-full bg-[#2a2a2a]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${width}%`,
                                background: i < 2 ? "#f08080" : i < 4 ? "#80c8f0" : "#c8f080"
                              }}
                            />
                          </div>
                          <span className="text-right text-white/65">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <aside className="space-y-2">
                  <div className="rounded-lg border border-white/10 bg-[#121212] p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">Savings Rate</p>
                    <p className="mt-1 text-4xl leading-none text-[var(--teal)]">33%</p>
                    <div className="mt-3 space-y-1">
                      {[28, 25, 18, 30, 29, 33].map((value, idx) => (
                        <div key={String(idx)} className="flex items-center gap-2 text-[11px]">
                          <span className="w-6 text-white/40">{["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][idx]}</span>
                          <div className="h-1.5 flex-1 rounded-full bg-[#2a2a2a]">
                            <div className="h-full rounded-full bg-[#80c8f0]" style={{ width: `${value}%` }} />
                          </div>
                          <span className="w-7 text-right text-white/55">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#121212] p-3">
                    <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">Quick Actions</p>
                    <button className="mb-2 w-full rounded-md bg-[var(--amber)] px-2 py-2 text-xs font-semibold text-[#101010]">
                      Pay Eversource
                    </button>
                    <button className="w-full rounded-md border border-white/12 px-2 py-2 text-xs text-white/70">
                      Add Obligation
                    </button>
                  </div>
                </aside>
              </div>
            </article>
          ) : null}

          {activeModule === "accounts" ? (
            <article className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-sm font-semibold">Accounts</p>
                <span className="text-xs text-[var(--teal)]">6 connected</span>
              </div>
              <div className="mb-3 grid gap-2 sm:grid-cols-4 text-sm">
                {[
                  ["TOTAL ASSETS", "$34,050", "text-[var(--ok)]"],
                  ["DEBT AND LOANS", "-$15,620", "text-[var(--danger)]"],
                  ["NET WORTH", "$18,430", "text-[var(--amber)]"],
                  ["LAST SYNC", "2m ago", "text-white"]
                ].map(([label, value, cls]) => (
                  <div key={String(label)} className="rounded-lg border border-white/10 bg-[#121212] p-2">
                    <p className="text-[10px] tracking-[0.16em] text-white/45">{label}</p>
                    <p className={`text-2xl leading-none ${cls}`}>{value}</p>
                  </div>
                ))}
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
                      <span className="text-white/78">
                        {name}
                        <span className="ml-2 rounded-full border border-[#22422d] bg-[#102017] px-2 py-0.5 text-[10px] text-[var(--ok)]">
                          Connected
                        </span>
                      </span>
                      <span className={String(color)}>{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Recent Transactions</p>
                  <div className="space-y-2 text-xs text-white/72">
                    {[
                      ["Whole Foods", "-$67.42", "text-white"],
                      ["Spotify", "-$9.99", "text-white/70"],
                      ["Direct Deposit - ACME", "+$2,600.00", "text-[var(--ok)]"],
                      ["Shell Gas Station", "-$52.40", "text-white"],
                      ["Netflix", "-$15.49", "text-white"],
                      ["Eversource Electric", "-$158.40", "text-white"]
                    ].map(([item, amount, cls]) => (
                      <div key={String(item)} className="flex justify-between">
                        <span>{item}</span>
                        <span className={String(cls)}>{amount}</span>
                      </div>
                    ))}
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
              <div className="mb-4 grid gap-2 sm:grid-cols-5 text-sm">
                {[
                  ["TOTAL DEBT", "$15,620", "text-[var(--danger)]"],
                  ["MONTHLY INTEREST", "$150", "text-white"],
                  ["PAYOFF AT MINIMUM", "18yr 10mo", "text-[#f5c971]"],
                  ["INTEREST IF MINIMUMS", "$9,540", "text-[var(--danger)]"],
                  ["DEBT-FREE DATE", "Jan 2045", "text-[var(--teal)]"]
                ].map(([label, value, cls]) => (
                  <div key={String(label)} className="rounded-lg border border-white/10 bg-[#121212] p-2">
                    <p className="text-[10px] tracking-[0.16em] text-white/45">{label}</p>
                    <p className={`text-2xl leading-none ${cls}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4 space-y-4">
                {[
                  ["Capital One Quicksilver", "APR 24.99%", "62%", "$44/mo", "$45/mo", "#f08080"],
                  ["Citi Double Cash", "APR 21.49%", "55%", "$41/mo", "$38/mo", "#f08080"],
                  ["Car Loan - Honda Civic", "APR 6.9%", "34%", "$64/mo", "$310/mo", "#80c8f0"]
                ].map(([name, sub, width, interest, minPay, color]) => (
                  <div key={String(name)}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-white/78">{name}</span>
                      <span className="text-white/45">{sub}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#2a2a2a]">
                      <div className="h-full rounded-full" style={{ width: String(width), background: String(color) }} />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-white/45">
                      <span>Interest: {interest}</span>
                      <span>Min: {minPay}</span>
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
              <div className="space-y-3">
                <div className="rounded-lg border border-white/10 bg-[#121212]">
                  <div className="border-b border-white/10 px-3 py-2 text-xs font-semibold">Property Overview</div>
                  <div className="grid gap-3 px-3 py-3 text-xs text-white/72 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] tracking-[0.14em] text-white/45">ADDRESS</p>
                      <p className="text-sm text-white/85">47 Birchwood Ln, Newton, MA</p>
                      <p className="mt-2 text-[10px] tracking-[0.14em] text-white/45">PURCHASED</p>
                      <p className="text-sm text-white/85">2018 · Purchase $380,000</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.14em] text-white/45">MORTGAGE</p>
                      <p className="text-sm text-white/85">$298,500 remaining</p>
                      <p className="mt-2 text-[10px] tracking-[0.14em] text-white/45">EQUITY</p>
                      <p className="text-sm text-[var(--teal)]">$186,500 (38%)</p>
                    </div>
                  </div>
                  <div className="border-t border-white/10 px-3 py-2">
                    <div className="h-2 rounded-full bg-[#2a2a2a]">
                      <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-[var(--amber)] to-[var(--teal)]" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#121212] p-3 text-xs">
                  <p className="mb-2 text-xs font-semibold text-white">Monthly Housing Cost</p>
                  <p className="text-4xl leading-none text-[var(--amber)]">$2,919</p>
                  <p className="mt-1 text-white/45">Mortgage, tax, insurance, utilities</p>
                  <div className="mt-3 h-2 rounded-full bg-[#2a2a2a]">
                    <div className="h-full w-[61%] rounded-full bg-[#c8f080]" />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-y-1 text-white/65">
                    <span>Mortgage (P&I)</span><span className="text-right">$1,820</span>
                    <span>Property Tax</span><span className="text-right">$580</span>
                    <span>Insurance</span><span className="text-right">$142</span>
                    <span>Utilities</span><span className="text-right">$377</span>
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          {activeModule === "documents" ? (
            <article className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-sm font-semibold">Documents and Benefits</p>
                <span className="text-xs text-[var(--danger)]">3 action needed</span>
              </div>
              <div className="mb-3 grid gap-2 sm:grid-cols-4">
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">OPEN ITEMS</p>
                  <p className="text-2xl text-[var(--danger)]">3</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">EXPIRING 30D</p>
                  <p className="text-2xl text-[var(--amber)]">4</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">FSA BALANCE</p>
                  <p className="text-2xl text-[var(--teal)]">$340</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">BENEFIT DEADLINE</p>
                  <p className="text-2xl text-white">18d</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-white/72">
                {[
                  ["Driver's License Renewal", "Document", "Due in 18 days", "text-[var(--amber)]"],
                  ["FSA Balance Deadline", "Benefit", "$340 use-it-or-lose-it", "text-[var(--teal)]"],
                  ["Dental Plan Enrollment", "Benefit", "Window closes in 11 days", "text-[var(--danger)]"],
                  ["Passport Expiration", "Document", "Expires in 5 months", "text-[var(--ok)]"]
                ].map(([title, type, value, colorClass]) => (
                  <div
                    key={String(title)}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-[#121212] px-3 py-2"
                  >
                    <div>
                      <p className="text-sm text-white/85">{title}</p>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{type}</p>
                    </div>
                    <span className={String(colorClass)}>{value}</span>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {activeModule === "calendar" ? (
            <article className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-sm font-semibold">Life Calendar</p>
                <span className="text-xs text-[var(--teal)]">Next 30 days</span>
              </div>
              <div className="mb-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">BILLS DUE</p>
                  <p className="text-2xl text-[var(--danger)]">6</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">RENEWALS</p>
                  <p className="text-2xl text-[var(--amber)]">3</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#121212] p-2">
                  <p className="text-[10px] tracking-[0.16em] text-white/45">AUTO-PAY</p>
                  <p className="text-2xl text-[var(--ok)]">4</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  ["Mar 12", "Comcast Xfinity", "$89.99", "Auto", "text-[var(--ok)]"],
                  ["Mar 15", "Progressive Insurance", "$180.00", "Auto", "text-[var(--ok)]"],
                  ["Mar 22", "Driver's License Renewal", "-", "18 days", "text-[var(--amber)]"],
                  ["Mar 25", "FSA Balance Deadline", "$340", "Benefit", "text-[var(--teal)]"],
                  ["Apr 1", "Rent - 123 Main St", "$1,450", "28 days", "text-[var(--danger)]"]
                ].map(([date, label, amount, tag, colorClass]) => (
                  <div
                    key={String(label)}
                    className="grid grid-cols-[56px_1fr_auto_auto] items-center gap-3 rounded-lg border border-white/10 bg-[#121212] px-3 py-2 text-xs"
                  >
                    <span className="text-white/45">{date}</span>
                    <span className="text-white/78">{label}</span>
                    <span className={String(colorClass)}>{amount}</span>
                    <span className="rounded-full border border-white/12 px-2 py-0.5 text-[10px] text-white/70">
                      {tag}
                    </span>
                  </div>
                ))}
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
                title: "Connect and capture",
                text: "Link your financial accounts and add life admin items like documents, renewals, and deadlines."
              },
              {
                n: "02",
                title: "Tame structures it",
                text: "Transactions, obligations, and tasks are organized into modules with clear status and next actions."
              },
              {
                n: "03",
                title: "Run life from one dashboard",
                text: "Track net worth, upcoming bills, payoff strategy, and critical dates without context switching."
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
            <a href="/contact" className="hover:text-white">Contact</a>
            <a href="/security" className="hover:text-white">Security</a>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="https://x.com" aria-label="X" className="hover:text-white">X</a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">IG</a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">IN</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

