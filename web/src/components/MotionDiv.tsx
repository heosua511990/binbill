'use client'

import { motion, MotionProps } from 'framer-motion'

type MotionDivProps = MotionProps & {
    className?: string
    children: React.ReactNode
}

export const MotionDiv = ({ children, className, ...props }: MotionDivProps) => {
    return (
        <motion.div className={className} {...props}>
            {children}
        </motion.div>
    )
}

export const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}
