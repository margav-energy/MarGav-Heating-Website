import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FinanceBanner } from './components/FinanceBanner';
import { About } from './components/About';
import { Services } from './components/Services';
import { Trust } from './components/Trust';
import { CTA } from './components/CTA';
import { Testimonials } from './components/Testimonials';
import { Partners } from './components/Partners';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ConsentManager } from './components/ConsentManager';

export default function App() {
  return (
    <div className="min-h-screen">
      <ConsentManager />
      <Header />
      <FinanceBanner />
      <Hero />
      <About />
      <Services />
      <Trust />
      <CTA />
      <Testimonials />
      <Partners />
      <Contact />
      <FAQ />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}