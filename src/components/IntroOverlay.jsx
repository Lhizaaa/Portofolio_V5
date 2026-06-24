import React from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "../Pages/WelcomeScreen";

// Wraps the framer-motion intro so that framer-motion + the welcome screen are
// code-split out of the initial bundle. Kept mounted (AnimatePresence handles
// the exit animation internally when `show` flips to false).
const IntroOverlay = ({ show, onDone }) => (
  <AnimatePresence mode="wait">
    {show && <WelcomeScreen onLoadingComplete={onDone} />}
  </AnimatePresence>
);

export default IntroOverlay;
