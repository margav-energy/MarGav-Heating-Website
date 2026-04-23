import { Phone } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1759722667730-36e4e76afa30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tJTIwY29tZm9ydGFibGV8ZW58MXx8fHwxNzc2ODQ3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Comfortable modern home"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              UPGRADE YOUR HOME
              <br />
              NOW{" "}
              <span className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] bg-clip-text text-transparent">
                QUICKLY
              </span>{" "}
              AND{" "}
              <span className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] bg-clip-text text-transparent">
                EFFORTLESSLY
              </span>
            </h2>

            <p className="text-white/80 text-lg mb-8">
              Transform your home with expert heating solutions, modern
              technology, and top-quality installations.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] text-white px-8 py-4 rounded-full text-lg hover:shadow-2xl transition-all">
                GET A FREE QUOTE →
              </button>
            </div>

            <div className="flex items-center gap-4 text-white">
              <Phone className="w-6 h-6 text-[#33CC66]" />
              <div>
                <div className="text-2xl font-bold">01889 256069</div>
                <div className="text-white/60">We're here 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
