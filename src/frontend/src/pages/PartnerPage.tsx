import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function PartnerPage() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    partnerType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitPartnerInquiry(
        form.name,
        form.organization,
        form.email,
        form.partnerType,
        form.message,
      );
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-navy text-white py-20 text-center">
        <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-3">
          Collaboration
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">
          Partner With Us
        </h1>
        <p className="text-white/70 mt-4 text-lg">
          For churches, donors, sponsors, volunteers, and event collaborators.
        </p>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </div>

      <div className="bg-cream min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-navy font-bold mb-6">
                Why Partner With Us?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Partnership with Collins-Curtis Love Ministries Global means
                joining a family of believers committed to making a real
                difference in the lives of children, families, veterans, and
                communities around the world.
              </p>
              <div className="space-y-4">
                {[
                  {
                    type: "Churches",
                    desc: "Join our network of ministry partners for events, revival gatherings, and outreach programs.",
                  },
                  {
                    type: "Donors",
                    desc: "Your financial gifts directly fund outreach, food programs, veteran support, and ministry events.",
                  },
                  {
                    type: "Sponsors",
                    desc: "Sponsor workshops, concerts, conferences, and believer events that uplift communities.",
                  },
                  {
                    type: "Volunteers",
                    desc: "Give your time and talents to serve through events, outreach, and ministry initiatives.",
                  },
                  {
                    type: "Event Collaborators",
                    desc: "Co-host or collaborate on ministry events, revival gatherings, and faith-based services.",
                  },
                ].map((item) => (
                  <div key={item.type} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-2" />
                    <div>
                      <span className="text-navy font-semibold">
                        {item.type}:{" "}
                      </span>
                      <span className="text-gray-600 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-taupe shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-gold text-4xl mb-4">✝</div>
                  <h3 className="font-serif text-navy text-xl font-bold mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your partnership inquiry has been received. We will be in
                    touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-navy text-xl font-bold mb-2">
                    Partnership Inquiry
                  </h3>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Organization / Church Name"
                    value={form.organization}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, organization: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <select
                    required
                    value={form.partnerType}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, partnerType: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white text-gray-700"
                  >
                    <option value="">Select Partnership Type</option>
                    <option>Church</option>
                    <option>Donor</option>
                    <option>Sponsor</option>
                    <option>Volunteer</option>
                    <option>Event Collaborator</option>
                  </select>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about yourself and how you'd like to partner with us..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !actor}
                    className="w-full bg-navy text-white font-bold py-3 rounded-md uppercase tracking-wide hover:bg-navy-dark transition-colors disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
