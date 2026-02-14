import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "HeartScript",
  description: "Romantic algorithms and fun love tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-romantic-background min-h-screen text-romantic-dark">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-md shadow-sm">
          <Link
            href="/"
            className="text-2xl font-serif text-romantic-primary"
          >
            💖 HeartScript
          </Link>

          <Link
            href="/"
            className="bg-romantic-primary text-white px-4 py-2 rounded-full hover:scale-105 transition"
          >
            Home
          </Link>
        </nav>

        {/* Floating Hearts Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl">💗</div>
          <div className="absolute bottom-20 right-20 text-6xl">💖</div>
        </div>

        {/* Page Content */}
        <main className="relative z-10 px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
