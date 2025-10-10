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
        <div
          className={`fixed inset-0 -z-10 bg-gradient-to-b from-sky-400 via-blue-600 to-blue-900 animate-gradient`}
        />

        {/* 🌈 Navbar */}
        <nav className="fixed top-0 left-0 z-50 w-full border-b shadow-sm bg-black/40 backdrop-blur-md border-white/10">
          <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
            <Link href="/" className="text-2xl font-bold tracking-wide">
              🌦️ Weather Snapshot Vercel Test
            </Link>
            <div className="space-x-6 text-sm font-medium">
              <Link href="/" className="transition hover:text-yellow-300">
                Home
              </Link>
              <Link href="/about" className="transition hover:text-yellow-300">
                About
              </Link>
              <Link
                href="/contact"
                className="transition hover:text-yellow-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* 🌍 Main Page Content */}
        <main className="pt-24 pb-10">{children}</main>

        {/* ⚡ Footer */}
        <footer className="py-6 text-sm text-center border-t text-white/70 border-white/10 bg-black/40 backdrop-blur-md">
          <p>
            © {new Date().getFullYear()} Weather Snapshot — All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
