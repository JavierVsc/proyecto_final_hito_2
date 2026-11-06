import { useState } from 'react';

export function ProductImage({ src, alt, className = '' }) {
  const [error, setError] = useState(false);
  if (!src || error) return <div role="img" aria-label={alt} className={`imageFallback ${className}`}>Fotografía No Disponible</div>;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setError(true)} />;
}
