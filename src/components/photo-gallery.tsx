"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type GalleryPhoto = {
  src: string;
  name: string;
  file: string;
  aspect: string;
  available: boolean;
};

type GalleryVideo = {
  src: string;
  poster: string;
  title: string;
  aspect?: string;
};

type GalleryItem =
  | { kind: "photo"; photo: GalleryPhoto; position: number }
  | { kind: "video"; video: GalleryVideo; position: number };

function GalleryVideoTile({ video, position }: { video: GalleryVideo; position: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    if (isInView && !reduceMotion) {
      void element.play().catch(() => {
        // O poster continua visível quando o navegador bloqueia a reprodução.
      });
    } else {
      element.pause();
    }
  }, [isInView, reduceMotion]);

  return (
    <motion.figure
      className={`gallery-item gallery-video-item gallery-item-${position} ${video.aspect ?? "portrait"}`}
      role="group"
      aria-label={`${video.title}, vídeo em loop sem áudio`}
      data-reveal
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: Math.min(position * 0.055, 0.28) }}
    >
      <span className="gallery-media">
        <video
          ref={videoRef}
          className="gallery-video"
          muted
          loop
          playsInline
          preload="none"
          poster={video.poster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </span>
      <figcaption className="gallery-caption">{video.title}</figcaption>
    </motion.figure>
  );
}

export function PhotoGallery({ photos, videos }: { photos: GalleryPhoto[]; videos: readonly GalleryVideo[] }) {
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);
  const reduceMotion = useReducedMotion();
  const items: GalleryItem[] = [];

  photos.forEach((photo, index) => {
    items.push({ kind: "photo", photo, position: items.length + 1 });
    if (index === 2 && videos[0]) items.push({ kind: "video", video: videos[0], position: items.length + 1 });
    if (index === 5 && videos[1]) items.push({ kind: "video", video: videos[1], position: items.length + 1 });
    if (index === 6 && videos[2]) items.push({ kind: "video", video: videos[2], position: items.length + 1 });
  });

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => {
          if (item.kind === "video") {
            return <GalleryVideoTile key={item.video.src} video={item.video} position={item.position} />;
          }

          const { photo, position } = item;
          return (
            <motion.button
              key={photo.file}
              type="button"
              className={`gallery-item gallery-item-${position} ${photo.aspect}`}
              data-reveal
              onClick={() => setSelected(photo)}
              aria-label={`Ampliar ${photo.name}${photo.available ? "" : " — espaço reservado"}`}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: Math.min(position * 0.055, 0.28) }}
              whileHover={reduceMotion ? undefined : { scale: 1.012 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              <span className="gallery-media">
                {photo.available ? (
                  <Image
                    src={photo.src}
                    alt={photo.name}
                    fill
                    sizes="(max-width: 720px) 88vw, (max-width: 1100px) 46vw, 34vw"
                    className="gallery-image"
                  />
                ) : (
                  <span className="photo-placeholder" aria-hidden="true">
                    <span className="placeholder-mark"><ImageIcon size={19} strokeWidth={1.2} /></span>
                    <span className="placeholder-title">{photo.name}</span>
                    <span className="placeholder-detail">{photo.file}</span>
                  </span>
                )}
                <span className="gallery-expand" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
              </span>
              <span className="gallery-caption">{photo.name}</span>
            </motion.button>
          );
        })}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="gallery-dialog">
          <DialogTitle className="sr-only">{selected?.name ?? "Foto da barbearia"}</DialogTitle>
          <DialogDescription className="sr-only">
            {selected?.available ? `Fotografia: ${selected.name}` : `Espaço reservado para ${selected?.file ?? "uma fotografia"}.`}
          </DialogDescription>
          {selected && (
            <div className="dialog-photo-wrap">
              {selected.available ? (
                <Image src={selected.src} alt={selected.name} fill sizes="90vw" className="dialog-photo" />
              ) : (
                <div className="photo-placeholder dialog-placeholder" role="img" aria-label={`Espaço reservado para fotografia: ${selected.name}`}>
                  <span className="placeholder-mark" aria-hidden="true"><ImageIcon size={24} strokeWidth={1.2} /></span>
                  <span className="placeholder-title">{selected.name}</span>
                  <span className="placeholder-detail">Adicione {selected.file} em public/images/</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
