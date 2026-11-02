import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, MapPin, Phone, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoFrame } from "@/components/photo-frame";
import { PhotoGallery } from "@/components/photo-gallery";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { business, getBookingUrl, localBusinessJsonLd, openingHours, photoAssets, videoAssets } from "@/lib/site-data";

function photoExists(file: string) {
  return existsSync(join(process.cwd(), "public", "images", file));
}

export default function Home() {
  const photos = photoAssets.map((photo) => ({ ...photo, available: photoExists(photo.file) }));
  const heroPhotoAvailable = photoExists("interior.jpg");
  const letreiroPhotoAvailable = photoExists("letreiro.jpg");
  const cutPhotoAvailable = photoExists("corte-01.jpg");
  const teamPhotoAvailable = photoExists("equipe.jpg");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo">
        <section className="hero-section page-frame" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Reveal>
              <h1 id="hero-title">Seu estilo.<br /><span>Sua identidade.</span></h1>
              <p className="hero-intro">Barbearia Queiroz no Centro de Limoeiro do Norte. Mais que um corte, uma experiência de cuidado, estilo e personalidade.</p>
              <div className="hero-actions">
                <Button asChild className="button-brand button-large">
                  <a href={getBookingUrl()} target="_blank" rel="noreferrer">Agendar horário <ArrowUpRight size={17} /></a>
                </Button>
                <Link className="text-link" href="#sobre">Conhecer a barbearia <ArrowDown size={16} /></Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-visual" delay={0.12}>
            <PhotoFrame
              src="/images/interior.jpg"
              name="Interior da Barbearia Queiroz"
              available={heroPhotoAvailable}
              className="hero-photo"
              sizes="(max-width: 768px) 100vw, 49vw"
              priority={heroPhotoAvailable}
            />
            <div className="hero-photo-note"><span>Barbearia Queiroz</span><span>Centro</span></div>
          </Reveal>
          <div className="hero-bottom-line" aria-hidden="true"><span>Estilo com identidade</span><span>Agende seu horário <ArrowDown size={14} /></span></div>
        </section>

        <section className="about-section page-frame section-pad" id="sobre" aria-labelledby="about-title">
          <Reveal className="about-copy">
            <h2 id="about-title">Cuidado <em>e estilo.</em></h2>
            <p className="section-lead">A Barbearia Queiroz fica no Centro de Limoeiro do Norte. Consulte horários e combine seu próximo corte pelo WhatsApp.</p>
            <Link className="text-link" href="#localizacao">Ver localização <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal className="about-visual" delay={0.12}>
            <PhotoFrame
              src="/images/letreiro.jpg"
              name="Letreiro da Barbearia Queiroz"
              available={letreiroPhotoAvailable}
              className="about-photo"
              sizes="(max-width: 768px) 100vw, 44vw"
            />
            <span className="visual-caption">Um espaço para o seu próximo corte</span>
          </Reveal>
        </section>

        <section className="services-section page-frame section-pad" id="servicos" aria-labelledby="services-title">
          <div className="section-heading-row">
            <Reveal>
              <h2 id="services-title">Seu próximo corte.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="section-side-note">Consulte horários e disponibilidade pelo WhatsApp.</p>
            </Reveal>
          </div>
          <div className="service-feature">
            <Reveal className="service-image-wrap">
              <PhotoFrame
                src="/images/corte-01.jpg"
                name="Corte de cabelo"
                available={cutPhotoAvailable}
                className="service-photo"
                sizes="(max-width: 768px) 100vw, 48vw"
              />
            </Reveal>
            <Reveal className="service-copy" delay={0.1}>
              <span className="service-number" aria-hidden="true"><Scissors size={22} strokeWidth={1.4} /></span>
              <h3>Corte de cabelo</h3>
              <p>Um corte pensado para o seu estilo. Fale com a barbearia para consultar horários.</p>
              <Button asChild variant="outline" className="button-outline">
                <a href={getBookingUrl("Olá! Gostaria de consultar horários para corte de cabelo.")} target="_blank" rel="noreferrer">Consultar disponibilidade <ArrowUpRight size={16} /></a>
              </Button>
            </Reveal>
          </div>
        </section>

        <section className="gallery-section section-pad" id="galeria" aria-labelledby="gallery-title">
          <div className="page-frame gallery-heading">
            <Reveal>
              <h2 id="gallery-title">A barbearia, de perto.</h2>
              <p className="section-lead gallery-lead">Fotos e vídeos do espaço, da equipe e dos cortes da Barbearia Queiroz.</p>
            </Reveal>
          </div>
          <div className="page-frame">
            <PhotoGallery photos={photos} videos={videoAssets} />
          </div>
        </section>

        <section className="location-section page-frame section-pad" id="localizacao" aria-labelledby="location-title">
          <Reveal className="location-copy">
            <h2 id="location-title">No Centro.</h2>
            <address className="location-address">
              <MapPin size={18} strokeWidth={1.4} />
              <span>{business.address}<br />{business.city}</span>
            </address>
            <div className="hours-block">
              <h3><Clock3 size={17} strokeWidth={1.5} /> Horários</h3>
              <dl>
                {openingHours.map((item) => (
                  <div className="hours-row" key={item.day}>
                    <dt>{item.day}</dt><dd>{item.hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="hours-note">Os horários podem mudar em feriados. Confirme ao agendar.</p>
            </div>
            <div className="location-actions">
              <Button asChild className="button-brand">
                <a href={business.mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowUpRight size={16} /></a>
              </Button>
              <a className="phone-link" href={`tel:${business.phoneInternational}`}><Phone size={16} /> {business.phoneDisplay}</a>
            </div>
          </Reveal>
          <Reveal className="map-wrap" delay={0.12}>
            <iframe
              title="Mapa da Barbearia Queiroz no Centro de Limoeiro do Norte"
              src={`https://www.google.com/maps?q=${business.coordinates.latitude},${business.coordinates.longitude}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </section>

        <section className="booking-section page-frame" id="contato" aria-labelledby="booking-title">
          <Reveal className="booking-copy">
            <h2 id="booking-title">Seu próximo<br /><em>visual.</em></h2>
            <p>Entre em contato e agende seu horário.</p>
            <Button asChild className="button-brand button-large">
              <a href={getBookingUrl()} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowUpRight size={17} /></a>
            </Button>
            <a className="booking-phone" href={`tel:${business.phoneInternational}`}>Ou ligue {business.phoneDisplay}</a>
          </Reveal>
          <Reveal className="booking-visual" delay={0.12}>
            <PhotoFrame
              src="/images/equipe.jpg"
              name="Equipe e clientes em atendimento"
              available={teamPhotoAvailable}
              className="booking-photo"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-frame footer-grid">
          <div className="footer-brand">
            <Link href="#inicio" className="footer-name">Barbearia Queiroz</Link>
            <p>{business.address}<br />{business.city}</p>
          </div>
          <div className="footer-column">
            <h2>Visite</h2>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={14} /></a>
            <a href={`tel:${business.phoneInternational}`}>{business.phoneDisplay}</a>
          </div>
          <div className="footer-column">
            <h2>Navegue</h2>
            <Link href="#sobre">Sobre</Link>
            <Link href="#servicos">Serviços</Link>
            <Link href="#galeria">Galeria</Link>
          </div>
          <div className="footer-column">
            <h2>Horários</h2>
            <p>Seg–sex · 09h–12h · <span className="footer-hours-time">14h–20h</span></p>
            <p>Sáb · 08h–12h · <span className="footer-hours-time">14h–19h</span></p>
            <p>Dom · fechado</p>
          </div>
        </div>
        <div className="page-frame footer-bottom">
          <span className="footer-wordmark">QUEIROZ</span>
          <div className="footer-legal"><span>© {new Date().getFullYear()} Barbearia Queiroz</span><a href={business.mapsUrl} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={13} /></a></div>
        </div>
      </footer>
    </>
  );
}
