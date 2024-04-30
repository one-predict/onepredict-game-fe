import styled from 'styled-components';
import logoSrc from '../../assets/logo.svg';

const StyledHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background: rgb(255, 255, 255, 0.7);
  z-index: 3;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    height: 86px;
  }
`;

const StyledLogo = styled.img`
  margin-left: 16px;
  width: 36px;
  height: 36px;

  @media (${({ theme }) => theme.devices.tablet}) {
    height: 46px;
    width: 46px;
    margin-left: 50px;
  }
`;

const Header = () => {
  return (
    <StyledHeaderContainer>
      <StyledLogo src={logoSrc} alt="logo" />
    </StyledHeaderContainer>
  );
};

export default Header;
