import React from 'react';
import { Navigate } from 'react-router-dom';
import useSession from '@hooks/useSession';
import LoadingPage from '@pages/LoadingPage';

export interface AuthorizedSectionProps {
  children: React.ReactNode;
}

const AuthorizedSection = ({ children }: AuthorizedSectionProps) => {
  const session = useSession();

  if (session === undefined) {
    return (
      <LoadingPage />
    );
  }

  if (session === null) {
    return (
      <Navigate to="/sign-in" />
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export default AuthorizedSection;
