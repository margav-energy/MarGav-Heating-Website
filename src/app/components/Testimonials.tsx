import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote:
        'MarGav transformed our heating system with a new heat pump. The installation was professional, on-time, and the house has never been warmer. Highly recommend their expertise!',
      name: 'Sarah Mitchell',
      role: 'Homeowner',
    },
    {
      quote:
        'Outstanding service from start to finish. They replaced our old boiler with an energy-efficient model that cut our bills significantly. Professional team who take pride in their work.',
      name: 'James Harrison',
      role: 'Property Manager',
    },
    {
      quote:
        'Called them for urgent support and they arrived within 2 hours. Solved the issue quickly and explained everything clearly. Will definitely use them again for servicing.',
      name: 'Emily Davidson',
      role: 'Homeowner',
    },
    {
      quote:
        "MarGav transformed our home heating completely. Their team was professional, on time, and the heat pump installation was flawless. Our energy bills dropped by 60% - couldn't be happier!",
      name: 'Sarah Henderson',
      role: 'Homeowner, Bristol',
    },
    {
      quote:
        'From the first survey to final commissioning, everything was transparent. The written quote matched exactly what we paid. That level of honesty is rare in the trade.',
      name: 'James Clarke',
      role: 'Property Developer',
    },
    {
      quote:
        'Emergency boiler replacement on a freezing January evening. They had us warm again by the next afternoon. Absolutely brilliant service and a genuinely lovely team.',
      name: 'Margaret Ellis',
      role: 'Homeowner, Bath',
    },
  ];
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((value) => (value + 1) % testimonials.length);
  const prev = () => setCurrent((value) => (value - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#33CC66] mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            What Our <span className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] bg-clip-text text-transparent">Clients</span> Say
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-8 lg:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="text-5xl lg:text-6xl font-bold text-[#3333cc] tracking-tight">500+</div>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Hear directly from homeowners who trusted us to transform their heating with quality and precision.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 p-8 lg:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#f6c453] text-[#f6c453]" />
                ))}
              </div>
              <blockquote className="text-lg lg:text-xl font-semibold text-gray-900 leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#33CC66]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#33CC66]">{testimonials[current].name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonials[current].name}</p>
                  <p className="text-xs text-gray-500">{testimonials[current].role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
