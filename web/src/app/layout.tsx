import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
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
          <Header />
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
