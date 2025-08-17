import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
  secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300'
};

export type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
  const classes = clsx(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes} {...(props as any)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...(props as any)}>
      {children}
    </button>
  );
}
