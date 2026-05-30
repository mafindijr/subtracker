'use client';

import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ title, children, footer }: ModalProps) {
  return (
    <div
      id="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        <h2 id="modal-title" className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        {children}
        {footer && <div className="mt-6 flex gap-3">{footer}</div>}
      </div>
    </div>
  );
}
