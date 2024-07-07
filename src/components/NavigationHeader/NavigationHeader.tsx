import {useNavigate, useNavigation} from 'react-router-dom';
import { useCallback } from 'react';
import styled from 'styled-components';
import Typography from '@components/Typography';
import leftArrowIcon from '@assets/icons/left-arrow.svg';

export interface NavigationHeaderProps {
  className?: string;
  title: string;
  backHref: string;
}

const StyledNavigationHeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledLeftArrowIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

const NavigationHeader = ({ className, title, backHref }: NavigationHeaderProps) => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const handleLeftArrowIconClick = useCallback(() => {
    navigate(navigation.location?.state?.['backHref'] ?? backHref);
  }, [navigation, navigate, backHref]);

  return (
    <StyledNavigationHeaderContainer className={className}>
      <StyledLeftArrowIcon onClick={handleLeftArrowIconClick} src={leftArrowIcon} />
      <Typography variant="subtitle1">{title}</Typography>
    </StyledNavigationHeaderContainer>
  );
};

export default NavigationHeader;
