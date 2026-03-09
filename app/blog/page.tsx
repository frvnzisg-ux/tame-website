const posts = [
  {
    title: "Why life admin feels heavier than work",
    excerpt:
      "A practical breakdown of invisible cognitive load and how to design systems that reduce it.",
    date: "March 2026"
  },
  {
    title: "From task list to operating system",
    excerpt:
      "What changes when you stop managing isolated tasks and start managing your full life context.",
    date: "March 2026"
  },
  {
    title: "Calm productivity is a design problem",
    excerpt:
      "How better defaults, clearer priorities, and tighter feedback loops create sustainable focus.",
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
        Ideas on clarity, systems, and modern life.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
        Writing from the Tame team on designing calmer workflows for personal and professional
        life.
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
