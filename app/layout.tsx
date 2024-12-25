import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kürek Takımı",
  description: "Kürek Takımı Yönetim Sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
