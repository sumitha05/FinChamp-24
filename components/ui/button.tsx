import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked:"bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0 ",
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        //have to change the color of the button here
        primary: "bg-indigo-900 text-primary-foreground hover:bg-indigo-900/90 border-indigo-900 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-indigo-900 hover:bg-slate-100",
        secondary: "bg-indigo-950 text-primary-foreground hover:bg-indigo-600/90 border-indigo-900 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-indigo-500 hover:bg-slate-100",
        danger: "bg-rose-600 text-primary-foreground hover:bg-rose-700/90 border-rose-700 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-600 hover:bg-slate-100",
        ghost: "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
        sidebarOutline: "bg-indigo-500/15 text-indigo-500 border-indigo-300 border-2 hover:bg-indigo-500/20 transition-none",
        option: "bg-transparent text-slate-900 border-indigo-300 border-2 hover:bg-slate-100",
        dropdown: "bg-transparent text-slate-900 text-slate-200 hover:bg-indigo-900"

      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
