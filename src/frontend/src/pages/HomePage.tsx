import { BookOpen, ChevronDown, Globe, Heart, Mic, Music } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";
import { useActor } from "../hooks/useActor";

interface Props {
  navigate: (page: Page) => void;
}

const ministryAreas = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Children & Family Outreach",
    desc: "Provide food, support, care initiatives, and charitable outreach for children and families in need around the world.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Veteran & Community Support",
    desc: "Help veterans, struggling families, and underserved communities through giving, assistance, and acts of compassion.",
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "International Speakers & Revival Events",
    desc: "Welcome speakers from around the world to America for ministry events, revival gatherings, and faith-based services.",
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: "Workshops, Concerts & Believer Events",
    desc: "Support believers in organizing workshops, concerts, conferences, and uplifting Christian gatherings.",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Bible Study, Prayer & Teaching",
    desc: "Offer weekly or monthly Bible study, prayer service, discipleship workshops, and spiritual encouragement.",
  },
];

const involvedWays = [
  "Donate",
  "Volunteer",
  "Partner With Us",
  "Invite a Speaker",
  "Sponsor an Event",
  "Join Bible Study",
  "Submit a Prayer Request",
  "Support the Mission",
];

function PrayerFormInline() {
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

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-gold text-4xl mb-4">✝</div>
        <h3 className="font-serif text-navy text-xl font-bold mb-2">
          Prayer Received
        </h3>
        <p className="text-gray-600">
          We are standing with you in faith. God bless you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-serif text-navy text-xl font-bold mb-6 text-center">
        Submit a Prayer Request
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          required
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full border border-[#D7CFBF] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C7A24A] bg-white"
        />
        <input
          type="email"
          required
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full border border-[#D7CFBF] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C7A24A] bg-white"
        />
        <textarea
          required
          rows={4}
          placeholder="Share your prayer request..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full border border-[#D7CFBF] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#C7A24A] bg-white resize-none"
        />
        <button
          type="submit"
          disabled={loading || !actor}
          className="w-full bg-[#102A4B] text-white font-bold py-3 rounded-md uppercase tracking-wide hover:bg-[#0a1f38] transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Prayer Request"}
        </button>
      </div>
    </form>
  );
}

export default function HomePage({ navigate }: Props) {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-ministry.dim_1400x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(16,42,75,0.72)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
          <p className="text-[#C7A24A] font-semibold uppercase tracking-[0.3em] text-sm mb-4">
            Collins-Curtis Love Ministries Global
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Faith Without Borders.
            <br />
            <span className="text-[#C7A24A]">Love Without Limits.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-3 italic font-serif">
            "Reaching Nations. Changing Lives. Sharing God's Love."
          </p>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Collins-Curtis Love Ministries Global is dedicated to helping
            children, families, veterans, and communities in need through
            outreach, faith, global ministry events, prayer, and the power of
            love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate("get-involved")}
              className="bg-[#C7A24A] text-[#102A4B] font-bold px-8 py-3 rounded-md text-base uppercase tracking-wide hover:bg-[#b08d3a] transition-colors"
            >
              Donate Now
            </button>
            <button
              type="button"
              onClick={() => navigate("get-involved")}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-md text-base uppercase tracking-wide hover:bg-white hover:text-[#102A4B] transition-colors"
            >
              Join the Mission
            </button>
            <button
              type="button"
              onClick={() => navigate("contact")}
              className="bg-transparent border-2 border-[#C7A24A] text-[#C7A24A] font-bold px-8 py-3 rounded-md text-base uppercase tracking-wide hover:bg-[#C7A24A] hover:text-[#102A4B] transition-colors"
            >
              Request a Speaker
            </button>
          </div>
          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/50 mx-auto" />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-[#C7A24A] text-3xl mb-4">✝</div>
          <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            Our Mission
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#102A4B] font-bold mb-6">
            Serving the World Through God's Love
          </h2>
          <div className="w-16 h-0.5 bg-[#C7A24A] mx-auto mb-6" />
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Our mission is to demonstrate the love of God in action by serving
            children, families, veterans, believers, and communities across the
            world. We are committed to outreach, ministry, prayer, teaching,
            revival gatherings, and global connection through faith.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "#F4EFE6" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
              Core Areas
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#102A4B] font-bold mb-4">
              What We Do
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div
                className="flex-1 max-w-24 h-px"
                style={{ backgroundColor: "#D7CFBF" }}
              />
              <span className="text-[#C7A24A] text-lg">✝</span>
              <div
                className="flex-1 max-w-24 h-px"
                style={{ backgroundColor: "#D7CFBF" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministryAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                style={{ border: "1px solid #D7CFBF" }}
              >
                <div className="text-[#C7A24A] mb-4 flex justify-center">
                  {area.icon}
                </div>
                <h3 className="font-serif font-semibold text-[#102A4B] text-lg mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="bg-[#102A4B] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-[#C7A24A] text-4xl mb-6 font-serif">"</div>
          <blockquote className="font-serif text-xl sm:text-2xl text-white leading-relaxed italic mb-8">
            At Collins-Curtis Love Ministries Global, we believe love is the
            language of heaven and service is one of the greatest expressions of
            faith. Our prayer is to reach lives across the world with
            compassion, prayer, truth, and practical support.
          </blockquote>
          <p className="text-[#C7A24A] font-semibold uppercase tracking-wide text-sm">
            — Founder, Collins-Curtis Love Ministries Global
          </p>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
              A Message From Our Founder
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#102A4B] font-bold">
              Building Lives Through God's Word
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A24A] mx-auto mt-6" />
          </div>
          <div
            className="rounded-xl p-8 sm:p-12"
            style={{ backgroundColor: "#F4EFE6", border: "1px solid #D7CFBF" }}
          >
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
              Welcome to Collins-Curtis Love Ministries Global. This ministry
              was placed on my heart as a way to share God's love with people
              near and far. Our vision is rooted in compassion, service, prayer,
              and faith. We believe every act of kindness matters, every soul
              matters, and every opportunity to serve is a chance to reflect the
              heart of God.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
              Our desire is to help children, families, veterans, believers, and
              communities through both spiritual support and practical outreach.
              We also believe in creating spaces where people can gather for
              prayer, teaching, worship, revival, and encouragement.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              It is our prayer that this ministry becomes a vessel of healing,
              hope, unity, and love for many across the world. Thank you for
              visiting, praying with us, and supporting this mission.
            </p>
            <p className="text-[#102A4B] font-semibold font-serif text-lg">
              With love and faith,
              <br />
              <span className="text-[#C7A24A]">
                Founder, Collins-Curtis Love Ministries Global
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Get Involved Preview */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "#F4EFE6" }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            Take Action
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#102A4B] font-bold mb-4">
            Get Involved
          </h2>
          <div className="w-16 h-0.5 bg-[#C7A24A] mx-auto mb-8" />
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your generosity helps us serve children, families, veterans, and
            communities in need while advancing prayer, outreach, revival,
            workshops, and global ministry opportunities.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {involvedWays.map((way) => (
              <button
                type="button"
                key={way}
                className="bg-white rounded-lg p-4 text-[#102A4B] font-medium text-sm hover:shadow-sm transition-all cursor-pointer text-left"
                style={{ border: "1px solid #D7CFBF" }}
                onClick={() => navigate("get-involved")}
              >
                {way}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate("get-involved")}
              className="bg-[#C7A24A] text-[#102A4B] font-bold px-10 py-4 rounded-md text-base uppercase tracking-wide hover:bg-[#b08d3a] transition-colors"
            >
              Give One Time
            </button>
            <button
              type="button"
              onClick={() => navigate("get-involved")}
              className="bg-[#102A4B] text-white font-bold px-10 py-4 rounded-md text-base uppercase tracking-wide hover:bg-[#0a1f38] transition-colors"
            >
              Become a Monthly Supporter
            </button>
          </div>
        </div>
      </section>

      {/* Prayer Request Band */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
                Prayer
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#102A4B] font-bold mb-6">
                We're Praying With You
              </h2>
              <div className="w-16 h-0.5 bg-[#C7A24A] mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                No matter what you are facing, you do not have to carry it
                alone. Submit your prayer request and our ministry will stand
                with you in faith.
              </p>
              <div className="space-y-4 text-gray-600">
                {[
                  "Personal prayer and intercession",
                  "Community prayer support",
                  "Faith-based encouragement",
                ].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C7A24A] flex-shrink-0" />
                    <span>{i}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-xl p-8"
              style={{
                backgroundColor: "#F4EFE6",
                border: "1px solid #D7CFBF",
              }}
            >
              <PrayerFormInline />
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Preview */}
      <section className="bg-[#102A4B] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
              Grow in Faith
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
              Mentorship Programs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="rounded-xl p-8 text-center text-white"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="text-[#C7A24A] text-3xl mb-4">✝</div>
              <h3 className="font-serif text-2xl font-bold mb-3">
                Free Community Mentorship
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Open mentorship sessions focused on faith and community support
              </p>
              <ul className="text-white/80 text-sm space-y-2 mb-8 text-left">
                {[
                  "Biblical teaching",
                  "Prayer & encouragement",
                  "Life guidance",
                  "Community support",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#C7A24A]">✓</span> {i}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => navigate("mentorship")}
                className="bg-[#C7A24A] text-[#102A4B] font-bold px-6 py-3 rounded-md uppercase tracking-wide w-full hover:bg-[#b08d3a] transition-colors"
              >
                Join Free Mentorship
              </button>
            </div>
            <div
              className="rounded-xl p-8 text-center text-white"
              style={{
                backgroundColor: "rgba(199,162,74,0.1)",
                border: "1px solid rgba(199,162,74,0.3)",
              }}
            >
              <div className="text-[#C7A24A] text-3xl mb-4">★</div>
              <h3 className="font-serif text-2xl font-bold mb-3">
                1-on-1 Mentorship
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Deeper, personalized guidance for your faith journey
              </p>
              <ul className="text-white/80 text-sm space-y-2 mb-8 text-left">
                {[
                  "One-on-one sessions",
                  "Faith-based life coaching",
                  "Accountability & growth",
                  "Spiritual development",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#C7A24A]">✓</span> {i}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => navigate("mentorship")}
                className="bg-[#C7A24A] text-[#102A4B] font-bold px-6 py-3 rounded-md uppercase tracking-wide w-full hover:bg-[#b08d3a] transition-colors"
              >
                Apply for Mentorship
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
