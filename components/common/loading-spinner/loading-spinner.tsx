import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type Ref } from 'react';
import { twMerge } from 'tailwind-merge';

type LoadingSpinnerProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof loadingSpinner>;

const loadingSpinner = cva(
  [
    'animate-spin rounded-full border-solid border-current border-t-transparent',
  ],
  {
    variants: {
      size: {
        sm: 'h-2 w-2',
        md: 'h-4 w-4',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8',
        '2xl': 'h-12 w-12',
        '3xl': 'h-16 w-16',
      },
      weight: {
        sm: 'border-2',
        md: 'border-4',
        lg: 'border-8',
      },
    },
    defaultVariants: { size: 'md', weight: 'sm' },
  }
);

export default forwardRef(function LoadingSpinner(
  { size, weight, className, ...props }: LoadingSpinnerProps,
  forwardedRef: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={forwardedRef}
      className={twMerge(loadingSpinner({ size, weight, className }))}
      {...props}
    />
  );
});
