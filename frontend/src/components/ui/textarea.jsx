import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full resize-none rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-cyan-300/50 focus-visible:ring-2 focus-visible:ring-cyan-300/30 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

export { Textarea };