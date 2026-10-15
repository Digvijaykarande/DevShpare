import Navbar from "../../components/pages/landing/Navbar";
import Hero from "../../components/pages/landing/Hero";
import StatsBar from "../../components/pages/landing/StatsBar";
import JourneyRibbon from "../../components/pages/landing/JourneyRibbon";
import LearningRoadmaps from "../../components/pages/landing/LearningRoadmaps";
import CommunityQA from "../../components/pages/landing/CommunityQA";
import ProjectsShowcase from "../../components/pages/landing/ProjectsShowcase";
import Mentorship from "../../components/pages/landing/Mentorship";
import ChallengesHackathon from "../../components/pages/landing/ChallengesHackathon";
import Testimonials from "../../components/pages/landing/Testimonials";
import FinalCTA from "../../components/pages/landing/FinalCTA";
import Footer from "../../components/pages/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <main className="w-full">
        <Hero />
        <StatsBar />
        <JourneyRibbon />
        <LearningRoadmaps />
        <CommunityQA />
        <ProjectsShowcase />
        <Mentorship />
        <ChallengesHackathon />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
