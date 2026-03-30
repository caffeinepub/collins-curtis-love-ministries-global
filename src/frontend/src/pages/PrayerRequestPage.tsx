import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function PrayerRequestPage() {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitPrayerRequest(form.name, form.email, form.message);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-[#102A4B] text-white py-20 text-center">
        <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
          Prayer
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">
          We're Praying With You
        </h1>
        <div className="w-16 h-0.5 bg-[#C7A24A] mx-auto mt-6" />
      </div>

      <div
        className="min-h-screen py-16"
        style={{ backgroundColor: "#F4EFE6" }}
      >
        <div className="max-w-2xl mx-auto px-4">
          {submitted ? (
            <div
              className="bg-white rounded-xl p-12 text-center shadow-sm"
              style={{ border: "1px solid #D7CFBF" }}
            >
              <div className="text-[#C7A24A] text-5xl mb-4">✝</div>
              <h2 className="font-serif text-[#102A4B] text-2xl font-bold mb-4">
                Prayer Received
              </h2>
              <p className="text-gray-600 leading-relaxed">
                No matter what you are facing, you do not have to carry it
                alone. Our ministry is standing with you in faith. God bless
                you.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 text-[#C7A24A] hover:underline text-sm"
              >
                Submit another prayer request
              </button>
            </div>
          ) : (
            <div
              className="bg-white rounded-xl p-8 sm:p-12 shadow-sm"
              style={{ border: "1px solid #D7CFBF" }}
            >
              <div className="text-center mb-8">
                <div className="text-[#C7A24A] text-3xl mb-3">✝</div>
                <p className="text-gray-600 leading-relaxed">
                  No matter what you are facing, you do not have to carry it
                  alone. Submit your prayer request and our ministry will stand
                  with you in faith.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="pr-name"
                    className="block text-[#102A4B] font-medium text-sm mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="pr-name"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full rounded-md px-4 py-3 text-sm focus:outline-none"
                    style={{ border: "1px solid #D7CFBF" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="pr-email"
                    className="block text-[#102A4B] font-medium text-sm mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="pr-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-md px-4 py-3 text-sm focus:outline-none"
                    style={{ border: "1px solid #D7CFBF" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="pr-message"
                    className="block text-[#102A4B] font-medium text-sm mb-2"
                  >
                    Prayer Request
                  </label>
                  <textarea
                    id="pr-message"
                    required
                    rows={6}
                    placeholder="Share your prayer request here. We will hold it in confidence and pray with you."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full rounded-md px-4 py-3 text-sm focus:outline-none resize-none"
                    style={{ border: "1px solid #D7CFBF" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !actor}
                  className="w-full bg-[#102A4B] text-white font-bold py-4 rounded-md uppercase tracking-wide hover:bg-[#0a1f38] transition-colors disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Prayer Request"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
