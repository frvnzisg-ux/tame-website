export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        {"<- Back to site"}
      </a>
      <h1 className="display-font mt-6 text-5xl leading-none tracking-tight md:text-6xl">
        Terms of Service
      </h1>
      <p className="mt-5 text-sm leading-7 text-[#a8a8a2]">Effective date: March 9, 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-7 text-[#b2b2ad]">
        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Tame, you agree to these Terms of Service and our Privacy
            Policy. If you do not agree, do not use the service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">2. Service Description</h2>
          <p>
            Tame is a life operating system designed to help users manage finances and
            administrative tasks. Features may change over time as we improve the product.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">3. Accounts and Eligibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activity under your account. You agree to provide accurate information
            and keep it up to date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">4. Billing and Subscriptions</h2>
          <p>
            Paid plans renew automatically unless canceled before the next billing period.
            Pricing, billing cadence, and plan limits are shown in-product and may be updated
            with notice.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">5. Acceptable Use</h2>
          <p>
            You agree not to misuse the service, attempt unauthorized access, or interfere with
            platform reliability and security.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">6. Disclaimers</h2>
          <p>
            Tame provides organizational and informational tools and does not provide legal,
            tax, investment, or financial-advisory services. Decisions remain your responsibility.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Tame is not liable for indirect, incidental,
            special, or consequential damages arising from use of the service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">8. Changes and Contact</h2>
          <p>
            We may update these terms from time to time. Continued use after updates constitutes
            acceptance of the revised terms. Questions:{" "}
            <a className="text-[var(--accent)]" href="mailto:support@tamelife.app">
              support@tamelife.app
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
