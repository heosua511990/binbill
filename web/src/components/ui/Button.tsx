'use client'

import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    isLoading?: boolean
    children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {

        const variants = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md border border-transparent',
            secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-transparent',
            outline: 'bg-transparent border border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300',
            ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md border border-transparent',
            link: 'text-blue-600 underline-offset-4 hover:underline p-0 h-auto font-normal',
        }

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 py-2 text-sm',
            lg: 'h-12 px-6 text-base',
            icon: 'h-10 w-10 p-2 flex items-center justify-center',
        }

        const isDisabled = disabled || isLoading

        return (
            <motion.button
                ref={ref}
                whileTap={!isDisabled ? { scale: 0.96 } : undefined}
                whileHover={!isDisabled && variant !== 'link' ? { scale: 1.01 } : undefined}
                className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 select-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isDisabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        )
    }
)
Button.displayName = 'Button'

export { Button }
