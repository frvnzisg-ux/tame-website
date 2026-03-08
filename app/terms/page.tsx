export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        ← Back to site
      </a>
      <h1 className="display-font mt-6 text-5xl leading-none tracking-tight md:text-6xl">
        Terms of Service
      </h1>
      <p className="mt-5 text-sm leading-7 text-[#a8a8a2]">
        Effective date: March 8, 2026
      </p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[#b2b2ad]">
        <p>
          By using Tame, you agree to use the service lawfully and in accordance
          with these terms. Tame may update features, pricing, and policies over
          time.
        </p>
        <p>
          Paid subscriptions renew automatically unless canceled before the next
          billing cycle. You can cancel at any time from your account settings.
        </p>
        <p>
          For questions about these terms, contact{" "}
          <a className="text-[var(--accent)]" href="mailto:support@tamelife.app">
            support@tamelife.app
          </a>
          .
        </p>
      </div>
    </main>
  );
}
