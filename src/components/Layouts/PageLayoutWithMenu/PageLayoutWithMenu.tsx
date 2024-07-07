import { ReactNode } from 'react';
import styled from 'styled-components';
import MenuTabBar from '@components/MenuTabBar';
import NavigationHeader from '@components/NavigationHeader';
import { PageLayout } from '@components/Layouts';

interface PageLayoutWithMenuProps {
  pageTitle?: string;
  backHref?: string;
  children?: ReactNode;
}

const StyledMenuTabBar = styled(MenuTabBar)`
  order: 1;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    order: 0;
  }
`;

const StyledNavigationHeader = styled(NavigationHeader)`
  position: sticky;
  top: -16px;
  display: flex;
  width: 100%;
  min-height: 77px;
  padding-top: 10px;
  margin-top: -16px;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  @media (${({ theme }) => theme.devices.tablet}) {
    display: none;
  }
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 16px;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    padding: 32px;
  }
`;

const PageLayoutWithMenu = ({ children, pageTitle, backHref }: PageLayoutWithMenuProps) => {
  return (
    <PageLayout>
      <StyledMenuTabBar />
      <StyledInnerContainer>
        {pageTitle && backHref && <StyledNavigationHeader title={pageTitle} backHref={backHref} />}
        {children}
      </StyledInnerContainer>
    </PageLayout>
  );
};

export default PageLayoutWithMenu;
