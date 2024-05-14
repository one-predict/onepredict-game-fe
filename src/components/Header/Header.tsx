import styled from 'styled-components';
import Typography from '@app/components/Typography';
import useSession from '@app/hooks/useSession';
import logoSrc from '@app/assets/logo.png';

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

const StyledWalletInfo = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
`;

const StyledBalance = styled(Typography)`
  color: #6f5bc0;
`;

const Header = () => {
  const currentUser = useSession();

  return (
    <StyledHeaderContainer>
      <StyledLogo src={logoSrc} alt="logo" />
      {currentUser && (
        <>
          <StyledWalletInfo>
            <Typography>Wallet</Typography>
            <StyledBalance>{currentUser.balance || '0'}</StyledBalance>
          </StyledWalletInfo>
        </>
      )}
    </StyledHeaderContainer>
  );
};

export default Header;
