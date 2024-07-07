import { useState } from 'react';
import styled from 'styled-components';
import { PageLayoutWithMenu } from '@components/Layouts';
import { GradientTypography } from '@components/Typography';
import UserBadge from '@components/UserBadge';
import CircularWidget from '@components/CirclularWidget';
import TapVideoGame from '@components/TapVideoGame';

import bigLogoSrc from '@assets/big-logo.png';

const StyledCircularWidget = styled(CircularWidget)`
  margin: 160px auto 50px;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    margin-top: 250px;
  }
`;

const StyledBigLogoImage = styled.img`
  width: 100px;
  height: 100px;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    width: 140px;
    height: 140px;
  }
`;

const HomePage = () => {
  const [isTapGameStarted, setIsTapGameStarted] = useState(false);

  return (
    <PageLayoutWithMenu>
      <UserBadge />
      <StyledCircularWidget onClick={() => setIsTapGameStarted(true)}>
        <StyledBigLogoImage src={bigLogoSrc} alt="big-logo" />
        <GradientTypography variant="h3">Play AIPICK</GradientTypography>
      </StyledCircularWidget>
      {isTapGameStarted && <TapVideoGame onClose={() => setIsTapGameStarted(false)} />}
    </PageLayoutWithMenu>
  );
};

export default HomePage;
