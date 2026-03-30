import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function VolunteerPage() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    interests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const opportunities = [
    "Event support",
    "Outreach programs",
    "Hospitality",
    "Prayer teams",
    "Media & content creation",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitVolunteerApplication(
        form.name,
        form.email,
        form.interests,
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
          Serve
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">
          Join Our Volunteer Team
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </div>

      <div className="bg-cream min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-navy font-bold mb-6">
                The Heart of Our Ministry
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                We believe ministry is strongest when people come together to
                serve. Volunteers are the heart of Collins-Curtis Love
                Ministries Global. Whatever your gifts and availability, there's
                a place for you here.
              </p>
              <h3 className="font-serif text-lg text-navy font-bold mb-4">
                Volunteer Opportunities
              </h3>
              <div className="space-y-3">
                {opportunities.map((o) => (
                  <div
                    key={o}
                    className="flex items-center gap-3 bg-white rounded-lg px-5 py-4 border border-taupe"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-navy font-medium">{o}</span>
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
                    Your volunteer application has been received. We'll be in
                    touch soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-navy text-xl font-bold mb-2">
                    Sign Up to Volunteer
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
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="Areas of interest (e.g. Events, Prayer, Media)"
                    value={form.interests}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, interests: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <textarea
                    rows={4}
                    placeholder="Tell us a bit about yourself and why you'd like to volunteer..."
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
                    {loading ? "Submitting..." : "Submit Application"}
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
