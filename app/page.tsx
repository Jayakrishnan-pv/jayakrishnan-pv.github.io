"use client";

import React, { useEffect, useRef, useState } from "react";
import { SOCIAL_LINKS } from "@/constants/site";
import type {
  WindowButtonProps,
  EmailInputProps,
  ProgressBarProps,
  SocialLinkProps,
  WindowControlsProps,
  TypingEffectProps,
  EmailFormProps,
  BootingScreenProps,
  MainContentProps,
  WindowState,
  TerminalWindowProps,
} from "@/constants/commonTypes";

// ==================== ATOMS ====================

// SVG Icon for LinkedIn
const LinkedInIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// SVG Icon for GitHub
const GitHubIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// Window Control Button Atom
const WindowButton: React.FC<WindowButtonProps> = ({ color, symbol, onClick, isTerminated }) => {
  // Avoid Tailwind purging by mapping explicit classes instead of template string
  const colorClass =
    color === "red"
      ? "bg-red-500"
      : color === "yellow"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <button
      onClick={onClick}
      className={`group w-3 h-3 ${colorClass} rounded-full flex items-center justify-center hover:brightness-125 transition-all`}
    >
      <span className="text-black text-xs font-bold opacity-0 group-hover:opacity-100">
        {isTerminated && color === "green" ? "⟳" : symbol}
      </span>
    </button>
  );
};

// Email Input Atom
const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, placeholder, onEnterPress }) => (
  <input
    type="email"
    value={value}
    onChange={onChange}
    onKeyDown={(e) => e.key === "Enter" && onEnterPress && onEnterPress()}
    placeholder={placeholder}
    className="w-full flex-1 px-4 py-2 text-white bg-transparent border-b-2 border-green-500/50 focus:outline-none focus:border-green-500 transition-all duration-300 placeholder-white/30"
    required
  />
);

// Submit Button Atom
const SubmitButton: React.FC<React.PropsWithChildren> = ({ children }) => (
  <button className="w-full sm:w-auto px-6 py-2 bg-green-600/20 border border-green-500 text-green-400 font-bold rounded-md hover:bg-green-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-green-400 transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
    {children}
  </button>
);

// Progress Bar Atom
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full bg-gray-700/50 rounded-full h-2.5 my-4 border border-green-500/20">
    <div
      className="bg-green-500 h-full rounded-full transition-all duration-500 ease-linear"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

// Social Link Atom
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/60 hover:text-green-400 transition-colors duration-300"
  >
    <Icon />
  </a>
);

// ==================== MOLECULES ====================

// Window Controls Molecule
const WindowControls: React.FC<WindowControlsProps> = ({ onWindowState, isTerminated }) => (
  <div className="absolute top-3 left-4 flex space-x-2">
    <WindowButton color="red" symbol="×" onClick={() => onWindowState("close")} />
    <WindowButton color="yellow" symbol="−" onClick={() => onWindowState("minimize")} />
    <WindowButton color="green" symbol="+" onClick={() => onWindowState("maximize")} isTerminated={isTerminated} />
  </div>
);

// Matrix Rain Background Molecule
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1) as number[];

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const render = () => {
      draw();
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-30"></canvas>;
};

// Typing Effect Molecule
const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, onComplete]);

  return <>{displayedText}</>;
};

// Email Form Molecule
const EmailForm: React.FC<EmailFormProps> = ({ email, setEmail, onSubmit, isSubmitted, errorMessage }) => (
  <div className="mt-8 w-full">
    <p className="mb-2">{">"} Enter email to join waitlist:</p>
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <span className="hidden sm:inline-block text-green-400">$</span>
      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onEnterPress={onSubmit}
        placeholder="your-email@domain.com"
      />
      <div onClick={onSubmit}>
        <SubmitButton>git commit -m "Join"</SubmitButton>
      </div>
    </div>
    {isSubmitted && (
      <p className="mt-2 text-cyan-400">{">"} SUCCESS: Email added to the repository watchlist.</p>
    )}
    {errorMessage && <p className="mt-2 text-red-500">{">"} {errorMessage}</p>}
  </div>
);

// Social Links Molecule
const SocialLinks: React.FC = () => (
  <div className="mt-8 border-t border-green-500/20 pt-4 flex items-center justify-center space-x-6">
    <SocialLink href={SOCIAL_LINKS.linkedin} icon={LinkedInIcon} />
    <SocialLink href={SOCIAL_LINKS.github} icon={GitHubIcon} />
  </div>
);

// Booting Screen Molecule
const BootingScreen: React.FC<BootingScreenProps> = ({ progress, onComplete }) => (
  <>
    <p className="text-sm md:text-base">
      {">"} <TypingEffect text="Booting up system... Initializing core modules..." onComplete={onComplete} />
    </p>
    <p className="text-sm md:text-base">
      {">"} System status: <span className="text-yellow-400">PENDING</span>
    </p>
    <ProgressBar progress={progress} />
    <p className="text-sm md:text-base">{">"} Deployment progress: {Math.round(progress)}%</p>
  </>
);

// Terminated Screen Molecule
const TerminatedScreen: React.FC = () => (
  <div className="text-center py-10">
    <p className="text-red-500 text-lg">[SESSION TERMINATED]</p>
    <p className="text-white/70 mt-2">Click the green button to reboot.</p>
  </div>
);

// Main Content Molecule
const MainContent: React.FC<MainContentProps> = ({ isBooting, email, setEmail, handleSubmit, isSubmitted, errorMessage }) => (
  <div className={`transition-opacity duration-1000 ${isBooting ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">A New Project is Compiling</h1>
    <p className="mt-2 text-base md:text-lg text-white/70">
      We're in the final stages of development. Join the waitlist to get early access and release notifications.
    </p>

    <EmailForm
      email={email}
      setEmail={setEmail}
      onSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      errorMessage={errorMessage}
    />

    <SocialLinks />
  </div>
);

// ==================== ORGANISMS ====================

// Terminal Window Organism
const TerminalWindow: React.FC<TerminalWindowProps> = ({
  windowState,
  handleWindowState,
  isBooting,
  progress,
  setIsBooting,
  email,
  setEmail,
  handleSubmit,
  isSubmitted,
  errorMessage,
}) => {
  const mainClasses = `relative z-10 bg-black/70 backdrop-blur-sm border border-green-500/30 rounded-lg shadow-2xl shadow-green-500/10 p-6 md:p-8 transition-all duration-300 ease-in-out ${
    windowState.isMaximized ? "w-[95vw] h-[90vh]" : "w-full max-w-4xl"
  } ${windowState.isMinimized ? "h-12 overflow-hidden" : "h-auto"}`;

  return (
    <main className={mainClasses}>
      <WindowControls onWindowState={handleWindowState} isTerminated={windowState.isTerminated} />

      <div className={`mt-6 transition-opacity duration-300 ${windowState.isMinimized ? "opacity-0" : "opacity-100"}`}>
        {windowState.isTerminated ? (
          <TerminatedScreen />
        ) : (
          <>
            {isBooting && <BootingScreen progress={progress} onComplete={() => setIsBooting(false)} />}

            <MainContent
              isBooting={isBooting}
              email={email}
              setEmail={setEmail}
              handleSubmit={handleSubmit}
              isSubmitted={isSubmitted}
              errorMessage={errorMessage}
            />
          </>
        )}
      </div>
    </main>
  );
};

// ==================== MAIN APP ====================

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [windowState, setWindowState] = useState<WindowState>({
    isMinimized: false,
    isMaximized: false,
    isTerminated: false,
  });

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startProgressAnimation = () => {
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  };

  useEffect(() => {
    startProgressAnimation();
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleWindowState = (action: "minimize" | "maximize" | "close") => {
    switch (action) {
      case "minimize":
        setWindowState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }));
        break;
      case "maximize":
        if (windowState.isTerminated) {
          setWindowState({ isMinimized: false, isMaximized: false, isTerminated: false });
          setIsBooting(true);
          startProgressAnimation();
        } else {
          setWindowState((prev) => ({ ...prev, isMaximized: !prev.isMaximized }));
        }
        break;
      case "close":
        setWindowState((prev) => ({ ...prev, isTerminated: true }));
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      // eslint-disable-next-line no-console
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setErrorMessage("");
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 4000);
    } else {
      setErrorMessage("ERROR: Invalid email format.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a] font-mono text-green-400 p-4">
      <MatrixRain />

      <TerminalWindow
        windowState={windowState}
        handleWindowState={handleWindowState}
        isBooting={isBooting}
        progress={progress}
        setIsBooting={setIsBooting}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        errorMessage={errorMessage}
      />
    </div>
  );
}

