'use client';

import { FilterType } from '@/types';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="flex rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-800">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeFilter === filter.value
              ? 'bg-indigo-600 text-white'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}