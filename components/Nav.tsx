"use client"

import { cn } from "lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, ReactNode } from "react"

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-slate-900 text-white items-center flex justify-center px-4 min-h-16">
      {children}
    </nav>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-slate-500  hover:text-slate-300 focus-visible:bg-secondary focus-visible:text-slate-300",
        pathname === props.href && "bg-slate-700  text-white"
      )}
    />
  )
}
