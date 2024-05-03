import styled from 'styled-components';
import Header from '../Header/Header';
import Layout from '../Layout';
import LayerCard from '../LayerCard';

import bigLogoSrc from '../../assets/big-logo.png';

const StyledLogoLayeredCard = styled(LayerCard)`
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

export interface MenuProps {
  onStartGameClick: () => void;
  userBalance: number;
}

const Menu = ({ userBalance }: MenuProps) => {
  return (
    <Layout>
      <Header userBalance={userBalance} />
      <StyledLogoLayeredCard>
        <Logo src={bigLogoSrc} alt="big-logo" />
      </StyledLogoLayeredCard>
    </Layout>
  );
};

export default Menu;
