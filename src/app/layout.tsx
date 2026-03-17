import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { TRPCReactProvider } from "@/src/trpc/client";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Resonance - AI Playground",
    template: "%s | Resonance - AI Playground",
  },
  description:
    "Resonance is an AI playground built using Next.js, tRPC, and Tailwind CSS. It offers a collection of AI tools and demos, including text generation, image generation, and more. Explore the capabilities of AI in an interactive and user-friendly environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <TooltipProvider>
          <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
            <body>{children}</body>
          </html>
          <Toaster />
        </TooltipProvider>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
