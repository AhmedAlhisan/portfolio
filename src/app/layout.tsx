import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Alhisan | AI Product Manager & Senior AI Engineer",
  description: "AI Product Manager & Senior AI Engineer with 7+ years of experience specializing in voice intelligence (ASR + LLMs), RAG pipelines, and agentic systems in Riyadh, Saudi Arabia. Building production-ready AI solutions with measurable business impact.",
  keywords: [
    "AI Product Manager",
    "AI Engineer",
    "Machine Learning",
    "RAG",
    "LLM",
    "Speech Recognition",
    "Whisper",
    "Saudi Arabia",
    "Riyadh",
    "Voice Intelligence",
    "Agentic Systems",
    "RLHF",
    "PyTorch",
    "Oracle Cloud"
  ],
  authors: [{ name: "Ahmed Alhisan", url: "https://linkedin.com/in/ahmedalhisan" }],
  creator: "Ahmed Alhisan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ahmed Alhisan | AI Product Manager & Senior AI Engineer",
    description: "Voice Intelligence (ASR + LLMs), RAG pipelines, and agentic systems — built for real-world deployment.",
    siteName: "Ahmed Alhisan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Alhisan | AI Product Manager & Senior AI Engineer",
    description: "Voice Intelligence (ASR + LLMs), RAG pipelines, and agentic systems — built for real-world deployment.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ahmed Alhisan",
    "jobTitle": "AI Product Manager & Senior AI Software Engineer",
    "description": "AI Product Manager & Senior AI Engineer specializing in voice intelligence, RAG pipelines, and agentic systems",
    "email": "alhisan.swe@gmail.com",
    "telephone": "+966535991010",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressCountry": "SA"
    },
    "sameAs": [
      "https://linkedin.com/in/ahmedalhisan"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "King Saud University"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Speech Recognition",
      "RAG",
      "LLM",
      "Product Management",
      "Software Engineering"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
