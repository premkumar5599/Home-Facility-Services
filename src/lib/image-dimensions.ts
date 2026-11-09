import manifest from "./image-manifest.json";

export function imageDimensions(src: string) {
  const image = manifest[src as keyof typeof manifest];
  return image
    ? { width: image.width, height: image.height }
    : { width: 160, height: 100 };
}
