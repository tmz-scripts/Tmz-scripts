
import * as React from 'react'

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'icon'
  asChild?: boolean
}

const classesByVariant = {
  default: 'bg-indigo-600 hover:bg-indigo-500 text-white',
  secondary: 'bg-white/20 hover:bg-white/30 dark:bg-white/10 text-inherit',
  ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10',
  link: 'bg-transparent underline hover:opacity-80 px-0',
}

export const Button = React.forwardRef<HTMLButtonElement, BtnProps>(function Button({ className = '', variant='default', size='default', ...props }, ref) {
  const sizeCls = size === 'icon' ? 'p-2 rounded-xl' : 'px-4 py-2 rounded-xl'
  const v = classesByVariant[variant] ?? classesByVariant.default
  return <button ref={ref} className={`${sizeCls} ${v} transition ${className}`} {...props} />
})
export default Button
