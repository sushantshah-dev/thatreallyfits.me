import { cn } from '@/lib/utils';

function Card({ className, ...props }) {
  return (
    <section
      className={cn('rounded-[32px] border border-white/10 bg-white/6 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl', className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn('border-b border-white/10 px-6 py-5 sm:px-8', className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return <h2 className={cn('text-2xl font-semibold tracking-[-0.04em] text-white', className)} {...props} />;
}

function CardDescription({ className, ...props }) {
  return <p className={cn('mt-2 text-sm leading-6 text-white/70', className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div className={cn('px-6 py-6 sm:px-8', className)} {...props} />;
}

function CardFooter({ className, ...props }) {
  return <div className={cn('border-t border-white/10 px-6 py-5 sm:px-8', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };