import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm text-brand-black outline-none transition placeholder:text-neutral-400 focus:border-brand-gold",
        className,
      )}
      {...props}
    />
  );
});
