import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #151727;
`;

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <StyledLayoutContainer>{children}</StyledLayoutContainer>;
};

export default Layout;
