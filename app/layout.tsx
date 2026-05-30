import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AuditLeadCapture } from "@/components/AuditLeadCapture";

export const metadata: Metadata = {
  title: "SubTracker - Smart Subscription Manager",
  description: "Track and manage your subscriptions, monitor spending, and get renewal reminders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <AuditLeadCapture />
      </body>
    </html>
  );
}
