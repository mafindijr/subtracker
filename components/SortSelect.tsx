'use client';

interface SortSelectProps {
  value: 'renewal' | 'cost' | 'name';
  onChange: (value: 'renewal' | 'cost' | 'name') => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
      <label htmlFor="sort" className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
        Sort by
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as 'renewal' | 'cost' | 'name')}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      >
        <option value="renewal">Renewal date</option>
        <option value="cost">Cost</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
