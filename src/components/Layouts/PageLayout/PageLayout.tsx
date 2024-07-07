import { ReactNode } from 'react';
import styled from 'styled-components';

import backgroundDesktopSrc from '@assets/background-desktop.png';
import backgroundMobileSrc from '@assets/background-mobile.png';

interface PageLayoutProps {
  children?: ReactNode;
}

const StyledPageLayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url(${backgroundMobileSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow: auto;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    flex-direction: row;
    background: url(${backgroundDesktopSrc});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
`;

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <StyledPageLayoutContainer>
      {children}
    </StyledPageLayoutContainer>
  );
};

export default PageLayout;
