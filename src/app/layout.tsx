import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karaoke App",
  description: "A collaborative karaoke MVP for rooms, queues, and synced lyrics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
