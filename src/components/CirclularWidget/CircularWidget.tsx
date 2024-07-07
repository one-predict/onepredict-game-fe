import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

export interface CircularWidgetProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

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

const StyledCircularWidgetContainer = styled.div`
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
  
  &:hover {
    ${StyledWave} {
      animation: ${WaveAnimation} 2s infinite;
    }
  }
  
  @media (${({ theme }) => theme.devices.tablet}) {
    height: 250px;
    width: 250px;
  }
`;

const CircularWidget = ({ className, children, onClick }: CircularWidgetProps) => {
  return (
    <StyledCircularWidgetContainer onClick={onClick} className={className}>
      {children}
      <FirstWave />
      <SecondWave />
      <ThirdWave />
      <FourthWave />
    </StyledCircularWidgetContainer>
  );
};

export default CircularWidget;
