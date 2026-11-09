import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [320, 480, 640, 960, 1280],
    imageSizes: [48, 64, 96, 160],
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return [
            {
              source: "/api/enquiry/key/",
              destination: "http://127.0.0.1:8787/api/enquiry/key",
            },
            {
              source: "/api/enquiry/",
              destination: "http://127.0.0.1:8787/api/enquiry",
            },
          ];
        },
      }
    : {}),
};
export default nextConfig;
