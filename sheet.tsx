
import * as React from 'react'

export function Sheet({ open, onOpenChange, children }:{open:boolean; onOpenChange:(v:boolean)=>void; children:React.ReactNode}){
  return <>{children}</>
}
export function SheetContent({ className='', children }:{className?:string; children:React.ReactNode}){
  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:max-w-md bg-white dark:bg-[#0b0d12] border-l border-white/10 shadow-2xl p-4 overflow-y-auto z-50 ${className}`}>
      {children}
    </div>
  )
}
export function SheetHeader({ children }:{children:React.ReactNode}){ return <div className="px-2">{children}</div> }
export function SheetTitle({ children }:{children:React.ReactNode}){ return <h3 className="text-lg font-semibold">{children}</h3> }
