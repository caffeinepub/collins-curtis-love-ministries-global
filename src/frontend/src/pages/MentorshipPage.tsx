import { useState } from "react";
import { Variant_free_paid } from "../backend";
import { useActor } from "../hooks/useActor";

export default function MentorshipPage() {
  const { actor } = useActor();
  const [selectedType, setSelectedType] = useState<"free" | "paid" | null>(
    null,
  );
  const [form, setForm] = useState({ name: "", email: "", goals: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !selectedType) return;
    setLoading(true);
    try {
      const sessionType =
        selectedType === "free"
          ? Variant_free_paid.free
          : Variant_free_paid.paid;
      await actor.submitMentorshipApplication(
        form.name,
        form.email,
        sessionType,
        form.goals,
      );
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const CardFree = () => (
    <button
      type="button"
      onClick={() => setSelectedType("free")}
      className={`bg-white rounded-xl p-8 border-2 cursor-pointer transition-all hover:shadow-md text-left w-full ${
        selectedType === "free"
          ? "border-[#C7A24A] shadow-md"
          : "border-[#D7CFBF]"
      }`}
    >
      <div className="text-[#C7A24A] text-3xl mb-4 text-center">✝</div>
      <h2 className="font-serif text-2xl text-[#102A4B] font-bold text-center mb-2">
        Free Community Mentorship
      </h2>
      <p className="text-center text-sm text-[#C7A24A] font-semibold uppercase tracking-wide mb-4">
        Open to All
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
        To uplift, strengthen, and guide through faith, identity, healing, and
        purpose.
      </p>
      <ul className="space-y-2 mb-6">
        {[
          "Biblical teaching",
          "Prayer & encouragement",
          "Life guidance",
          "Community support",
        ].map((i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
            <span className="text-[#C7A24A] font-bold">✓</span> {i}
          </li>
        ))}
      </ul>
      <div
        className={`text-center text-sm font-semibold py-2 px-4 rounded-md ${
          selectedType === "free"
            ? "bg-[#C7A24A] text-[#102A4B]"
            : "border border-[#C7A24A] text-[#C7A24A]"
        }`}
      >
        {selectedType === "free" ? "Selected ✓" : "Join Free Mentorship"}
      </div>
    </button>
  );

  const CardPaid = () => (
    <button
      type="button"
      onClick={() => setSelectedType("paid")}
      className={`bg-white rounded-xl p-8 border-2 cursor-pointer transition-all hover:shadow-md text-left w-full ${
        selectedType === "paid"
          ? "border-[#C7A24A] shadow-md"
          : "border-[#D7CFBF]"
      }`}
    >
      <div className="text-[#C7A24A] text-3xl mb-4 text-center">★</div>
      <h2 className="font-serif text-2xl text-[#102A4B] font-bold text-center mb-2">
        1-on-1 Mentorship
      </h2>
      <p className="text-center text-sm text-[#C7A24A] font-semibold uppercase tracking-wide mb-4">
        Personalized Program
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
        For those seeking deeper, personalized guidance on their faith journey
        and life calling.
      </p>
      <ul className="space-y-2 mb-6">
        {[
          "One-on-one sessions",
          "Faith-based life coaching",
          "Accountability & growth planning",
          "Spiritual development",
        ].map((i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
            <span className="text-[#C7A24A] font-bold">✓</span> {i}
          </li>
        ))}
      </ul>
      <div
        className={`text-center text-sm font-semibold py-2 px-4 rounded-md ${
          selectedType === "paid"
            ? "bg-[#C7A24A] text-[#102A4B]"
            : "border border-[#C7A24A] text-[#C7A24A]"
        }`}
      >
        {selectedType === "paid" ? "Selected ✓" : "Apply for Mentorship"}
      </div>
    </button>
  );

  return (
    <div>
      <div className="bg-[#102A4B] text-white py-20 text-center">
        <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
          Grow in Faith
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">
          Mentorship Programs
        </h1>
        <p className="text-white/70 mt-4">
          Growing in Faith, Purpose, and Discipline Through God's Love
        </p>
        <div className="w-16 h-0.5 bg-[#C7A24A] mx-auto mt-6" />
      </div>

      <div
        className="min-h-screen py-16"
        style={{ backgroundColor: "#F4EFE6" }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <CardFree />
            <CardPaid />
          </div>

          {selectedType && (
            <div
              className="bg-white rounded-xl p-8 sm:p-12 shadow-sm max-w-2xl mx-auto"
              style={{ border: "1px solid #D7CFBF" }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-[#C7A24A] text-4xl mb-4">✝</div>
                  <h3 className="font-serif text-[#102A4B] text-xl font-bold mb-2">
                    Application Received!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for applying. We'll be in touch soon to discuss
                    next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-[#102A4B] text-xl font-bold mb-1">
                    {selectedType === "free" ? "Free Community" : "1-on-1"}{" "}
                    Mentorship Application
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Tell us a bit about yourself and your goals.
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full rounded-md px-4 py-3 text-sm focus:outline-none"
                    style={{ border: "1px solid #D7CFBF" }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-md px-4 py-3 text-sm focus:outline-none"
                    style={{ border: "1px solid #D7CFBF" }}
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="Share your goals, where you are in your faith journey, and what you hope to gain from mentorship..."
                    value={form.goals}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, goals: e.target.value }))
                    }
                    className="w-full rounded-md px-4 py-3 text-sm focus:outline-none resize-none"
                    style={{ border: "1px solid #D7CFBF" }}
                  />
                  <button
                    type="submit"
                    disabled={loading || !actor}
                    className="w-full bg-[#102A4B] text-white font-bold py-3 rounded-md uppercase tracking-wide hover:bg-[#0a1f38] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          )}

          {!selectedType && (
            <p className="text-center text-gray-500 text-sm mt-4">
              Select a program above to apply.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
