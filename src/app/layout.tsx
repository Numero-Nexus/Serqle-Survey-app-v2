import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serqle.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Serqle Behavioural Survey | Free Time Behaviour Research",
  description:
    "Take part in a short behavioural research study exploring how people naturally make leisure and free-time decisions. Anonymous participation. Around 3 minutes.",
  keywords: [
    "behavioural research",
    "psychology survey",
    "free time behaviour study",
    "leisure decision research",
    "anonymous research participation",
  ],
  authors: [{ name: "Serqle Research Team" }],
  creator: "Serqle",
  publisher: "Serqle",
  applicationName: "Serqle Behavioural Survey",
  category: "Research",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Serqle Behavioural Survey | Free Time Behaviour Research",
    description:
      "Take part in a short behavioural research study exploring how people naturally make leisure and free-time decisions. Anonymous participation. Around 3 minutes.",
    url: siteUrl,
    siteName: "Serqle Behavioural Survey",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serqle Behavioural Survey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serqle Behavioural Survey | Free Time Behaviour Research",
    description:
      "Take part in a short behavioural research study exploring how people naturally make leisure and free-time decisions. Anonymous participation. Around 3 minutes.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1210" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Serqle Behavioural Survey",
              url: siteUrl,
              description:
                "A short behavioural research study exploring how people naturally make leisure and free-time decisions.",
              publisher: {
                "@type": "Organization",
                name: "Serqle",
              },
              inLanguage: "en",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Serqle Behavioural Survey",
              url: siteUrl,
              applicationCategory: "ResearchApplication",
              operatingSystem: "Any",
            }),
          }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
