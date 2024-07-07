import styled, { keyframes } from 'styled-components';

export interface LoaderProps {
  className?: string;
}

const LoaderKeyframes = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const StyledLoader = styled.div`
  display: grid;
  width: 80px;
  aspect-ratio: 1;
  animation: ${LoaderKeyframes} 4s infinite;

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    border: 8px solid;
    border-radius: 50%;
    border-color: #2CD8D5 #2CD8D5 #6B8DD6 #6B8DD6;
    mix-blend-mode: darken;
    animation: ${LoaderKeyframes} 1s infinite linear;
  }
  
  &::after {
    border-color: #6B8DD6 #6B8DD6 #8E37D7 #8E37D7;
    animation-direction: reverse;
  }
  
  @media (${({ theme }) => theme.devices.tablet}) {
    width: 120px;
    height: 120px;
  }
`;

const Loader = ({ className }: LoaderProps) => {
  return <StyledLoader className={className} />;
};

export default Loader;
