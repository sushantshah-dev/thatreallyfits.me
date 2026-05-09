import { cn } from '@/lib/utils';

function Badge({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'border border-white/10 bg-white/5 text-white/75',
    outline: 'border border-white/12 bg-transparent text-white/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-xl',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };