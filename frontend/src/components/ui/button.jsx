import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

const buttonVariants = {
  default:
    'bg-cyan-300 text-slate-950 hover:bg-cyan-200 shadow-[0_10px_30px_rgba(83,234,253,0.18)]',
  secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
  ghost: 'text-white/80 hover:bg-white/10 hover:text-white',
};

const buttonSizes = {
  default: 'h-11 px-5 py-3 text-sm',
  sm: 'h-9 px-4 text-xs',
  lg: 'h-12 px-6 text-sm',
};

const Button = React.forwardRef(function Button(
  { className, variant = 'default', size = 'default', asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
});

export { Button };