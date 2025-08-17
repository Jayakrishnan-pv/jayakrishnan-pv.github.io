import type { ReactNode } from 'react';

export type CardProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
};

export function Card({ title, subtitle, children, className }: CardProps) {
  return (
    <section className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className ?? ''}`}>
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
