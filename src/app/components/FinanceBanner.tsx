import React from 'react';
import { BadgeAlert } from 'lucide-react';

export function FinanceBanner() {
  return (
    <section className="bg-gray-950 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-white/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <BadgeAlert className="w-4 h-4 text-[#33CC66] flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm">
            Finance options are available to help spread the cost of your installation. Subject to status, terms and conditions apply.
          </p>
        </div>
      </div>
    </section>
  );
}
