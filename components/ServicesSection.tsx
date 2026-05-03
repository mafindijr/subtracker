'use client';

const services = [
  {
    name: 'Subscription Tracking',
    description: 'Keep all your subscriptions organized in one place with automatic monthly cost calculations.',
    icon: '📋',
    features: ['Add & manage subscriptions', 'Track renewal dates', 'Monitor monthly costs'],
  },
  {
    name: 'Smart Reminders',
    description: 'Never miss a subscription renewal with email reminders and renewal alerts.',
    icon: '🔔',
    features: ['Email notifications', 'Renewal date alerts', 'Customizable preferences'],
  },
  {
    name: 'Spending Analytics',
    description: 'Visualize and understand your subscription spending patterns at a glance.',
    icon: '📊',
    features: ['Cost breakdown charts', 'Monthly spending overview', 'Spending forecast'],
  },
  {
    name: 'Advanced Filtering',
    description: 'Search and filter subscriptions by status, name, or renewal date with ease.',
    icon: '🔍',
    features: ['Multi-filter support', 'Smart search', 'Sort by multiple criteria'],
  },
  {
    name: 'Real-Time Exchange Rates',
    description: 'Get live USD to NGN exchange rate updates for accurate currency conversion.',
    icon: '💱',
    features: ['Live API data', 'Real-time rates', 'Market insights'],
  },
  {
    name: 'Dark Mode & Persistence',
    description: 'Work in dark mode and enjoy seamless data persistence across sessions.',
    icon: '🌓',
    features: ['Dark/light themes', 'Local storage', 'Auto-save functionality'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">
          Services
        </p>
        <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Powerful features to control your subscriptions.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          SubTracker provides a comprehensive suite of tools designed to help you manage, track, and optimize your subscription spending effortlessly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 transition-all hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800 dark:hover:border-indigo-500"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-4xl">{service.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">
          All Plans Include
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">✓</span>
            <span className="text-sm text-indigo-800 dark:text-indigo-200">
              Dashboard summary cards
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">✓</span>
            <span className="text-sm text-indigo-800 dark:text-indigo-200">
              Email reminder system
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">✓</span>
            <span className="text-sm text-indigo-800 dark:text-indigo-200">
              Subscription management
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">✓</span>
            <span className="text-sm text-indigo-800 dark:text-indigo-200">
              Light & dark mode
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
