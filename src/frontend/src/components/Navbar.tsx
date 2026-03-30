import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

interface Props {
  navigate: (page: Page) => void;
  currentPage: Page;
}

const links: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Ministries", page: "home" },
  { label: "Get Involved", page: "get-involved" },
  { label: "Prayer", page: "prayer" },
  { label: "Mentorship", page: "mentorship" },
  { label: "Partner", page: "partner" },
  { label: "Contact", page: "contact" },
];

export default function Navbar({ navigate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              navigate("home");
              setOpen(false);
            }}
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm">
              ✝
            </div>
            <span className="font-serif font-semibold text-sm sm:text-base leading-tight">
              Collins-Curtis
              <br className="hidden sm:block" />
              <span className="text-gold"> Love Ministries</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <button
                type="button"
                key={l.label}
                onClick={() => navigate(l.page)}
                className="text-white/80 hover:text-gold text-sm font-medium uppercase tracking-wide transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate("get-involved")}
              className="bg-gold text-navy font-semibold text-sm px-4 py-2 rounded-md hover:bg-gold-dark transition-colors uppercase tracking-wide"
            >
              Donate
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-2 pt-3">
            {links.map((l) => (
              <button
                type="button"
                key={l.label}
                onClick={() => {
                  navigate(l.page);
                  setOpen(false);
                }}
                className="text-white/80 hover:text-gold text-sm font-medium uppercase tracking-wide py-2 text-left transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                navigate("get-involved");
                setOpen(false);
              }}
              className="bg-gold text-navy font-semibold text-sm px-4 py-2 rounded-md mt-2 uppercase tracking-wide w-full"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
