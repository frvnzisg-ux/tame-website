export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        ← Back to site
      </a>
      <h1 className="display-font mt-6 text-5xl leading-none tracking-tight md:text-6xl">
        Privacy Policy
      </h1>
      <p className="mt-5 text-sm leading-7 text-[#a8a8a2]">
        Effective date: March 8, 2026
      </p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[#b2b2ad]">
        <p>
          Tame collects only the information needed to provide and improve the
          service. This includes account details you submit, usage events, and
          communications you send us.
        </p>
        <p>
          We use your data to operate core product features, security monitoring,
          support, and service updates. We do not sell personal data.
        </p>
        <p>
          You can request account deletion or data export at any time by
          contacting{" "}
          <a className="text-[var(--accent)]" href="mailto:support@tamelife.app">
            support@tamelife.app
          </a>
          .
        </p>
      </div>
    </main>
  );
}
