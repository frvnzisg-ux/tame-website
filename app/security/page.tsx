export default function SecurityPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        {"<- Back to site"}
      </a>
      <h1 className="display-font mt-6 text-5xl leading-none tracking-tight md:text-6xl">
        Security
      </h1>
      <p className="mt-5 text-sm leading-7 text-[#a8a8a2]">
        Last updated: March 8, 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-[#b2b2ad]">
        <p>
          Tame is designed with a security-first architecture. We only collect
          the data required to provide product functionality and support.
        </p>
        <p>
          Sensitive account access is handled through established banking
          connection providers. Data in transit and at rest should be protected
          using modern encryption standards.
        </p>
        <p>
          Access to production systems should be restricted to authorized team
          members using least-privilege access controls.
        </p>
        <p>
          If you believe you found a security issue, contact{" "}
          <a className="text-[var(--accent)]" href="mailto:support@tamelife.app">
            support@tamelife.app
          </a>{" "}
          with details. We review all reports promptly.
        </p>
      </div>
    </main>
  );
}

