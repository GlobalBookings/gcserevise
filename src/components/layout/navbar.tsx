"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const publicLinks = [
  { href: "/subjects", label: "Subjects" },
  { href: "/past-papers", label: "Past Papers" },
  { href: "/my-revision", label: "My Revision" },
  { href: "/#premium", label: "Premium" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200"><BookOpenCheck className="h-5 w-5" /></span>
          <span className="text-lg font-black tracking-tight text-slate-950">
            GCSE<span className="text-indigo-600">Revise</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100",
                pathname.startsWith(link.href)
                  ? "text-indigo-600"
                  : "text-slate-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/subjects">
            <Button size="sm" className="rounded-lg bg-indigo-600">Start revising</Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-slate-200" />
            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full">Log in</Button>
            </Link>
            <Link href="/subjects" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">Start revising</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
