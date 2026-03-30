import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import ContactPage from "./pages/ContactPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import HomePage from "./pages/HomePage";
import MentorshipPage from "./pages/MentorshipPage";
import PartnerPage from "./pages/PartnerPage";
import PrayerRequestPage from "./pages/PrayerRequestPage";
import VolunteerPage from "./pages/VolunteerPage";

export type Page =
  | "home"
  | "prayer"
  | "partner"
  | "volunteer"
  | "mentorship"
  | "contact"
  | "get-involved";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navigate={navigate} currentPage={page} />
      <main className="flex-1">
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "prayer" && <PrayerRequestPage />}
        {page === "partner" && <PartnerPage />}
        {page === "volunteer" && <VolunteerPage />}
        {page === "mentorship" && <MentorshipPage />}
        {page === "contact" && <ContactPage />}
        {page === "get-involved" && <GetInvolvedPage navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
      <Toaster richColors position="top-right" />
    </div>
  );
}
