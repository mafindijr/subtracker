'use client';

import { useEffect, useState } from 'react';

const EMAIL_STORAGE_KEY = 'subtracker_reminder_email';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
      setIsSubmitted(true);
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    localStorage.setItem(EMAIL_STORAGE_KEY, email);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    localStorage.removeItem(EMAIL_STORAGE_KEY);
    setEmail('');
    setIsSubmitted(false);
    setError('');
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-600/50 dark:bg-emerald-950/20">
        <div className="flex items-start gap-3 text-emerald-700 dark:text-emerald-300">
          <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-semibold">Renewal reminders saved.</p>
            <p className="mt-1 text-sm text-emerald-700/90 dark:text-emerald-300/80">
              We&apos;ll send alerts to <span className="font-medium">{email}</span> before upcoming renewals.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="inline-flex justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            Update email
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex justify-center rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-900"
          >
            Clear reminder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Get Renewal Reminders
      </h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Enter your email to receive reminders before subscriptions renew.
      </p>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="reminder-email" className="sr-only">Email address</label>
            <input
              id="reminder-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Save reminder
          </button>
        </div>
      </form>
    </div>
  );
}