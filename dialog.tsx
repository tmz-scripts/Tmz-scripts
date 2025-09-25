
import * as React from 'react'

export function Dialog({ open, onOpenChange, children }:{open?:boolean; onOpenChange?:(v:boolean)=>void; children:React.ReactNode}){
  return <>{children}</>
}
export function DialogContent({ className='', children }:{className?:string; children:React.ReactNode}){
  return (
<div className={`fixed inset-0 z-50 flex items-center justify-center`}> 
  <div className="absolute inset-0 bg-black/50" />
  <div className={`relative z-10 bg-white dark:bg-[#0b0d12] border border-white/10 rounded-2xl p-4 w-[90%] ${className}`}>{children}</div>
</div>)
}
export function DialogHeader({ children }:{children:React.ReactNode}){ return <div className="mb-2">{children}</div> }
export function DialogTitle({ children }:{children:React.ReactNode}){ return <h3 className="text-lg font-semibold">{children}</h3> }
export function DialogTrigger({ asChild, children }:{asChild?:boolean; children:React.ReactElement}){ return children }
