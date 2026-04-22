'use client';

import { useState } from 'react';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

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

    setIsSubmitted(true);
    localStorage.setItem('subtracker_reminder_email', email);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">You&apos;ll receive renewal reminders at {email}</span>
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
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Get Reminders
          </button>
        </div>
      </form>
    </div>
  );
}