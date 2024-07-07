import styled, {keyframes} from 'styled-components';
import { PageLayout } from '@components/Layouts';

import bigLogoSrc from '@assets/big-logo.png';

const WaveAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  
  50% {
    transform: scale(1.2);
  }
  
  100% {
    transform: scale(1);
  }
`;

const StyledWave = styled.div`
  position: absolute;
  border-radius: 50%;
  animation: ${WaveAnimation} 1.5s infinite;
`;

const FirstWave = styled(StyledWave)`
  width: 100%;
  height: 100%;
  border: 2px solid #8C8498;
`;

const SecondWave = styled(StyledWave)`
  width: 120%;
  height: 120%;
  border: 2px solid #8C8498CC;
`;

const ThirdWave = styled(StyledWave)`
  width: 140%;
  height: 140%;
  border: 2px solid #8C849866;
`;

const FourthWave = styled(StyledWave)`
  width: 160%;
  height: 160%;
  border: 2px solid #8C849833;
`;

const StyledLoader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 200px;
  width: 200px;
  background: linear-gradient(139.83deg, rgba(220, 216, 255, 0.2) 13.92%, rgba(10, 0, 104, 0.2) 86.22%);
  box-shadow: 0 0 10px 0 #08042C inset;
  cursor: pointer;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    height: 250px;
    width: 250px;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const LoadingPage = () => {
  return (
    <PageLayout>
      <StyledLoader>
        <FirstWave />
        <SecondWave />
        <ThirdWave />
        <FourthWave />
        <Logo src={bigLogoSrc} alt="Logo" />
      </StyledLoader>
    </PageLayout>
  );
};

export default LoadingPage;
