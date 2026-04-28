import React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const engineerImage = new URL("../../assets/gas_engineer.png", import.meta.url)
  .href;
const detailImage = new URL(
  "../../assets/Gas Safe Registered.png",
  import.meta.url,
).href;

const features = [
  {
    title: "Full Heating System Design",
    desc: "Complete system design tailored to your home's unique requirements.",
  },
  {
    title: "Renewable Energy Solutions",
    desc: "Air source heat pumps, smart controls, and energy-efficient upgrades.",
  },
];

export function About() {
  const [activeTab, setActiveTab] = React.useState<"mission" | "vision">(
    "vision",
  );

  const missionText =
    "MarGav Heating specialises in making homes comfortable, efficient, and future-ready. With years of experience in boiler installations, heat pump systems, and smart heating controls, our team delivers exceptional craftsmanship, transparent pricing, and reliable aftercare.";

  const visionText = [
    "At Margav Heating, we are committed to delivering reliable, efficient, and future-ready heating solutions for every home and business. By combining high-performance boilers with low-carbon air source heat pumps (ASHPs), we provide flexible options that meet today&apos;s needs while supporting the transition to cleaner energy.",
    "Our goal is simple: to make heating more efficient, more sustainable, and more accessible without compromising on comfort or quality. Through expert installation, trusted service, and a customer-first approach, we aim to be a leading partner in the move towards smarter, lower-carbon heating.",
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3333cc] mb-3">
            About MarGav
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Local Expertise, <span className="text-[#3333cc]">Modern</span>{" "}
            Solutions
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={engineerImage}
                alt="MarGav engineer installing a boiler"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-44 h-36 rounded-tl-2xl overflow-hidden shadow-xl border-l-4 border-t-4 border-white hidden sm:block bg-white">
              <img
                src={detailImage}
                alt="Gas Safe registered detail"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex gap-6 mb-8">
              <button
                onClick={() => setActiveTab("mission")}
                className={
                  activeTab === "mission"
                    ? "text-sm font-semibold text-gray-900 border-b-2 border-[#3333cc] pb-1"
                    : "text-sm font-semibold text-gray-500 pb-1"
                }
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={
                  activeTab === "vision"
                    ? "text-sm font-semibold text-gray-900 border-b-2 border-[#3333cc] pb-1"
                    : "text-sm font-semibold text-gray-500 pb-1"
                }
              >
                Our Vision
              </button>
            </div>

            {activeTab === "mission" ? (
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {missionText}
              </p>
            ) : (
              <>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {visionText[0]}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {visionText[1]}
                </p>
              </>
            )}

            {activeTab === "mission" && (
              <div className="space-y-6 mb-10">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 rounded-xl bg-[#3333cc]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#3333cc]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
