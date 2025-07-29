"use client";
import React, { useEffect, useRef } from "react";
import SocialIcons from "../molecules/SocialIcons";
import TextScramble from "../../utils/TextScramble";

const headerText = "Coming Soon";
const subHeaderText = "// I'm Building Something Awesome";
const descriptionText = "My new portfolio is currently under construction. I'm working hard to create a unique experience. Stay tuned for the grand unveiling!";

const MainContent: React.FC = () => {
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text scramble animation
    const scramble1 = new (TextScramble as any)(mainHeadingRef.current);
    const scramble2 = new (TextScramble as any)(subHeadingRef.current);
    const scramble3 = new (TextScramble as any)(descriptionRef.current);

    if (
      mainHeadingRef.current &&
      subHeadingRef.current &&
      descriptionRef.current &&
      separatorRef.current &&
      socialIconsRef.current
    ) {
      mainHeadingRef.current.style.opacity = "1";
      subHeadingRef.current.style.opacity = "1";
      descriptionRef.current.style.opacity = "1";
      separatorRef.current.style.opacity = "1";

      Promise.all([
        scramble1.setText(headerText),
        scramble2.setText(subHeaderText),
        scramble3.setText(descriptionText),
      ]).then(() => {
        socialIconsRef.current!.style.opacity = "1";
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10">
      <div>
        <h1
          id="main-heading"
          ref={mainHeadingRef}
          className="text-6xl md:text-8xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500 opacity-0"
        >
          {headerText}
        </h1>
        <p
          id="sub-heading"
          ref={subHeadingRef}
          className="mt-4 text-2xl md:text-4xl text-gray-200 animate-pulse-slow opacity-0 font-bold"
        >
          {subHeaderText}
        </p>
      </div>
      <div
        id="separator"
        ref={separatorRef}
        className="w-24 h-1 bg-red-500 my-10 rounded-full opacity-0 transition-opacity duration-1000"
      ></div>
      <p
        id="description-text"
        ref={descriptionRef}
        className="max-w-2xl text-gray-300 text-xl md:text-2xl opacity-0 font-bold leading-relaxed"
      >
        {descriptionText}
      </p>
      <div
        id="social-icons"
        ref={socialIconsRef}
        className="mt-12 flex space-x-8 opacity-0 transition-opacity duration-1000"
        style={{ transitionDelay: "300ms" }}
      >
        <SocialIcons />
      </div>
    </div>
  );
};

export default MainContent;
