import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Werken bij Kaap Noord",
  description: "Kom je een dagje meelopen in ons team op het mooiste eiland? Werken bij Strandpaviljoen Kaap Noord op Texel.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
