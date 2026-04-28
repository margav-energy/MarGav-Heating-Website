import { Phone } from "lucide-react";
import React from "react";

const ctaImage = new URL("../../assets/upgrade_now.png", import.meta.url).href;

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] backdrop-blur-xl border border-white/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={ctaImage}
              alt="Comfortable modern home"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="block whitespace-nowrap">
                UPGRADE YOUR HOME NOW
              </span>
              <span className="whitespace-nowrap">
                <span className="text-[#3333cc]">QUICKLY</span> AND{" "}
                <span className="text-[#3333cc]">EFFORTLESSLY</span>
              </span>
            </h2>

            <p className="text-white/80 text-lg mb-8">
              Transform your home with expert heating solutions, modern
              technology, and top-quality installations.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button className="bg-[#3333cc] text-white px-8 py-4 rounded-full text-lg hover:shadow-2xl transition-all">
                GET A FREE QUOTE →
              </button>
            </div>

            <div className="flex items-center gap-4 text-white">
              <Phone className="w-6 h-6 text-[#3333cc]" />
              <div>
                <div className="text-2xl font-bold">01889 256069</div>
                <div className="text-white/60">Support when you need us</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
