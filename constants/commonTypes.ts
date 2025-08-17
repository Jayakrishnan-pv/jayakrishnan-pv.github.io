import type React from 'react';

// Shared component types for the app

export type WindowButtonProps = {
  color: "red" | "yellow" | "green";
  symbol: string;
  onClick: () => void;
  isTerminated?: boolean;
};

export type EmailInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onEnterPress?: () => void;
};

export type ProgressBarProps = {
  progress: number;
};

export type SocialLinkProps = {
  href: string;
  icon: React.FC;
};

export type WindowControlsProps = {
  onWindowState: (action: "close" | "minimize" | "maximize") => void;
  isTerminated?: boolean;
};

export type TypingEffectProps = {
  text: string;
  speed?: number;
  onComplete?: () => void;
};

export type EmailFormProps = {
  email: string;
  setEmail: (val: string) => void;
  onSubmit: () => void;
  isSubmitted: boolean;
  errorMessage: string;
};

export type BootingScreenProps = {
  progress: number;
  onComplete?: () => void;
};

export type MainContentProps = {
  isBooting: boolean;
  email: string;
  setEmail: (val: string) => void;
  handleSubmit: () => void;
  isSubmitted: boolean;
  errorMessage: string;
};

export type WindowState = {
  isMinimized: boolean;
  isMaximized: boolean;
  isTerminated: boolean;
};

export type TerminalWindowProps = {
  windowState: WindowState;
  handleWindowState: (action: "minimize" | "maximize" | "close") => void;
  isBooting: boolean;
  progress: number;
  setIsBooting: (v: boolean) => void;
  email: string;
  setEmail: (val: string) => void;
  handleSubmit: () => void;
  isSubmitted: boolean;
  errorMessage: string;
};
