import React from 'react';
import useSession from '@hooks/useSession';
import OnboardingScreen from '@components/OnboardingScreen';

export interface OnboardedSectionProps {
  children: React.ReactNode;
}

const OnboardedSection = ({ children }: OnboardedSectionProps) => {
  const user = useSession();

  if (!user) {
    return null;
  }

  if (!user.onboarded) {
    return <OnboardingScreen />;
  }

  return <>{children}</>;
};

export default OnboardedSection;
