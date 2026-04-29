import React from 'react';
import { CheckCircle2, Loader2, Search } from 'lucide-react';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  fullAddress: string;
  serviceType: string;
  message: string;
};

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  postcode: '',
  fullAddress: '',
  serviceType: '',
  message: '',
};

const ukPostcodeRegex =
  /^([Gg][Ii][Rr]\s?0[Aa]{2}|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2}))$/;

export function Contact() {
  const [form, setForm] = React.useState<FormState>(initialFormState);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [isLookingUpAddress, setIsLookingUpAddress] = React.useState(false);
  const [addressLookupMessage, setAddressLookupMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = React.useState(false);

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length < 10) {
      nextErrors.phone = 'Enter a valid phone number.';
    }

    if (!form.postcode.trim()) {
      nextErrors.postcode = 'Postcode is required.';
    } else if (!ukPostcodeRegex.test(form.postcode.trim())) {
      nextErrors.postcode = 'Enter a valid UK postcode.';
    }
    if (!form.fullAddress.trim()) nextErrors.fullAddress = 'Full address is required.';
    if (!form.serviceType.trim()) nextErrors.serviceType = 'Please choose a service type.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const lookupAddressByPostcode = async () => {
    const postcode = form.postcode.trim();
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
        )}.json?access_token=${mapboxToken}&autocomplete=true&country=gb&types=address,postcode&limit=5`
      );

      if (!response.ok) {
        throw new Error('Address lookup failed.');
      }

      const data = await response.json();
      const features = Array.isArray(data?.features) ? data.features : [];
      const feature =
        features.find((item: { place_type?: string[] }) => item.place_type?.includes('address')) ??
        features[0];

      if (!feature) {
        setAddressLookupMessage('No address found for that postcode.');
        return;
      }

      const context = Array.isArray(feature.context) ? feature.context : [];
      const resolvedPostcode =
        context.find((item: { id?: string }) => item.id?.startsWith('postcode'))?.text ?? postcode;

      setForm((prev) => ({
        ...prev,
        postcode: resolvedPostcode,
        fullAddress: feature.place_name ?? '',
      }));
      setAddressLookupMessage('');
    } catch (error) {
      setAddressLookupMessage('Unable to fetch address right now. Please enter it manually.');
    } finally {
      setIsLookingUpAddress(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage('');

    if (!validateForm()) {
      setSubmitMessage('Please correct the highlighted fields and try again.');
      return;
    }

    const formspreeEndpoint = (import.meta as { env?: Record<string, string | undefined> }).env
      ?.VITE_FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      setSubmitMessage('Form endpoint missing. Add VITE_FORMSPREE_ENDPOINT in .env.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          postcode: form.postcode,
          fullAddress: form.fullAddress,
          serviceType: form.serviceType,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitMessage('Thanks! Your request has been sent.');
      setIsSubmittedSuccessfully(true);
      setForm(initialFormState);
      setErrors({});
    } catch (error) {
      setSubmitMessage('Sorry, we could not send your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-[#3333cc] backdrop-blur-xl border border-white/20 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              BOOK YOUR{" "}
              <span className="text-white">
                HEATING
              </span>
              <br />
              CONSULTATION FOR FREE
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
                <div className="w-6 h-6 bg-gradient-to-r from-[#66CC66] via-[#33CC66] to-[#00CC99] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
            {isSubmittedSuccessfully ? (
              <div className="min-h-[520px] flex flex-col items-center justify-center text-center">
                <div className="w-28 h-28 rounded-full bg-[#3333cc] flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Sent Successfully</h3>
                <p className="text-gray-700 max-w-sm">
                  Thank you. We have received your request and our team will contact you shortly.
                </p>
              </div>
            ) : (
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full name*"
                  value={form.fullName}
                  onChange={updateField('fullName')}
                  className={`px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-[#3333cc] ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.fullName && <p className="col-span-2 -mt-2 text-xs text-red-600">{errors.fullName}</p>}
                <input
                  type="email"
                  placeholder="Email Address*"
                  value={form.email}
                  onChange={updateField('email')}
                  className={`px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-[#3333cc] ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.email && <p className="col-span-2 -mt-2 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Phone Number*"
                  value={form.phone}
                  onChange={updateField('phone')}
                  className={`px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-[#3333cc] ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
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
                    className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-[#3333cc] ${errors.postcode ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  <button
                    type="button"
                    onClick={() => void lookupAddressByPostcode()}
                    disabled={isLookingUpAddress}
                    aria-label="Find address by postcode"
                    className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLookingUpAddress ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.phone && <p className="col-span-2 -mt-2 text-xs text-red-600">{errors.phone}</p>}
                {errors.postcode && <p className="col-span-2 -mt-2 text-xs text-red-600">{errors.postcode}</p>}
              </div>

              {addressLookupMessage && (
                <p className="text-sm text-gray-600">{addressLookupMessage}</p>
              )}

              <input
                type="text"
                placeholder="Full address"
                value={form.fullAddress}
                onChange={updateField('fullAddress')}
                className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-[#3333cc] ${errors.fullAddress ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.fullAddress && <p className="-mt-2 text-xs text-red-600">{errors.fullAddress}</p>}

              <select
                value={form.serviceType}
                onChange={updateField('serviceType')}
                className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-[#3333cc] ${errors.serviceType ? 'border-red-500' : 'border-gray-200'}`}
              >
                <option value="">Service Type*</option>
                <option>Boiler Installation</option>
                <option>Heat Pump Installation</option>
                <option>Boiler Replacement</option>
                <option>Annual Service</option>
              </select>
              {errors.serviceType && <p className="-mt-2 text-xs text-red-600">{errors.serviceType}</p>}

              <textarea
                placeholder="Your message (optional)"
                rows={4}
                value={form.message}
                onChange={updateField('message')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#3333cc] resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-[#3333cc] py-4 rounded-lg border border-white hover:shadow-lg transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'REQUEST CALLBACK'}
              </button>
              {submitMessage && <p className="text-sm text-gray-700">{submitMessage}</p>}
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
