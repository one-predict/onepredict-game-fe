import styled, { keyframes } from 'styled-components';

export interface LoaderProps {
  className?: string;
}

const LoaderKeyframes = keyframes`
  0%, 10% {
    background-position: 33.4% 100%, 66.6% 100%;
  }

  40% {
    background-position: 33.4% 0, 100% 100%;
  }
  
  70% {
    background-position: 0 100%, 66.6% 0;
  }

  100% {
    background-position: 33.4% 100%, 66.6% 100%;
  }
`;

const StyledLoader = styled.div`
  display: grid;
  height: 50px;
  aspect-ratio: 1;

  &:before,
  &:after {
    --loader-background: no-repeat linear-gradient(#801f75 0 0);

    content: '';
    background: var(--loader-background), var(--loader-background);
    background-size: 25% 50%;
    animation: ${LoaderKeyframes} 1.5s infinite linear;
  }

  &:after {
    transform: scale(-1);
  }
`;

const Loader = ({ className }: LoaderProps) => {
  return <StyledLoader className={className} />;
};

export default Loader;
