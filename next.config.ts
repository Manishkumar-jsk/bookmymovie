import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['m.media-amazon.com','images.pexels.com','image.tmdb.org'],
  },
};

export default nextConfig;
