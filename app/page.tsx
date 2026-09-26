import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { TrustedBy } from "./components/TrustedBy";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto px-3 md:px-4">
        <Hero />
        <TrustedBy />
        <Services />
        <ProcessTimeline />
        <Projects />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
