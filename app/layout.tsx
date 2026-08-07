import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sreekkuttan & Athira — Wedding Invitation",
  description:
    "You are warmly invited to the wedding of Sreekkuttan and Athira on 13 September 2026.",
  openGraph: {
    title: "Sreekkuttan & Athira — Wedding Invitation",
    description:
      "Join us on Sunday, 13 September 2026 at Guruvayur Sreekrishna Temple.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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