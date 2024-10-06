import BuilderDevTools from "@builder.io/dev-tools/next";

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_DOMAIN : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uchitel.ru",
        port: "",
        pathname: "**",
      },
    ],
  },
});

export default nextConfig;
