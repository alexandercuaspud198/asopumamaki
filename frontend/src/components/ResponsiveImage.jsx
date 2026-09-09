import variants from '../data/imageVariants.json';

export default function ResponsiveImage({ src, alt, sizes = '100vw', width, height, ...props }) {
  const publicBase = `${process.env.PUBLIC_URL}/`;
  const localPath = src.startsWith(publicBase) ? src.slice(publicBase.length) : src;
  const versions = variants[localPath];

  // New photographs can still be used before their WebP variants are generated.
  if (!versions) return <img {...props} src={src} alt={alt} width={width} height={height} />;

  const full = versions[versions.length - 1];
  return (
    <img
      {...props}
      src={`${publicBase}${full.src}`}
      srcSet={versions.map(image => `${publicBase}${image.src} ${image.width}w`).join(', ')}
      sizes={sizes}
      width={width ?? full.width}
      height={height ?? full.height}
      alt={alt}
    />
  );
}
