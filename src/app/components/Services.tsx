import React from 'react';
import { Flame, Wind } from 'lucide-react';

const boilerInstallationImage = new URL('../../assets/boiler_installation.png', import.meta.url).href;
const heatPumpSolutionsImage = new URL('../../assets/heat_pump_solutions.png', import.meta.url).href;

export function Services() {
  const services = [
    {
      icon: Flame,
      title: "BOILER INSTALLATIONS",
      description:
        "Complete boiler installation and replacement with industry-leading brands and energy-efficient models.",
      image: boilerInstallationImage,
    },
    {
      icon: Wind,
      title: "HEAT PUMP SOLUTIONS",
      description:
        "Modern air-source heat pumps for sustainable, renewable heating. Future-proof your home.",
      image:
        heatPumpSolutionsImage,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            EXPERT HEATING<br />
            SERVICES <span className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] bg-clip-text text-transparent">DELIVERED</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="w-8 h-8 text-[#33CC66]" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#3333cc] mb-2">500+</div>
            <div className="text-gray-600">Homes Heated</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#3333cc] mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#3333cc] mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#3333cc] mb-2">Fast</div>
            <div className="text-gray-600">Emergency Response</div>
          </div>
        </div>
      </div>
    </section>
  );
}
