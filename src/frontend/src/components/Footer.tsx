import type { Page } from "../App";

interface Props {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: Props) {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold">
                ✝
              </div>
              <span className="font-serif font-semibold text-lg">
                Collins-Curtis
                <br />
                <span className="text-gold">Love Ministries Global</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed italic">
              "Faith Without Borders. Love Without Limits."
            </p>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              Reaching Nations. Changing Lives. Sharing God's Love.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-gold font-semibold uppercase tracking-wider text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {(
                [
                  ["Home", "home"],
                  ["Get Involved", "get-involved"],
                  ["Prayer Request", "prayer"],
                  ["Mentorship", "mentorship"],
                  ["Partner With Us", "partner"],
                  ["Volunteer", "volunteer"],
                  ["Contact Us", "contact"],
                ] as [string, Page][]
              ).map(([label, page]) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => navigate(page)}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold uppercase tracking-wider text-sm mb-4">
              Contact Us
            </h4>
            <div className="space-y-2 text-white/60 text-sm">
              <p>Collins-Curtis Love Ministries Global</p>
              <p>Serving the World Through God's Love</p>
              <button
                type="button"
                onClick={() => navigate("contact")}
                className="text-gold hover:underline mt-2 block"
              >
                Send a Message →
              </button>
              <button
                type="button"
                onClick={() => navigate("prayer")}
                className="text-gold hover:underline block"
              >
                Submit a Prayer Request →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} Collins-Curtis Love Ministries Global.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}
