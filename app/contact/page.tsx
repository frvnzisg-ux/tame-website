"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type ContactState = {
  loading: boolean;
  message: string;
  error: string;
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<ContactState>({ loading: false, message: "", error: "" });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ loading: true, message: "", error: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setState({
          loading: false,
          message: "",
          error: result.error ?? "Unable to submit message."
        });
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      trackEvent({ action: "contact_submit_success", category: "conversion", label: "contact_page" });
      setState({ loading: false, message: result.message ?? "Message sent.", error: "" });
    } catch {
      trackEvent({ action: "contact_submit_error", category: "conversion", label: "contact_page" });
      setState({ loading: false, message: "", error: "Network error. Please try again." });
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        {"<- Back to site"}
      </a>
      <h1 className="display-font mt-6 text-5xl leading-none tracking-tight md:text-6xl">
        Contact Tame
      </h1>
      <p className="mt-4 text-sm leading-6 text-[#a8a8a2]">
        Send a message below or email{" "}
        <a className="text-[var(--accent)]" href="mailto:support@tamelife.app">
          support@tamelife.app
        </a>
        .
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Message
          </label>
          <textarea
            required
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={state.loading}
          className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
        >
          {state.loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {state.message ? <p className="mt-3 text-sm text-[#55c896]">{state.message}</p> : null}
      {state.error ? <p className="mt-3 text-sm text-[#f05555]">{state.error}</p> : null}
    </main>
  );
}

