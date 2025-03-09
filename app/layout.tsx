import { Onest } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import React from "react";

const onest = Onest({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-MQ7NWKC" />
      <body className={onest.className}>
        <React.StrictMode>
          {children}
          <ExternalScripts />
          <SpeedInsights />
        </React.StrictMode>
      </body>
    </html>
  );
}

const ExternalScripts = () => (
  <>
    <Script id="vk-1" strategy="lazyOnload">
      {`  ! function() {
        var t = document.createElement("script");
        t.type = "text/javascript", t.async = !0, t.src = "https://vk.com/js/api/openapi.js?160", t.onload = function() {
          VK.Retargeting.Init("VK-RTRG-354171-5b3ic"), VK.Retargeting.Hit()
        }, document.head.appendChild(t)
      }();`}
    </Script>
    <Script id="vk-2" strategy="lazyOnload">
      {`  ! function() {
        var t = document.createElement("script");
        t.type = "text/javascript", t.async = !0, t.src = "https://vk.com/js/api/openapi.js?167", t.onload = function() {
          VK.Retargeting.Init("VK-RTRG-460374-9m9vL"), VK.Retargeting.Hit()
        }, document.head.appendChild(t)
      }();`}
    </Script>
  </>
);
