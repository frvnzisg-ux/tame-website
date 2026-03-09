export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        {"<- Back to site"}
      </a>
      <h1 className="display-font mt-6 text-5xl leading-none tracking-tight md:text-6xl">
        Privacy Policy
      </h1>
      <p className="mt-5 text-sm leading-7 text-[#a8a8a2]">Effective date: March 9, 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-7 text-[#b2b2ad]">
        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">1. What We Collect</h2>
          <p>
            We collect information you provide directly (such as name, email, and submitted
            messages) and limited usage data needed to operate and improve Tame.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">2. How We Use Data</h2>
          <p>
            We use your information to provide product functionality, deliver support, send
            relevant product updates, improve reliability, and protect platform security.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">3. Sharing and Disclosure</h2>
          <p>
            We do not sell personal data. We may share information with trusted service providers
            that help us operate the product, under contractual confidentiality obligations.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">4. Data Retention and Rights</h2>
          <p>
            We retain data only as long as needed for product operations and legal compliance. You
            may request access, correction, export, or deletion by contacting support.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--text)]">5. Contact</h2>
          <p>
            Privacy questions and requests can be sent to{" "}
            <a className="text-[var(--teal)]" href="mailto:support@tamelife.app">
              support@tamelife.app
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
