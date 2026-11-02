export const business = {
  name: "Barbearia Queiroz (Centro)",
  shortName: "Barbearia Queiroz",
  address: "Rua Cel. Sindulfo Chaves, 1729, Centro",
  city: "Limoeiro do Norte, CE",
  postalCode: "62930-000",
  phoneDisplay: "(88) 99638-3958",
  phoneInternational: "+5588996383958",
  coordinates: {
    latitude: -5.151635,
    longitude: -38.1001992,
  },
  mapsUrl: "https://maps.app.goo.gl/g8Xu2jKm6EgTvN5P9",
  bookingMessage: "Olá! Gostaria de consultar horários para agendar um corte.",
} as const;

export const openingHours = [
  { day: "Segunda a sexta", hours: "09h–12h · 14h–20h" },
  { day: "Sábado", hours: "08h–12h · 14h–19h" },
  { day: "Domingo", hours: "Fechado" },
] as const;

export const photoAssets = [
  { src: "/images/entrada.jpg", name: "Entrada e letreiro", file: "entrada.jpg", aspect: "landscape" },
  { src: "/images/interior.jpg", name: "Interior", file: "interior.jpg", aspect: "portrait" },
  { src: "/images/corte-01.jpg", name: "Corte em andamento", file: "corte-01.jpg", aspect: "portrait" },
  { src: "/images/equipe.jpg", name: "Equipe e atendimento", file: "equipe.jpg", aspect: "landscape" },
  { src: "/images/produtos.jpg", name: "Produtos", file: "produtos.jpg", aspect: "square" },
  { src: "/images/area-espera.jpg", name: "Área de espera", file: "area-espera.jpg", aspect: "portrait" },
  { src: "/images/letreiro.jpg", name: "Letreiro Queiroz", file: "letreiro.jpg", aspect: "portrait" },
] as const;

export const videoAssets = [
  { src: "/videos/corte-em-andamento.mp4", poster: "/images/corte-01.jpg", title: "Corte em andamento" },
  { src: "/videos/detalhe-do-ambiente.mp4", poster: "/images/interior.jpg", title: "Detalhe do ambiente" },
  { src: "/videos/fachada-da-loja.mp4", poster: "/images/entrada.jpg", title: "Fachada da loja", aspect: "portrait-tall" },
] as const;

export function getBookingUrl(message: string = business.bookingMessage) {
  return `https://wa.me/${business.phoneInternational.slice(1)}?text=${encodeURIComponent(message)}`;
}

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: business.name,
  telephone: business.phoneInternational,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Cel. Sindulfo Chaves, 1729",
    addressLocality: "Limoeiro do Norte",
    addressRegion: "CE",
    postalCode: business.postalCode,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.coordinates.latitude,
    longitude: business.coordinates.longitude,
  },
  openingHoursSpecification: [
    ...["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].flatMap((dayOfWeek) => [
      { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${dayOfWeek}`, opens: "09:00", closes: "12:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${dayOfWeek}`, opens: "14:00", closes: "20:00" },
    ]),
    { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Saturday", opens: "08:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Saturday", opens: "14:00", closes: "19:00" },
  ],
  sameAs: [business.mapsUrl],
};
