import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AgriBloom | Farm Management Platform",
  description: "Digitize crop and livestock tracking, automate expense logging, and simplify profit analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <header className="w-full py-4 px-8 flex justify-between items-center border-b border-primary/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="AgriBloom Logo"
                width={44}
                height={44}
                className="object-contain"
              />
              <h1 className="text-2xl font-bold tracking-tight text-primary">Agri<span className="text-secondary">Bloom</span></h1>
            </div>
            <nav className="hidden md:flex gap-6 font-medium text-sm">
              <a href="#" className="text-primary hover:text-accent transition-colors">Dashboard</a>
              <a href="#" className="text-primary hover:text-accent transition-colors">Farms</a>
              <a href="#" className="text-primary hover:text-accent transition-colors">Reports</a>
            </nav>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Sign In
            </button>
          </header>
          <main className="flex-1 flex flex-col items-center justify-center p-8">
            {children}
          </main>
          <footer className="w-full py-6 text-center text-sm text-foreground/60 border-t border-primary/10 mt-auto">
            © {new Date().getFullYear()} AgriBloom. Empowering farmers.
          </footer>
        </div>
      </body>
    </html>
  );
}
