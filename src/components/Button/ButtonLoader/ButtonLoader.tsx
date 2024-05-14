import styled, { keyframes, DefaultTheme } from 'styled-components';

export interface ButtonLoaderProps {
  className?: string;
}

const DOT_SIZE = 6;

const DotTransformingKeyframes = keyframes`
  0% {
    transform: translate(0, 3px);
  }

  100% {
    transform: translate(0, -3px);
  }
`;

const DotColorChangeKeyframes = (theme: DefaultTheme) => keyframes`
  0%, 100% {
    background-color: ${theme.palette.darkPurple};
  }

  33% {
    background-color: ${theme.palette.brightPink};
  }

  66% {
    background-color: ${theme.palette.white};
  }
`;

const StyledButtonLoaderContainer = styled.div`
  height: 10px;
  position: relative;
`;

const StyledButtonLoaderDot = styled.div`
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: 50%;
  position: absolute;
  animation: ${DotTransformingKeyframes} 0.8s ease-in-out alternate infinite,
    ${({ theme }) => DotColorChangeKeyframes(theme)} 1.5s linear infinite;
  margin: 0 auto 0;
  transform: translate(0, 3px);
`;

const LeftButtonLoaderDot = styled(StyledButtonLoaderDot)`
  left: calc(50% - ${DOT_SIZE * 0.5}px - ${DOT_SIZE * 2}px);
  animation-delay: 0.48s;
`;

const MiddleButtonLoaderDot = styled(StyledButtonLoaderDot)`
  left: calc(50% - ${DOT_SIZE * 0.5}px);
  animation-delay: 0.32s;
`;

const RightButtonLoaderDot = styled(StyledButtonLoaderDot)`
  left: calc(50% - ${DOT_SIZE * 0.5}px + ${DOT_SIZE * 2}px);
  animation-delay: 0.16s;
`;

const ButtonLoader = ({ className }: ButtonLoaderProps) => {
  return (
    <StyledButtonLoaderContainer className={className}>
      <LeftButtonLoaderDot />
      <MiddleButtonLoaderDot />
      <RightButtonLoaderDot />
    </StyledButtonLoaderContainer>
  );
};

export default ButtonLoader;
