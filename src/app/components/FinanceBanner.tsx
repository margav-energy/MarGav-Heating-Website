import React from 'react';
import { BadgeAlert } from 'lucide-react';

export function FinanceBanner() {
  return (
    <section className="absolute top-24 left-0 right-0 z-40 bg-transparent py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-3 text-white/90 flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
          <BadgeAlert className="w-4 h-4 text-[#3333cc] flex-shrink-0" />
          <p className="text-sm whitespace-nowrap">
            Finance options are available to help spread the cost of your installation. Subject to status, terms and conditions apply.
          </p>
        </div>
      </div>
    </section>
  );
}
