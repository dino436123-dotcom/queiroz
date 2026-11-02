import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Barbearia Queiroz (Centro) | Limoeiro do Norte, CE";
const description = "Barbearia Queiroz no Centro de Limoeiro do Norte. Consulte horários e agende seu próximo corte pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  applicationName: "Barbearia Queiroz",
  keywords: ["Barbearia Queiroz", "barbearia no Centro", "Limoeiro do Norte", "corte masculino"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title,
    description,
    siteName: "Barbearia Queiroz",
    images: [{ url: "/images/interior.jpg", alt: "Interior da Barbearia Queiroz" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/interior.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>{children}</body>
    </html>
  );
}
