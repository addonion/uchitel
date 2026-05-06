import BuilderDevTools from "@builder.io/dev-tools/next";

const isProd = process.env.NODE_ENV === "production";
const DEFAULT_BUILDER_CDN_HOST = "https://cdn.uchitel.ru";
const DEFAULT_BUILDER_API_HOST = "https://api.uchitel.ru";

const getHostname = (url) => new URL(url).hostname;
const builderCdnProxyHostname = getHostname(
  process.env.NEXT_PUBLIC_BUILDER_CDN_HOST || DEFAULT_BUILDER_CDN_HOST,
);
const builderApiProxyHostname = getHostname(
  process.env.NEXT_PUBLIC_BUILDER_API_HOST || DEFAULT_BUILDER_API_HOST,
);

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_DOMAIN : undefined,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [{ type: "host", value: builderCdnProxyHostname }],
          destination: "https://cdn.builder.io/:path*",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: builderApiProxyHostname }],
          destination: "https://api.builder.io/:path*",
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uchitel.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: builderCdnProxyHostname,
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
  turbopack: {},
});

export default nextConfig;
