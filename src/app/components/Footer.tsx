import React from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
const logo = new URL('../../assets/margav_heating_logo.png', import.meta.url).href;
const phoneHref = 'tel:+441889256069';
const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env;
const PRIVACY_POLICY_URL = env.VITE_PRIVACY_POLICY_URL || '#';
const COOKIE_POLICY_URL = env.VITE_COOKIE_POLICY_URL || '#';
const TERMS_URL = env.VITE_TERMS_URL || '#';

export function Footer() {
  return (
    <footer className="bg-[#1f1f22] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-12 lg:grid-cols-3 mb-12">
          <div>
            <div className="mb-5">
              <img src={logo} alt="MarGav Heating logo" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Transforming UK properties of all types into energy-efficient, sustainable homes through expert consultancy and professional installation services.
            </p>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ef4f95] flex-shrink-0 mt-1" />
                <span className="text-sm">Unit 7-8, Kimberley Business Park, Kimberley Way, Rugeley WS15 1RE</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#ef4f95] flex-shrink-0 mt-1" />
                <a href={phoneHref} className="text-sm hover:text-[#33CC66] transition-colors">
                  01889 256069
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#ef4f95] flex-shrink-0 mt-1" />
                <a href="mailto:sales@margav.energy" className="text-sm hover:text-[#33CC66] transition-colors">
                  sales@margav.energy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-2 text-white/75 text-sm">
              <li><a href="#home" className="hover:text-[#33CC66] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#33CC66] transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-[#33CC66] transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-[#33CC66] transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-[#33CC66] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-4 max-w-sm">
              Subscribe to our newsletter for energy efficiency tips and updates.
            </p>
            <div className="space-y-3 mb-8 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#33CC66]"
              />
              <button
                type="button"
                className="w-full rounded-md bg-gradient-to-r from-[#66CC66] to-[#00CC99] text-white font-semibold py-2.5 text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-2.5">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-white/55 text-sm">
            © 2026 MarGav Heating. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-white/55">
            <a href={PRIVACY_POLICY_URL} className="hover:text-[#33CC66] transition-colors">Privacy Policy</a>
            <a href={COOKIE_POLICY_URL} className="hover:text-[#33CC66] transition-colors">Cookie Policy</a>
            <a href={TERMS_URL} className="hover:text-[#33CC66] transition-colors">Terms</a>
            <a href="#" className="termly-display-preferences hover:text-[#33CC66] transition-colors">Consent Preferences</a>
          </div>
          <p className="text-white/55 text-xs md:text-sm">
            MarGav Heating is a trading style of Margav Renewables Ltd
          </p>
          <p className="text-white/55 text-xs md:text-sm text-left md:text-right">
            Margav Renewables Ltd | Company Number: 12580649 | Registered in England & Wales
          </p>
        </div>
      </div>
    </footer>
  );
}
