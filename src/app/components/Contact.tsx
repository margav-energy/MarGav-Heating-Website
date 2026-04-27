import React from 'react';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  addressLine1: string;
  townCity: string;
  county: string;
  fullAddress: string;
  serviceType: string;
  message: string;
};

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  postcode: '',
  addressLine1: '',
  townCity: '',
  county: '',
  fullAddress: '',
  serviceType: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = React.useState<FormState>(initialFormState);
  const [isLookingUpAddress, setIsLookingUpAddress] = React.useState(false);
  const [addressLookupMessage, setAddressLookupMessage] = React.useState('');

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const lookupAddressByPostcode = async () => {
    const postcode = form.postcode.trim().toUpperCase();
    const mapboxToken = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_MAPBOX_ACCESS_TOKEN;

    if (!postcode) {
      setAddressLookupMessage('Enter a postcode to find your address.');
      return;
    }

    if (!mapboxToken) {
      setAddressLookupMessage('Mapbox token missing. Add VITE_MAPBOX_ACCESS_TOKEN in .env.');
      return;
    }

    setIsLookingUpAddress(true);
    setAddressLookupMessage('');

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          postcode
        )}.json?access_token=${mapboxToken}&autocomplete=false&country=gb&types=postcode,address&limit=1`
      );

      if (!response.ok) {
        throw new Error('Address lookup failed.');
      }

      const data = await response.json();
      const feature = data?.features?.[0];

      if (!feature) {
        setAddressLookupMessage('No address found for that postcode.');
        return;
      }

      const context = Array.isArray(feature.context) ? feature.context : [];
      const addressLine1 = feature.properties?.address
        ? `${feature.properties.address} ${feature.text}`.trim()
        : feature.text ?? '';
      const townCity =
        context.find((item: { id?: string }) => item.id?.startsWith('place'))?.text ??
        context.find((item: { id?: string }) => item.id?.startsWith('locality'))?.text ??
        '';
      const county = context.find((item: { id?: string }) => item.id?.startsWith('region'))?.text ?? '';
      const resolvedPostcode =
        context.find((item: { id?: string }) => item.id?.startsWith('postcode'))?.text ?? postcode;

      setForm((prev) => ({
        ...prev,
        postcode: resolvedPostcode,
        addressLine1,
        townCity,
        county,
        fullAddress: feature.place_name ?? '',
      }));
      setAddressLookupMessage('');
    } catch (error) {
      setAddressLookupMessage('Unable to fetch address right now. Please enter it manually.');
    } finally {
      setIsLookingUpAddress(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-[#3333cc]/80 backdrop-blur-xl border border-white/20 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              BOOK YOUR{" "}
              <span className="bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] bg-clip-text text-transparent">
                HEATING
              </span>
              <br />
              CONSULTATION FOR FREE
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#33CC66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">FREE HOME SURVEY</h4>
                  <p className="text-white">
                    Our experts visit your home to assess your heating needs at
                    no cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#33CC66] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">NO OBLIGATION QUOTE</h4>
                  <p className="text-white">
                    Receive a detailed, transparent quote with no pressure to
                    commit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full name*"
                  value={form.fullName}
                  onChange={updateField('fullName')}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
                <input
                  type="email"
                  placeholder="Email Address*"
                  value={form.email}
                  onChange={updateField('email')}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Phone Number*"
                  value={form.phone}
                  onChange={updateField('phone')}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Postcode*"
                    value={form.postcode}
                    onChange={updateField('postcode')}
                    onBlur={() => {
                      if (form.postcode.trim()) {
                        void lookupAddressByPostcode();
                      }
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                  />
                  <button
                    type="button"
                    onClick={() => void lookupAddressByPostcode()}
                    disabled={isLookingUpAddress}
                    className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLookingUpAddress ? 'Finding...' : 'Find'}
                  </button>
                </div>
              </div>

              {addressLookupMessage && (
                <p className="text-sm text-gray-600">{addressLookupMessage}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Address line 1*"
                  value={form.addressLine1}
                  onChange={updateField('addressLine1')}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
                <input
                  type="text"
                  placeholder="Town / City*"
                  value={form.townCity}
                  onChange={updateField('townCity')}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
                />
              </div>

              <input
                type="text"
                placeholder="County"
                value={form.county}
                onChange={updateField('county')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
              />

              <input
                type="text"
                placeholder="Full address"
                value={form.fullAddress}
                onChange={updateField('fullAddress')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
              />

              <select
                value={form.serviceType}
                onChange={updateField('serviceType')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#33CC66]"
              >
                <option value="">Service Type*</option>
                <option>Boiler Installation</option>
                <option>Heat Pump Installation</option>
                <option>Boiler Replacement</option>
                <option>Annual Service</option>
              </select>

              <textarea
                placeholder="Your message (optional)"
                rows={4}
                value={form.message}
                onChange={updateField('message')}
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
