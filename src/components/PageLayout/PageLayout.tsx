import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@app/components/Header';
import layoutEffectSrc from '@app/assets/layout-effect.png';

interface LayoutProps {
  children?: ReactNode;
  hideHeader?: boolean;
}

const LayoutEffectsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
`;

const FirstLayoutEffect = styled.img`
  width: 626px;
  height: 626px;
  z-index: 0;
  position: absolute;
  top: 30%;
  left: 60%;
`;

const SecondLayoutEffect = styled.img`
  position: absolute;
  z-index: 0;
  top: -50px;
  left: -150px;
  width: 500px;
  height: 500px;
`;

const StyledPageLayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #151727;
  overflow: auto;
  padding: 170px 0 30px;

  @media (${({ theme }) => theme.devices.tablet}) {
    padding-top: 200px;
  }
`;

const PageLayout = ({ children, hideHeader }: LayoutProps) => {
  return (
    <StyledPageLayoutContainer>
      <LayoutEffectsContainer>
        <FirstLayoutEffect src={layoutEffectSrc} />
        <SecondLayoutEffect src={layoutEffectSrc} />
      </LayoutEffectsContainer>
      {!hideHeader && <Header />}
      {children}
    </StyledPageLayoutContainer>
  );
};

export default PageLayout;
