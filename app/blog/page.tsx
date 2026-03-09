const posts = [
  {
    title: "How to run your finances like an operating system",
    excerpt:
      "A practical framework for turning accounts, expenses, debt, and renewals into one clear weekly workflow.",
    date: "March 2026"
  },
  {
    title: "The six core modules behind Tame",
    excerpt:
      "Finances, Accounts, Debt Payoff, Home, Documents and Benefits, and Life Calendar explained end-to-end.",
    date: "March 2026"
  },
  {
    title: "What to automate first in modern life admin",
    excerpt:
      "A tactical guide to auto-pay, renewal tracking, document deadlines, and benefit windows that most people miss.",
    date: "March 2026"
  }
];

export default function BlogPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-20 text-[var(--text)] md:px-10">
      <a href="/" className="text-sm text-[var(--muted)] hover:text-white">
        {"<- Back to site"}
      </a>
      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/55">Blog</p>
      <h1 className="display-font mt-3 text-5xl tracking-tight md:text-6xl">
        Playbooks for calmer finances and life admin.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
        Notes from the Tame team on building practical systems for money, obligations, and
        day-to-day operations.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">{post.excerpt}</p>
            <a href="#" className="mt-5 inline-block text-sm font-semibold text-[var(--teal)]">
              Read article
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
