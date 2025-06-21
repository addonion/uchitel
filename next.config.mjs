const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    reactCompiler: true,
  },
  serverExternalPackages: ["isolated-vm"],
};

export default nextConfig;
