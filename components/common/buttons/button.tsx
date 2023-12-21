import { cn } from '@/libs/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type Ref } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

const button = cva(['rounded text-white'], {
  variants: {
    intent: {
      primary: ['bg-blue-600', 'hover:bg-blue-700'],
      secondary: ['bg-red-600', 'hover:bg-red-700'],
    },
    size: { small: ['px-2 py-1 text-sm'], medium: ['px-4 py-2 text-base'] },
  },
  compoundVariants: [{ intent: 'primary', size: 'medium', class: 'uppercase' }],
  defaultVariants: { intent: 'primary', size: 'medium' },
});

export default forwardRef(function Button(
  { children, intent, size, className, ...props }: ButtonProps,
  forwardedRef: Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={forwardedRef}
      className={cn(button({ intent, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
});
