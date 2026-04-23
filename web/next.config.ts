import type { NextConfig } from "next";
import path from "node:path";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const { protocol, hostname, port } = new URL(strapiUrl);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        port: port || undefined,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
