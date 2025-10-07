import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div className="">{/* Navbar */}</div>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
