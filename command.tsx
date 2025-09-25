
import * as React from 'react'

export function CommandDialog({ open, onOpenChange, children }:{open:boolean; onOpenChange:(v:boolean)=>void; children:React.ReactNode}){
  if(!open) return null
  return (
<div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
  <div className="absolute inset-0 bg-black/50" onClick={()=>onOpenChange(false)} />
  <div className="relative z-10 w-[90%] max-w-xl rounded-2xl border border-white/10 bg-white dark:bg-[#0b0d12]">
    {children}
  </div>
</div>)
}
export function CommandInput(props: React.InputHTMLAttributes<HTMLInputElement>){ return <input {...props} className={`w-full border-b bg-transparent px-4 py-3 ${props.className||''}`} /> }
export function CommandList({ children }:{children:React.ReactNode}){ return <div className="max-h-80 overflow-auto p-2">{children}</div> }
export function CommandItem({ onSelect, children }:{onSelect?:()=>void; children:React.ReactNode}){ return <div role="button" tabIndex={0} onClick={onSelect} className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">{children}</div> }
export function CommandEmpty({ children }:{children:React.ReactNode}){ return <div className="px-4 py-6 text-sm opacity-70">{children}</div> }
