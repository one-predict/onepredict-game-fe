import React from 'react';
import useSession from '@hooks/useSession';

export interface AuthorizedSectionProps {
  children: React.ReactNode;
}

const AuthorizedSection = ({ children }: AuthorizedSectionProps) => {
  const session = useSession();

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default AuthorizedSection;
