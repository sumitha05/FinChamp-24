import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";


const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinChamp",
  description: "Generated by Tech Titans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={font.className}>
        <Toaster />
        <ExitModal/>
        <HeartsModal/>
        <PracticeModal/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
