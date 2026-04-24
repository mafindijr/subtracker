export function AuditLeadCapture() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-100/70 px-4 py-6 dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Stay Updated</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your email to receive product updates and renewal tips.
          </p>
        </div>

        <form action="#" method="post" className="flex w-full max-w-md gap-2">
          
          <label htmlFor="lead-capture-email" className="sr-only">
            Email address
          </label>
          <input
            id="lead-capture-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
