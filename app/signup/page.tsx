"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  loading: boolean;
  message: string;
  error: string;
};

export default function SignupPage() {
  const appSignupUrl = process.env.NEXT_PUBLIC_APP_SIGNUP_URL || "https://app.tamelife.app/signup";
  const proCheckoutUrl =
    process.env.NEXT_PUBLIC_STRIPE_PRO_CHECKOUT_URL || "https://app.tamelife.app/upgrade";
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>({ loading: false, message: "", error: "" });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
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
          error: result.error ?? "Unable to submit. Please try again."
        });
        return;
      }

      setEmail("");
      trackEvent({ action: "waitlist_submit_success", category: "conversion", label: "signup_page" });
      setState({
        loading: false,
        message: result.message ?? "You're on the waitlist.",
        error: ""
      });
    } catch {
      trackEvent({ action: "waitlist_submit_error", category: "conversion", label: "signup_page" });
      setState({
        loading: false,
        message: "",
        error: "Network error. Please try again."
      });
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        {"<- Back to site"}
      </a>
      <h1 className="display-font mt-6 text-5xl leading-none tracking-tight md:text-6xl">
        Join Tame early access
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-[#a8a8a2]">
        Sign up to get launch updates and early access invites. Questions? Email{" "}
        <a className="text-[var(--accent)]" href="mailto:support@tamelife.app">
          support@tamelife.app
        </a>
        .
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={appSignupUrl}
          onClick={() =>
            trackEvent({ action: "cta_click", category: "conversion", label: "signup_to_app" })
          }
          className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
        >
          Continue to App Signup
        </a>
        <a
          href={proCheckoutUrl}
          onClick={() =>
            trackEvent({ action: "cta_click", category: "conversion", label: "signup_to_checkout" })
          }
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-2)]"
        >
          Go to Pro Checkout
        </a>
      </div>
      <p className="mt-2 text-xs text-[#8e8e88]">
        Choose app signup for Free access or checkout for Pro.
      </p>

      <form onSubmit={submit} className="mt-8 max-w-xl">
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Work or personal email
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[#7f7f79] focus:border-[var(--accent)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={state.loading}
            className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {state.loading ? "Submitting..." : "Join Waitlist"}
          </button>
        </div>
      </form>

      {state.message ? <p className="mt-3 text-sm text-[#55c896]">{state.message}</p> : null}
      {state.error ? <p className="mt-3 text-sm text-[#f05555]">{state.error}</p> : null}
    </main>
  );
}

