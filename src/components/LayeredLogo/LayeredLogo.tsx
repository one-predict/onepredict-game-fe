import styled from 'styled-components';
import LayeredCard from '@app/components/LayeredCard';
import bigLogoSrc from '@app/assets/big-logo.png';

const StyledLogoLayeredCard = styled(LayeredCard)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 85px 36px 96px 36px;
`;

const Logo = styled.img`
  width: 190px;
  height: 190px;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 250px;
    height: 250px;
  }

  @media (${({ theme }) => theme.devices.laptop}) {
    width: 377px;
    height: 377px;
  }
`;

const LayeredLogo = () => {
  return (
    <StyledLogoLayeredCard>
      <Logo src={bigLogoSrc} alt="big-logo" />
    </StyledLogoLayeredCard>
  );
};

export default LayeredLogo;
