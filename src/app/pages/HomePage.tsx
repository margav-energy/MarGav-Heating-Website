import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Hero } from '../components/Hero';
import { FinanceBanner } from '../components/FinanceBanner';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Trust } from '../components/Trust';
import { CTA } from '../components/CTA';
import { Testimonials } from '../components/Testimonials';
import { Partners } from '../components/Partners';
import { Contact } from '../components/Contact';
import { FAQ } from '../components/FAQ';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [location]);

  return (
    <>
      <Hero />
      <FinanceBanner />
      <About />
      <Services />
      <Trust />
      <CTA />
      <Testimonials />
      <Partners />
      <Contact />
      <FAQ />
    </>
  );
}
