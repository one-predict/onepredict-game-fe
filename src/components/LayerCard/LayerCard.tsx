import { ReactNode } from 'react';
import styled from 'styled-components';

export interface LayerCardProps {
  className?: string;
  children?: ReactNode;
}

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #9a5dee;
`;

const BottomLayer = styled(Layer)`
  top: 4px;
  left: -4px;
  width: 100%;
  height: 100%;

  @media (${({ theme }) => theme.devices.tablet}) {
    top: 9px;
    left: -9px;
  }
`;

const TopLayer = styled(Layer)`
  top: -5px;
  left: 5px;
  width: 100%;
  height: 100%;

  @media (${({ theme }) => theme.devices.tablet}) {
    top: -10px;
    left: 10px;
  }
`;

const Card = styled.div`
  position: relative;
  border: 1px solid #9a5dee;
  padding: 42px;
`;

const LayerCard = ({ children, className }: LayerCardProps) => {
  return (
    <Card className={className}>
      <BottomLayer />
      <TopLayer />
      {children}
    </Card>
  );
};

export default LayerCard;
