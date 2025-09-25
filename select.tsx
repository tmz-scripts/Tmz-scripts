
import * as React from 'react'

export function Select({ value, onValueChange, children }:{value?:string; onValueChange?:(v:string)=>void; children:React.ReactNode}){
  return <div className="relative">{children}</div>
}
export function SelectTrigger({ children, className='' }:{children:React.ReactNode; className?:string}){ return <div className={`border rounded-md h-10 flex items-center px-3 ${className}`}>{children}</div> }
export function SelectValue({ placeholder }:{placeholder?:string}){ return <span className="opacity-70">{placeholder}</span> }
export function SelectContent({ children }:{children:React.ReactNode}){ return <div className="hidden">{children}</div> }
export function SelectItem({ value, children }:{value:string; children:React.ReactNode}){ return <option value={value}>{children}</option> }
