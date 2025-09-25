
import * as React from 'react'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`h-10 rounded-md border bg-transparent px-3 ${props.className || ''}`} />
}
