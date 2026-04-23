import { Users, ThumbsUp, Award, Shield } from 'lucide-react';
import React from 'react';

export function Trust() {
  const features = [
    {
      icon: Users,
      title: 'EXPERT TEAM',
      description: 'Highly experienced and certified heating engineers who prioritize quality.',
      image: 'https://images.unsplash.com/photo-1605556786938-d7581f7e477a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxoZWF0aW5nJTIwZW5naW5lZXIlMjBib2lsZXIlMjBpbnN0YWxsYXRpb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc2OTMzMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: Award,
      title: 'PREMIUM MATERIALS',
      description: 'We use only the highest quality heating systems and components.',
      image: 'https://images.unsplash.com/photo-1772563139470-9232b4e435c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tJTIwY29tZm9ydGFibGV8ZW58MXx8fHwxNzc2ODQ3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: ThumbsUp,
      title: 'CUSTOMER SATISFACTION',
      description: 'Dedicated to delivering exceptional service and complete peace of mind.',
      image: 'https://images.unsplash.com/photo-1632120669818-ed5498030e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tJTIwY29tZm9ydGFibGV8ZW58MXx8fHwxNzc2ODQ3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            EXPERIENCE THE <span className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] bg-clip-text text-transparent">DIFFERENCE</span><br />
            QUALITY GUARANTEED
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] rounded-full flex items-center justify-center mb-3">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
