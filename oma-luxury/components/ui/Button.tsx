import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black",
  secondary: "border border-brand-black bg-transparent text-brand-black hover:bg-brand-black hover:text-white",
  ghost: "bg-transparent text-brand-black hover:bg-brand-beige",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] transition duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});
