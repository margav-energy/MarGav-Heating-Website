import React from 'react';

const partnerLogos = [
  { name: 'Ideal', src: '/src/assets/ideal.svg' },
  { name: 'Intergas', src: '/src/assets/Intergas logo.webp' },
  { name: 'MCS', src: '/src/assets/mcs.webp' },
  { name: 'Vaillant', src: '/src/assets/vaillant-boiler-logo.png' },
  { name: 'Worcester Bosch', src: '/src/assets/worcester-bosch.png' },
  { name: 'Gas Safe Registered', src: '/src/assets/Gas Safe Registered.png' },
];

export function Partners() {
  const scrollingLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <style>
        {`
          @keyframes partners-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Partners & Accreditations</p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex items-center w-max gap-10 sm:gap-14"
            style={{ animation: 'partners-marquee 28s linear infinite' }}
          >
            {scrollingLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="h-12 sm:h-14 w-28 sm:w-36 flex items-center justify-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
