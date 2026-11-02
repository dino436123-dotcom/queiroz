import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

export function PhotoFrame({
  src,
  name,
  available,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  name: string;
  available: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo-frame ${className}`}>
      {available ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={sizes}
          priority={priority}
          className="photo-frame-image"
        />
      ) : (
        <div className="photo-placeholder" role="img" aria-label={`Espaço reservado para fotografia: ${name}`}>
          <span className="placeholder-mark" aria-hidden="true"><ImageIcon size={22} strokeWidth={1.2} /></span>
          <span className="placeholder-title">{name}</span>
          <span className="placeholder-detail">Fotografia da barbearia</span>
        </div>
      )}
    </div>
  );
}
