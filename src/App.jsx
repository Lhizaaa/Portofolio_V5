import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, Suspense, lazy } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

// Below-the-fold sections and separate routes are code-split so the initial
// load only ships the hero (Home) + navbar; heavy deps (MUI, Supabase,
// SweetAlert, framer-motion) load lazily as the user scrolls or navigates.
const IntroOverlay = lazy(() => import("./components/IntroOverlay"));
const About = lazy(() => import("./Pages/About"));
const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const NotFoundPage = lazy(() => import("./Pages/404"));

const Footer = () => (
  <footer>
    <center>
      <hr className="my-3 border-line sm:mx-auto lg:my-6 text-center" />
      <span className="block text-sm pb-4 text-muted text-center">
        © 2026{" "}
        <a href="www.lhizaa.my.id" className="hover:underline hover:text-accent">
          LhizaaR™
        </a>
        . All Rights Reserved.
      </span>
    </center>
  </footer>
);

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 z-[100] bg-base" />}>
        <IntroOverlay show={showWelcome} onDone={() => setShowWelcome(false)} />
      </Suspense>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          {/* Each lazy section streams in independently; fallback={null}
              avoids a jarring loader for content below the fold. */}
          <Suspense fallback={null}>
            <About />
          </Suspense>
          <Suspense fallback={null}>
            <Portofolio />
          </Suspense>
          <Suspense fallback={null}>
            <ContactPage />
          </Suspense>
          <Footer />
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <Suspense fallback={<LoadingScreen />}>
    <ProjectDetails />
    <Footer />
  </Suspense>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="*" element={<Suspense fallback={<LoadingScreen />}><NotFoundPage /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
