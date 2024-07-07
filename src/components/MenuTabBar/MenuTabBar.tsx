import { ReactNode } from 'react';
import styled from 'styled-components';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import Typography from '@components/Typography';
import HomeIcon from '@assets/icons/home.svg?react';
import FolderIcon from '@assets/icons/folder.svg?react';
import VsIcon from '@assets/icons/vs.svg?react';
import CupIcon from '@assets/icons/cup.svg?react';

import smallLogoSrc from '@assets/small-logo.png';

interface MenuSection {
  title: string;
  icon: ReactNode;
  path: string;
  exact?: boolean;
}

export interface MenuTabProps {
  className?: string;
}

const StyledMenuTabBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 77px;
  min-height: 77px;
  padding: 0 8px;
  background: #2E0B67CC;
  border-top: 1px solid #8C8498;

  @media (${({ theme }) => theme.devices.tablet}) {
    display: flex;
    flex-direction: column;
    width: 312px;
    min-width: 312px;
    height: 100%;
    padding: 16px 16px 16px 0;
    border-right: 1px solid #8C8498;
  }
`;

const StyledMenuSectionTitle = styled(Typography)`
  font-size: 0.625rem;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    font-size: 1rem;
  }
`;

const StyledMenuLogoContainer = styled.div`
  display: none;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    display: flex;
    flex-direction: column;;
    align-items: center;
    padding: 10px 0;
  }
`;

const StyledMenuLogoImage = styled.img`
  width: 48px;
  height: 48px;
`;

const StyledMenuSectionContainer = styled.div<{ $selected?: boolean; }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 2px;
  width: 100%;
  margin: 12px 0;
  cursor: pointer;

  & > svg {
    width: 24px;
    height: 24px;
    
    ${({ $selected }) => $selected && `
      stroke: #2CD8D5;
    `}
  }
  
  ${StyledMenuSectionTitle} {
    ${({ $selected }) => $selected && `
      background: -webkit-linear-gradient(90deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
  }
  
  &:after {
    visibility: ${({ $selected }) => $selected ? 'visible' : 'hidden'};
    content: '';
    position: absolute;
    top: -12px;
    width: 100%;
    height: 1px;
    background: linear-gradient(111.04deg, #2CD8D5 0%, #6B8DD6 47.26%, #8E37D7 98.45%);
  }
  
  @media (${({ theme }) => theme.devices.tablet}) {
    flex-direction: row;
    column-gap: 12px;
    align-items: center;
    height: 60px;
    margin: 0;
    padding-left: 22px;
    
    &:after {
      top: 100%;
      left: 0;
    }
  }
`;

const sections: MenuSection[] = [{
  title: 'Home',
  icon: <HomeIcon />,
  path: '/',
  exact: true,
}, {
  title: 'Portfolio',
  icon: <FolderIcon />,
  path: '/portfolios',
}, {
  title: 'PvP',
  icon: <VsIcon />,
  path: '/battles'
}, {
  title: 'Tournaments',
  icon: <CupIcon />,
  path: '/tournaments'
}];

const MenuTabBar = ({ className }: MenuTabProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledMenuTabBarContainer className={className}>
      <StyledMenuLogoContainer>
        <StyledMenuLogoImage src={smallLogoSrc} alt="small-logo" />
      </StyledMenuLogoContainer>
      {sections.map((item, index) => {
        const match = matchPath({
          path: item.path,
          end: item.exact,
        }, location.pathname);

        return (
          <StyledMenuSectionContainer
            key={item.title}
            $selected={!!match}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <StyledMenuSectionTitle variant="body2" key={index}>
              {item.title}
            </StyledMenuSectionTitle>
          </StyledMenuSectionContainer>
        );
      })}
    </StyledMenuTabBarContainer>
  );
};

export default MenuTabBar;
