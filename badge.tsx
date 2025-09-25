
import * as React from 'react'

export function Badge({ variant='default', className='', children, ...props }:{variant?: 'default'|'secondary'|'outline'; className?: string; children: React.ReactNode} & React.HTMLAttributes<HTMLSpanElement>) {
  let cls = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs'
  if (variant==='secondary') cls += ' bg-black/10 dark:bg-white/10'
  else if (variant==='outline') cls += ' border'
  else cls += ' bg-indigo-600 text-white'
  return <span className={`${cls} ${className}`} {...props}>{children}</span>
}
