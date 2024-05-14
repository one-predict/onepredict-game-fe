import React from 'react';
import { Navigate } from 'react-router-dom';
import useSession from '@hooks/useSession';
import LoadingPage from '@app/pages/LoadingPage';

export interface UnauthorizedSectionProps {
  children: React.ReactNode;
}

const UnauthorizedSection = ({ children }: UnauthorizedSectionProps) => {
  const session = useSession();

  if (session === undefined) {
    return (
      <LoadingPage />
    );
  }

  if (session) {
    return (
      <Navigate to="/" />
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export default UnauthorizedSection;
