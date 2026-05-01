'use client';

const plans = [
  {
    name: 'Starter',
    price: '₦2,499',
    cadence: 'month',
    description: 'Track the essentials and stay ahead of your first subscriptions.',
    features: ['Up to 5 subscriptions', 'Renewal email reminders', 'Monthly spend overview'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '₦5,999',
    cadence: 'month',
    description: 'Ideal for growing subscription habits with smarter alerts.',
    features: ['Unlimited active plans', 'Custom renewal alerts', 'Spending forecast'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '₦11,499',
    cadence: 'month',
    description: 'For power users and teams who want full budget control.',
    features: ['Priority support', 'Advanced analytics', 'Export subscription data'],
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">
            Pricing
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Plans built for every subscription routine.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Choose the plan that fits your needs. Every tier includes reminders, spending clarity, and easy subscription management.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="font-semibold">Try Growth</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Most users upgrade here for smarter monthly tracking.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-6 transition-shadow ${plan.featured ? 'border-indigo-500 bg-indigo-50 shadow-lg dark:border-indigo-400/40 dark:bg-indigo-950/30' : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{plan.name}</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{plan.price}</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">/{plan.cadence}</span>
                </div>
              </div>
              {plan.featured && (
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`mt-8 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600'}`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}