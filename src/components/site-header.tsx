"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Menu, Scissors } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { business, getBookingUrl } from "@/lib/site-data";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 16));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner page-frame">
        <Link href="#inicio" className="brand-lockup" aria-label="Barbearia Queiroz — início">
          <span className="brand-symbol" aria-hidden="true"><Scissors size={18} strokeWidth={1.4} /></span>
          <span className="brand-copy">
            <span className="brand-name">Barbearia Queiroz</span>
            <span className="brand-location">Centro</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>

        <div className="header-actions">
          <Button asChild className="button-brand header-booking">
            <a href={getBookingUrl()} target="_blank" rel="noreferrer">Agendar horário</a>
          </Button>
          <Button asChild className="button-brand mobile-header-booking">
            <a href={getBookingUrl()} target="_blank" rel="noreferrer">Agendar</a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mobile-menu-trigger" aria-label="Abrir menu">
                <Menu size={21} strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-sheet">
              <div className="mobile-sheet-heading">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>{business.shortName} · Centro</SheetDescription>
              </div>
              <nav className="mobile-nav" aria-label="Navegação móvel">
                {navItems.map((item, index) => (
                  <motion.div
                    className="mobile-nav-item"
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.46,
                      delay: reduceMotion ? 0 : index * 0.065,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ "--nav-delay": `${index * 65}ms` } as CSSProperties}
                  >
                    <SheetClose asChild>
                      <Link className="mobile-nav-link" href={item.href}>{item.label}</Link>
                    </SheetClose>
                  </motion.div>
                ))}
              </nav>
              <Button asChild className="button-brand mobile-booking">
                <a href={getBookingUrl()} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
