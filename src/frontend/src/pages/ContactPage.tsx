import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function ContactPage() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitContactMessage(
        form.name,
        form.email,
        form.subject,
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
          Reach Out
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">
          Contact Us
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </div>

      <div className="bg-cream min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-navy font-bold mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you are interested in partnering, inviting a speaker,
                attending an event, volunteering, or learning more about the
                ministry, please reach out. We would love to connect with you.
              </p>
              <div className="space-y-4">
                {[
                  [
                    "Partner With Us",
                    "For churches, donors, sponsors, and collaborators.",
                  ],
                  [
                    "Invite a Speaker",
                    "Request a speaker for your church or gathering.",
                  ],
                  [
                    "Sponsor an Event",
                    "Support workshops, outreach efforts, or events.",
                  ],
                  [
                    "General Inquiry",
                    "Any other questions about our ministry.",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="flex gap-3 bg-white rounded-lg p-4 border border-taupe"
                  >
                    <div className="text-gold font-bold mt-0.5">✝</div>
                    <div>
                      <p className="text-navy font-semibold text-sm">{title}</p>
                      <p className="text-gray-500 text-sm">{desc}</p>
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
                    Message Received!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-navy text-xl font-bold mb-4">
                    Send a Message
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
                    required
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subject: e.target.value }))
                    }
                    className="w-full border border-taupe rounded-md px-4 py-3 text-sm focus:outline-none focus:border-gold"
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message..."
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
                    {loading ? "Sending..." : "Send Message"}
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
