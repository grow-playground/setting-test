'use client';

import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type Ref } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/utils';

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof navLink>;

const navLink = cva(
  ['border-b-2 border-b-neutral-300 pb-2 text-center text-neutral-300'],
  {
    variants: {
      intent: {
        primary: ['text-[#3077C6] ', 'border-b-[#3077C6]'],
        secondary: ['text-red-600', 'border-b-red-600'],
      },
    },
    defaultVariants: { intent: 'primary' },
  }
);

export default forwardRef(function NavLink(
  { children, className, intent, href, ...props }: NavLinkProps,
  forwardedRef: Ref<HTMLAnchorElement>
) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      ref={forwardedRef}
      href={href ?? '#'}
      className={cn(
        navLink({ intent: isActive ? intent : null, className }),
        isActive ? 'border-b-4 font-bold' : null
      )}
      {...props}
    >
      {children}
    </Link>
  );
});
