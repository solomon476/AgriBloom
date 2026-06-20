"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Determine if we are in the "app" area vs the "marketing/auth" area
  const isAppArea = pathname !== "/" && pathname !== "/auth/signin";

  return (
    <header className="w-full py-4 px-8 flex justify-between items-center border-b border-primary/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <Link href={isAppArea ? "/dashboard" : "/"} className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="AgriBloom Logo"
          width={44}
          height={44}
          className="object-contain"
        />
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Agri<span className="text-secondary">Bloom</span>
        </h1>
      </Link>

      {isAppArea ? (
        // Authenticated Navigation
        <>
          <nav className="hidden md:flex gap-6 font-medium text-sm">
            <Link href="/dashboard" className={`hover:text-accent transition-colors ${pathname === '/dashboard' ? 'text-accent font-bold' : 'text-primary'}`}>Dashboard</Link>
            <Link href="/farms" className={`hover:text-accent transition-colors ${pathname === '/farms' ? 'text-accent font-bold' : 'text-primary'}`}>Farms</Link>
            <Link href="/reports" className={`hover:text-accent transition-colors ${pathname === '/reports' ? 'text-accent font-bold' : 'text-primary'}`}>Reports</Link>
          </nav>
          <Link href="/" className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2 rounded-full font-medium transition-all shadow-sm border border-red-200 inline-block text-center">
            Sign Out
          </Link>
        </>
      ) : (
        // Public Navigation
        <Link href="/auth/signin" className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-center">
          Sign In
        </Link>
      )}
    </header>
  );
}
