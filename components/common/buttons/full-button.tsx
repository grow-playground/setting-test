import { type ComponentProps, forwardRef } from 'react';
import Button from './button';

export default forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  function FullButton({ children, ...rest }, ref) {
    return (
      <Button ref={ref} className="w-full" {...rest}>
        {children}
      </Button>
    );
  }
);
