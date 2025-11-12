export type OnboardingStep = 'welcome' | 'import' | 'dashboard';
export type ImportMethod = 'extension' | 'file' | null;

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  tags?: string[];
  createdAt?: string;
}

export interface OnboardingState {
  step: OnboardingStep;
  hasCompletedOnboarding: boolean;
  importMethod: ImportMethod;
}