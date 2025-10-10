import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Weather Snapshot",
  description: "Dynamic weather app with animated backgrounds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen font-sans text-white">
        {/* 🌤️ Background Overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-400 via-blue-600 to-blue-900 animate-gradient" />

        {/* 🌈 Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md border-b border-white/10 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-wide">
              🌦️ Weather Snapshot
            </Link>
            <div className="space-x-6 text-sm font-medium">
              <Link href="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
              <Link href="/about" className="hover:text-yellow-300 transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-yellow-300 transition">
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* 🌍 Main Page Content */}
        <main className="pt-24 pb-10">{children}</main>

        {/* ⚡ Footer */}
        <footer className="text-center py-6 text-white/70 text-sm border-t border-white/10 bg-black/40 backdrop-blur-md">
          <p>© {new Date().getFullYear()} Weather Snapshot — All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
