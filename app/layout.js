import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SivaPriya R | Full Stack Developer Portfolio",
  description: "Explore the portfolio of SivaPriya R – a creative and detail-oriented full stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
        
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"
          strategy="afterInteractive"
        />
        
        <Script id="aos-init" strategy="afterInteractive">
          {`
            (function initializeAOS() {
              if (typeof AOS !== 'undefined') {
                AOS.init({
                  once: true,
                  duration: 800,
                  easing: 'ease-out'
                });
              } else {
                // If AOS isn't ready, wait a bit and try again
                setTimeout(initializeAOS, 50);
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}