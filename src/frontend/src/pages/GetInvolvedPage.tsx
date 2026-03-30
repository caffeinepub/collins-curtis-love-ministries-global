import type { Page } from "../App";

interface Props {
  navigate: (page: Page) => void;
}

export default function GetInvolvedPage({ navigate }: Props) {
  const ways = [
    {
      title: "Donate",
      desc: "Your financial gift directly supports outreach, food programs, veteran support, and global ministry.",
      action: "Give Now",
      page: "get-involved" as Page,
    },
    {
      title: "Volunteer",
      desc: "Give your time and talents to serve through events, outreach programs, and ministry initiatives.",
      action: "Sign Up",
      page: "volunteer" as Page,
    },
    {
      title: "Partner With Us",
      desc: "Join our network as a church, organization, or individual partner and expand God's kingdom.",
      action: "Partner",
      page: "partner" as Page,
    },
    {
      title: "Invite a Speaker",
      desc: "Bring a Collins-Curtis Love Ministries speaker to your church, school, or gathering.",
      action: "Request",
      page: "contact" as Page,
    },
    {
      title: "Sponsor an Event",
      desc: "Sponsor workshops, outreach efforts, revival gatherings, or community concerts.",
      action: "Sponsor",
      page: "contact" as Page,
    },
    {
      title: "Join Bible Study",
      desc: "Participate in weekly and monthly Bible study, prayer services, and discipleship workshops.",
      action: "Join",
      page: "mentorship" as Page,
    },
    {
      title: "Submit a Prayer Request",
      desc: "No matter what you're facing, you don't have to carry it alone. We're praying with you.",
      action: "Submit",
      page: "prayer" as Page,
    },
    {
      title: "Support the Mission",
      desc: "Become a monthly Love Partner and sustain the mission of reaching nations and changing lives.",
      action: "Give Monthly",
      page: "get-involved" as Page,
    },
  ];

  return (
    <div>
      <div className="bg-[#102A4B] text-white py-20 text-center">
        <p className="text-[#C7A24A] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
          Take Action
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">
          Get Involved
        </h1>
        <p className="text-white/70 mt-4 max-w-xl mx-auto leading-relaxed">
          Your generosity helps us serve children, families, veterans, and
          communities in need while advancing prayer, outreach, revival, and
          global ministry opportunities.
        </p>
        <div className="w-16 h-0.5 bg-[#C7A24A] mx-auto mt-6" />
      </div>

      <div className="py-16" style={{ backgroundColor: "#F4EFE6" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {ways.map((w) => (
              <div
                key={w.title}
                className="bg-white rounded-xl p-6 hover:shadow-md transition-all"
                style={{ border: "1px solid #D7CFBF" }}
              >
                <div className="text-[#C7A24A] text-xl mb-3">✝</div>
                <h3 className="font-serif text-[#102A4B] font-bold text-lg mb-2">
                  {w.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {w.desc}
                </p>
                <button
                  type="button"
                  onClick={() => navigate(w.page)}
                  className="text-[#C7A24A] font-semibold text-sm hover:underline"
                >
                  {w.action} →
                </button>
              </div>
            ))}
          </div>

          {/* Donation CTA */}
          <div className="bg-[#102A4B] rounded-2xl p-10 sm:p-16 text-center text-white">
            <div className="text-[#C7A24A] text-3xl mb-6">✝</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Support This Ministry
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
              Every gift — large or small — makes an eternal difference. Your
              support enables us to reach children, families, veterans, and
              communities around the world with God's love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Donation link coming soon. Thank you for your generous heart!",
                  )
                }
                className="bg-[#C7A24A] text-[#102A4B] font-bold px-10 py-4 rounded-md text-base uppercase tracking-wide hover:bg-[#b08d3a] transition-colors"
              >
                Give One Time
              </button>
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Monthly giving link coming soon. God bless you for your commitment!",
                  )
                }
                className="bg-white/10 border-2 border-white text-white font-bold px-10 py-4 rounded-md text-base uppercase tracking-wide hover:bg-white hover:text-[#102A4B] transition-colors"
              >
                Become a Monthly Love Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
