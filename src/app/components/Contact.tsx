export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              BOOK YOUR <span className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] bg-clip-text text-transparent">HEATING</span><br />
              CONSULTATION FOR FREE
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#33CC66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">FREE HOME SURVEY</h4>
                  <p className="text-gray-600">Our experts visit your home to assess your heating needs at no cost.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#33CC66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">NO OBLIGATION QUOTE</h4>
                  <p className="text-gray-600">Receive a detailed, transparent quote with no pressure to commit.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full name*"
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
                <input
                  type="email"
                  placeholder="Email Address*"
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Phone Number*"
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
                <input
                  type="text"
                  placeholder="Postcode*"
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
              </div>

              <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]">
                <option>Service Type*</option>
                <option>Boiler Installation</option>
                <option>Heat Pump Installation</option>
                <option>Boiler Repair</option>
                <option>Annual Service</option>
              </select>

              <textarea
                placeholder="Your message (optional)"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66] resize-none"
              ></textarea>

              <button className="w-full bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] text-white py-4 rounded-lg hover:shadow-lg transition-all font-semibold">
                REQUEST CALLBACK
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
