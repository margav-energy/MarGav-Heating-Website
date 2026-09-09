import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
const logo = new URL("../../assets/MarGav Intergas logo.svg", import.meta.url).href;
const phoneHref = "tel:+441889256069";
const applyForFinanceHref = "https://ideal4finance.com/retail-hi/apply/margav";
const personalLoanHref = "https://ideal4finance.com/apply/margav/loan";

export function Header() {
  const navLinks = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "services", label: "SERVICES" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ];
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isFinancePage = location.pathname === "/finance";
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return undefined;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;

      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(link.id);
          return;
        }
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [isHome]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto relative">
        <div className="h-24">
          <div className="h-24 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <img
                src={logo}
                alt="MarGav Heating logo"
                className="w-[220px] sm:w-[260px] md:w-[300px] h-auto object-contain"
              />
            </div>

            <nav className="hidden 2xl:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  onClick={() => setActiveSection(link.id)}
                  className={
                    isHome && activeSection === link.id
                      ? "whitespace-nowrap text-white text-sm px-4 py-2 rounded-full bg-[#3333cc] transition-colors"
                      : "whitespace-nowrap text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                  }
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/finance"
                className={
                  isFinancePage
                    ? "whitespace-nowrap text-white text-sm px-4 py-2 rounded-full bg-[#3333cc] transition-colors"
                    : "whitespace-nowrap text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                }
              >
                FINANCE CALCULATOR
              </Link>
              <a
                href={applyForFinanceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                APPLY FOR FINANCE
              </a>
              <a
                href={personalLoanHref}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                PERSONAL LOAN
              </a>
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={phoneHref}
                className="hidden 2xl:block whitespace-nowrap text-gray-700 text-sm hover:text-[#3333cc] transition-colors"
              >
                01889 256069
              </a>
              <button className="hidden sm:inline-flex whitespace-nowrap bg-[#3333cc] text-white text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                GET A QUOTE
              </button>
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="2xl:hidden w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="2xl:hidden fixed inset-0 z-40 bg-black/85 backdrop-blur-xl pt-28 px-4 sm:px-6">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-4 sm:right-6 w-10 h-10 rounded-full border border-white/25 bg-white/10 text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl border border-white/20 bg-black/70 p-3 space-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  onClick={() => {
                    setActiveSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={
                    isHome && activeSection === link.id
                      ? "block text-white text-sm px-4 py-3 rounded-xl bg-[#3333cc]"
                      : "block text-white/90 text-sm px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                  }
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/finance"
                onClick={() => setIsMobileMenuOpen(false)}
                className={
                  isFinancePage
                    ? "block text-white text-sm px-4 py-3 rounded-xl bg-[#3333cc]"
                    : "block text-white/90 text-sm px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                }
              >
                FINANCE CALCULATOR
              </Link>
              <a
                href={applyForFinanceHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 text-sm px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                APPLY FOR FINANCE
              </a>
              <a
                href={personalLoanHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 text-sm px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                PERSONAL LOAN
              </a>
              <a
                href={phoneHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 text-sm px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                01889 256069
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
