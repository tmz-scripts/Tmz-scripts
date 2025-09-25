
import * as React from 'react'

export function Card({ className='', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`border rounded-2xl bg-white/60 dark:bg-white/5 ${className}`} {...props}>{children}</div>
}
export function CardHeader({ className='', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 pt-6 ${className}`} {...props}>{children}</div>
}
export function CardContent({ className='', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 pb-6 ${className}`} {...props}>{children}</div>
}
export function CardTitle({ className='', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`text-lg font-semibold ${className}`} {...props}>{children}</div>
}
