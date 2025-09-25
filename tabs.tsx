
import * as React from 'react'

export function Tabs({ value, onValueChange, children, className='' }:{value:string; onValueChange:(v:string)=>void; children:React.ReactNode; className?:string}){
  return <div className={className} data-value={value}>{children}</div>
}
export function TabsList({ className='', children }:{className?:string; children:React.ReactNode}){
  return <div className={`inline-flex gap-2 rounded-xl p-1 bg-black/5 dark:bg-white/10 ${className}`}>{children}</div>
}
export function TabsTrigger({ value, children }:{value:string; children:React.ReactNode}){
  const TabsCtx = React.useContext(Ctx); if(!TabsCtx) throw new Error('TabsTrigger must be inside Provider')
  const active = TabsCtx.value === value
  return <button onClick={()=>TabsCtx.onValueChange(value)} className={`px-3 py-1.5 rounded-lg text-sm ${active?'bg-white/80 dark:bg-white/20':'opacity-70 hover:opacity-100'}`}>{children}</button>
}
export function TabsContent({ value, children, className='' }:{value:string; children:React.ReactNode; className?:string}){
  const TabsCtx = React.useContext(Ctx); if(!TabsCtx) throw new Error('TabsContent must be inside Provider')
  if (TabsCtx.value !== value && value !== 'All') return null
  return <div className={className}>{children}</div>
}

type CtxType = { value:string; onValueChange:(v:string)=>void }
const Ctx = React.createContext<CtxType | null>(null)
export function TabsProvider({ value, onValueChange, children }:{value:string; onValueChange:(v:string)=>void; children:React.ReactNode}){
  return <Ctx.Provider value={{ value, onValueChange }}>{children}</Ctx.Provider>
}
