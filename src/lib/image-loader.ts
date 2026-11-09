"use client";
import type { ImageLoaderProps } from "next/image";
import manifest from "./image-manifest.json";

export default function imageLoader({ src, width }: ImageLoaderProps) {
  const image = manifest[src as keyof typeof manifest];
  if (!image) return src;
  const selectedWidth =
    image.widths.find((candidate) => candidate >= width) ||
    image.widths[image.widths.length - 1];
  return `/assets/optimized/${image.hash}-${selectedWidth}.webp`;
}
