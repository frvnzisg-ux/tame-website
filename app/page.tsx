"use client";

import { FormEvent, useEffect, useState } from "react";

type WaitlistState = {
  loading: boolean;
  message: string;
  error: string;
};

const features = [
  {
    icon: "🗓",
    title: "Unified Dashboard",
    description: "All your tasks, habits, goals, and projects in one living command center."
  },
  {
    icon: "🎯",
    title: "Daily Focus Mode",
    description: "Zero in on what matters today with clear priorities and protected focus blocks."
  },
  {
    icon: "🔁",
    title: "Habit Engine",
    description: "Build routines that actually stick through consistency cues and trend tracking."
  },
  {
    icon: "📊",
    title: "Life Analytics",
    description: "See patterns, spot gaps, and improve how your time and energy are invested."
  },
  {
    icon: "🧠",
    title: "Capture Inbox",
    description: "Drop thoughts, tasks, and ideas instantly, then organize them with smart rules."
  },
  {
    icon: "🔗",
    title: "Integrations",
    description: "Connect your calendar, notes, and key tools so your workflow stays in sync."
  }
];

const testimonials = [
  {
    quote:
      "Tame gave me the first week in years where my life felt coordinated instead of constantly reactive.",
    name: "Maya R.",
    title: "Founder, Design Studio"
  },
  {
    quote:
      "I finally have one place for work priorities, personal goals, and daily routines. It feels ridiculously clean.",
    name: "Elliot K.",
    title: "Product Lead"
  },
  {
    quote:
      "It doesn’t guilt you into productivity. It helps you choose what matters and execute calmly.",
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
        message: result.message ?? "You're on the waitlist.",
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
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-[var(--teal)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={state.loading}
          className="rounded-xl bg-[var(--amber)] px-5 py-3 text-sm font-semibold text-[#1a1a1a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.loading ? "Joining..." : "Join the Waitlist"}
        </button>
      </div>
      <p className="mt-2 text-xs text-white/55">No spam. Product updates only.</p>
      {state.message ? <p className="mt-2 text-sm text-[#6de2c4]">{state.message}</p> : null}
      {state.error ? <p className="mt-2 text-sm text-[#ff7d7d]">{state.error}</p> : null}
    </form>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
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
        <div className="orb orb-c" />
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition ${
          scrolled
            ? "border-white/15 bg-[#0a0c12cc] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#" className="text-4xl leading-none tracking-tight text-[var(--teal)] logo-word">
            Tame
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/75 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#how" className="hover:text-white">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="/blog" className="hover:text-white">
              Blog
            </a>
          </div>
          <a
            href="/signup"
            className="rounded-xl bg-[var(--amber)] px-4 py-2 text-sm font-semibold text-[#131313] transition hover:brightness-105"
          >
            Get Early Access
          </a>
        </nav>
      </header>

      <main>
        <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-16 md:grid-cols-[1.06fr_1fr] md:px-10 md:pt-24">
          <div data-reveal className="reveal">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/55">
              Calm structure for modern life
            </p>
            <h1 className="display-font text-5xl leading-[0.95] tracking-tight md:text-8xl">
              Your whole life.
              <br />
              Finally organized.
              <br />
              Finally calm.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/70">
              Tame is your Life OS. Bring order to tasks, goals, habits, and projects across
              personal and professional life without the noise.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={appSignupUrl}
                className="rounded-xl bg-[var(--amber)] px-6 py-3 text-sm font-semibold text-[#151515] transition hover:brightness-105"
              >
                Start Free
              </a>
              <a
                href="#how"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-9">
              <WaitlistForm source="hero" />
            </div>
          </div>

          <div data-reveal className="reveal">
            <div className="glass-card overflow-hidden rounded-3xl p-4 md:p-5">
              <div className="rounded-2xl border border-white/12 bg-[#0f131c] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                  <p className="text-sm font-medium text-white/85">Tame · Today</p>
                  <span className="rounded-full border border-[#4ECDC455] bg-[#4ECDC41a] px-3 py-1 text-xs text-[#7de7df]">
                    Synced
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-[72px_1fr]">
                  <aside className="rounded-xl border border-white/10 bg-white/5 p-2">
                    <div className="grid gap-2 text-center text-xs text-white/60">
                      {["🏠", "📅", "✅", "🧠", "📊"].map((item) => (
                        <div key={item} className="rounded-lg border border-white/10 bg-[#111827] py-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </aside>

                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Today List</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between rounded-lg bg-[#141a25] px-3 py-2">
                          <span>Finalize roadmap draft</span>
                          <span className="text-[#F7B731]">High</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-[#141a25] px-3 py-2">
                          <span>Review budget check-in</span>
                          <span className="text-[#7de7df]">Done</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-[#141a25] px-3 py-2">
                          <span>Call contractor at 4:30</span>
                          <span className="text-white/65">Today</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">
                          Habit Tracker
                        </p>
                        <div className="flex gap-1">
                          {[1, 1, 1, 0, 1, 1, 0].map((active, idx) => (
                            <span
                              key={String(idx)}
                              className={`h-6 w-6 rounded-md border border-white/12 ${
                                active ? "bg-[#4ECDC4]" : "bg-[#1a2331]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">
                          Focus Timer
                        </p>
                        <div className="flex items-end justify-between">
                          <p className="display-font text-3xl leading-none text-[#F7B731]">24:17</p>
                          <p className="text-xs text-white/60">Session 2 of 4</p>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-white/10">
                          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#F7B731]" />
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
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
            <p className="text-sm text-white/80">
              Trusted by <span className="font-semibold text-white">2,400+ early users</span>
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["AL", "JR", "MN", "SK", "TP"].map((initials, idx) => (
                  <span
                    key={initials}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#0a0c12] text-xs font-semibold ${
                      idx % 2 === 0 ? "bg-[#4ECDC4] text-[#0a0c12]" : "bg-[#F7B731] text-[#0a0c12]"
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span className="text-sm text-white/70">★★★★★ 4.9/5</span>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
          <div data-reveal className="reveal mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Features</p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
              A complete operating layer for your life.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <article
                key={feature.title}
                data-reveal
                className="reveal glass-card rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(78,205,196,0.18)]"
                style={{ transitionDelay: `${idx * 35}ms` }}
              >
                <p className="mb-3 text-2xl">{feature.icon}</p>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
          <div data-reveal className="reveal mb-12">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">How It Works</p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
              Three steps from chaos to clarity.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: "🧠",
                title: "Capture everything",
                text: "Brain dump tasks, notes, and ideas instantly before they fragment your attention."
              },
              {
                n: "02",
                icon: "⚙️",
                title: "Tame organizes it",
                text: "Smart rules and intelligent structure sort your life into meaningful priorities."
              },
              {
                n: "03",
                icon: "🌿",
                title: "Live with clarity",
                text: "Daily focus, habits, and goals stay aligned so progress feels calm and sustainable."
              }
            ].map((step, idx) => (
              <div key={step.n} data-reveal className="reveal relative">
                <article className="glass-card h-full rounded-2xl p-6">
                  <p className="display-font text-4xl text-[var(--teal)]">{step.n}</p>
                  <p className="mt-3 text-2xl">{step.icon}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{step.text}</p>
                </article>
                {idx < 2 ? (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-[#4ECDC4] to-transparent md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
          <div data-reveal className="reveal mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Testimonials</p>
            <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
              Loved by thoughtful operators.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} data-reveal className="reveal glass-card rounded-2xl p-6">
                <p className="mb-4 text-3xl text-[var(--teal)]">“</p>
                <p className="text-sm leading-7 text-white/80">{item.quote}</p>
                <p className="mt-5 text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-white/55">{item.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8 md:px-10">
          <div data-reveal className="reveal relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_80%_20%,rgba(78,205,196,0.22),transparent),radial-gradient(55%_85%_at_20%_80%,rgba(247,183,49,0.2),transparent)]" />
            <div className="relative">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">Get Early Access</p>
              <h2 className="display-font text-4xl leading-none tracking-tight md:text-6xl">
                Ready to tame your life?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                Join the waitlist for launch access, product updates, and invitation-only onboarding.
              </p>
              <div className="mt-8">
                <WaitlistForm source="banner" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/12 bg-[#090b11]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:px-10">
          <div>
            <p className="logo-word text-4xl italic leading-none text-[var(--teal)]">Tame</p>
            <p className="mt-2 text-sm text-white/60">Life OS for calm, aligned execution.</p>
            <p className="mt-3 text-xs text-white/45">© 2025 Tame. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-end gap-5 text-sm text-white/70">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#how" className="hover:text-white">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="/blog" className="hover:text-white">
              Blog
            </a>
            <a href="https://x.com" aria-label="X" className="hover:text-white">
              X
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
              IG
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
              IN
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
