import React from 'react';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';
const logo = new URL('../../assets/MarGav Intergas logo.svg', import.meta.url).href;
const phoneHref = 'tel:+441889256069';
const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env;
const PRIVACY_POLICY_URL = env.VITE_PRIVACY_POLICY_URL || '#';
const COOKIE_POLICY_URL = env.VITE_COOKIE_POLICY_URL || '#';
const TERMS_URL = env.VITE_TERMS_URL || '#';

export function Footer() {
  return (
    <footer className="bg-[#26282c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr] mb-10">
          <div>
            <div className="mb-4">
              <img src={logo} alt="MarGav Heating logo" className="w-[220px] h-auto object-contain" />
            </div>
            <p className="text-white/70 mb-6 max-w-sm text-sm leading-relaxed">
              Transforming UK properties of all types into energy-efficient, sustainable homes through expert consultancy and professional installation services.
            </p>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#3333cc] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Unit 7-8, Kimberley Business Park, Kimberley Way, Rugeley WS15 1RE</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#3333cc] flex-shrink-0 mt-0.5" />
                <a href={phoneHref} className="text-sm hover:text-[#3333cc] transition-colors">
                  01889 256069
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#3333cc] flex-shrink-0 mt-0.5" />
                <a href="mailto:sales@margav.energy" className="text-sm hover:text-[#3333cc] transition-colors">
                  sales@margav.energy
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-[#3333cc] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Gas Safe Registered &amp; MCS Accredited</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-1.5 text-white/75 text-sm">
              <li><a href="#home" className="hover:text-[#3333cc] transition-colors">HOME</a></li>
              <li><a href="#about" className="hover:text-[#3333cc] transition-colors">ABOUT</a></li>
              <li><a href="#services" className="hover:text-[#3333cc] transition-colors">SERVICES</a></li>
              <li><a href="#projects" className="hover:text-[#3333cc] transition-colors">PROJECTS</a></li>
              <li><a href="#contact" className="hover:text-[#3333cc] transition-colors">CONTACT</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-4 max-w-sm">
              Subscribe to our newsletter for energy efficiency tips and updates.
            </p>
            <div className="space-y-2.5 mb-7 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/8 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3333cc]"
              />
              <button
                type="button"
                className="w-full rounded-md bg-[#3333cc] text-white font-semibold py-2.5 text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
            <p className="text-white/55 text-xs md:text-sm">
              © 2026 MarGav Heating. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-white/55">
              <a href={PRIVACY_POLICY_URL} className="hover:text-[#3333cc] transition-colors">Privacy Policy</a>
              <a href={TERMS_URL} className="hover:text-[#3333cc] transition-colors">Terms of Service</a>
              <a href={COOKIE_POLICY_URL} className="hover:text-[#3333cc] transition-colors">Cookie Policy</a>
              <a href="#" className="termly-display-preferences hover:text-[#3333cc] transition-colors">Consent Preferences</a>
            </div>
          </div>
          <p className="text-white/45 text-xs">
            MarGav Heating is a trading style of Margav Renewables Ltd
          </p>
          <p className="text-white/45 text-xs">
            Margav Renewables Ltd | Company Number: 12580649 | Registered in England & Wales
          </p>
        </div>
      </div>
    </footer>
  );
}
