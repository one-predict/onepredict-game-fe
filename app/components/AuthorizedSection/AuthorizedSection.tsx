import React from 'react';
import useSession from '@hooks/useSession';
import LoadingScreen from '@components/LoadingScreen';

export interface AuthorizedSectionProps {
  children: React.ReactNode;
}

const AuthorizedSection = ({ children }: AuthorizedSectionProps) => {
  const session = useSession();

  if (!session) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthorizedSection;
