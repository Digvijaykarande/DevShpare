import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import MentorshipHero from "../../components/pages/mentorship/MentorshipHero";
import MentorshipStats from "../../components/pages/mentorship/MentorshipStats";
import UpcomingSessionCard from "../../components/pages/mentorship/UpcomingSessionCard";
import MentorFilters from "../../components/pages/mentorship/MentorFilters";
import MentorCard from "../../components/pages/mentorship/MentorCard";
import BookingModal from "../../components/pages/mentorship/BookingModal";
import BecomeMentorCallout from "../../components/pages/mentorship/BecomeMentorCallout";
import Toast from "../../components/ui/toast";
import { api } from "../../lib/api";

export default function MentorshipPage() {
  const [mentors, setMentors] = useState([]);
  const [mentorStats, setMentorStats] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("");
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("Top rated");
  const [bookingMentor, setBookingMentor] = useState(null);
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimer = useRef(null);

  const notify = (message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2200);
  };

  const isLoggedIn = () => !!localStorage.getItem("devsphere_token");

  // Backend is the single source of truth: no mock mentors, stats or session are mixed in.
  useEffect(() => {
    let mounted = true;

    Promise.all([api.get("/mentors"), api.get("/mentors/stats")])
      .then(([list, stats]) => {
        if (!mounted) return;
        setMentors(
          (list?.mentors || []).map((m) => ({
            ...m,
            id: m._id || m.id,
            tags: m.tags || [],
            rating: m.rating ?? 0,
            sessions: m.sessions ?? 0,
          }))
        );
        setMentorStats(stats?.stats || []);
        setStatus("ready");
      })
      .catch(() => mounted && setStatus("error"));

    // The upcoming session belongs to the signed-in user; nobody else sees one.
    if (isLoggedIn()) {
      api.get("/mentors/sessions/upcoming")
        .then((data) => mounted && setUpcomingSession(data?.session || null))
        .catch(() => {});
    } else {
      setUpcomingSession(null);
    }

    return () => { mounted = false; };
  }, [reloadKey]);

  const reload = () => {
    setStatus("loading");
    setReloadKey((k) => k + 1);
  };

  const filteredMentors = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = mentors.filter((m) => {
      if (expertise && m.expertise !== expertise) return false;
      if (availability && m.availability !== availability) return false;
      if (!term) return true;
      const haystack = `${m.name} ${m.company} ${m.title} ${(m.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(term);
    });

    list = [...list].sort((a, b) =>
      sortBy === "Most sessions" ? b.sessions - a.sessions : b.rating - a.rating
    );

    return list;
  }, [mentors, search, expertise, availability, sortBy]);

  const confirmBooking = async (mentor, slot) => {
    if (!isLoggedIn()) {
      setBookingMentor(null);
      notify("Please sign in to book a session");
      return;
    }
    try {
      const res = await api.post(`/mentors/${mentor._id || mentor.id}/book`, { slot });
      setUpcomingSession(res.session);
      setBookingMentor(null);
      notify(`Booked with ${mentor.name} — ${slot}`);
      reload(); // session counts and stats change after a booking
    } catch (err) {
      setBookingMentor(null);
      notify(err?.data?.error || err?.message || "Booking failed");
    }
  };

  const handleNotify = async (mentor) => {
    if (!isLoggedIn()) {
      notify("Please sign in to get notified");
      return;
    }
    try {
      const res = await api.post(`/mentors/${mentor._id || mentor.id}/notify`);
      notify(res?.message || `We'll email you when ${mentor.name} is back`);
    } catch (err) {
      notify(err?.data?.error || err?.message || "Couldn't save your request");
    }
  };

  // Apply to become a mentor
  const handleApply = async () => {
    if (!localStorage.getItem("devsphere_token")) {
      notify("Please sign in to apply as a mentor");
      return;
    }
    try {
      await api.post("/mentors/apply", { expertise: "", message: "" });
      notify("Mentor application submitted successfully!");
    } catch (err) {
      notify(err?.data?.error || err?.message || "Couldn't submit your application");
    }
  };

  return (
    <div className="max-w-[88rem] mx-auto flex flex-col gap-xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-lg"
      >
        <MentorshipHero />
        {mentorStats.length > 0 && <MentorshipStats stats={mentorStats} />}
      </motion.div>

      <UpcomingSessionCard
        session={upcomingSession}
        onJoin={() => notify(`Joining call with ${upcomingSession?.mentor}`)}
        onReschedule={() => notify("Pick a mentor below to rebook")}
      />

      <MentorFilters
        search={search}
        onSearchChange={setSearch}
        expertise={expertise}
        onExpertiseChange={setExpertise}
        availability={availability}
        onAvailabilityChange={setAvailability}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filteredCount={filteredMentors.length}
        totalCount={mentors.length}
      />

      {status === "loading" ? (
        <div className="text-center py-2xl text-on-surface-variant text-sm">Loading mentors…</div>
      ) : status === "error" ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">Couldn't load mentors</p>
          <p className="text-on-surface-variant text-sm mt-1">Check that the backend is running, then try again.</p>
          <button type="button" onClick={reload} className="mt-md px-md py-xs rounded-lg bg-primary text-on-primary text-sm font-semibold">Retry</button>
        </div>
      ) : filteredMentors.length === 0 ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">
            {mentors.length === 0 ? "No mentors yet" : "No mentors match those filters"}
          </p>
          <p className="text-on-surface-variant text-sm mt-1">
            {mentors.length === 0
              ? "Run node seedMentors.js in the backend to add the starter mentors."
              : "Try clearing a filter or searching a different term."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
          {filteredMentors.map((mentor, i) => (
            <MentorCard
              key={mentor._id || mentor.id}
              mentor={mentor}
              index={i}
              onBook={setBookingMentor}
              onNotify={handleNotify}
            />
          ))}
        </div>
      )}

      <BecomeMentorCallout onApply={handleApply} />

      <BookingModal mentor={bookingMentor} onClose={() => setBookingMentor(null)} onConfirm={confirmBooking} />
      <Toast message={toastMessage} />
    </div>
  );
}