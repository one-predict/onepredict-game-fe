import styled from 'styled-components';
import logoSrc from '../../assets/logo.png';
import Typography from '../Typography';

const StyledHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background: #00000080;
  z-index: 3;
  padding: 0 24px;

  @media (${({ theme }) => theme.devices.tablet}) {
    height: 86px;
    padding: 0 120px;
  }
`;

const StyledLogo = styled.img`
  width: 36px;
  height: 36px;

  @media (${({ theme }) => theme.devices.tablet}) {
    height: 46px;
    width: 46px;
  }
`;

const StyledTypography = styled(Typography)`
  color: white;
`;

export interface HeaderProps {
  userBalance: number;
}

const Header = ({ userBalance }: HeaderProps) => {
  return (
    <StyledHeaderContainer>
      <StyledLogo src={logoSrc} alt="logo" />
      <div>
        <StyledTypography>Wallet</StyledTypography>
        <StyledTypography>{userBalance || '0'}</StyledTypography>
      </div>
    </StyledHeaderContainer>
  );
};

export default Header;
