import { ReactNode } from 'react';
import styled from 'styled-components';
import Typography from '@components/Typography';

export interface LabeledContentProps {
  title: string;
  children?: ReactNode;
}

const StyledLabeledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  row-gap: 4px;
`;

const StyledLabeledContentTitle = styled(Typography)`
  color: #439CB5;
`;

const LabeledContent = ({ children, title }: LabeledContentProps) => {
  return (
    <StyledLabeledContentContainer>
      <StyledLabeledContentTitle variant="body2">{title}</StyledLabeledContentTitle>
      {children}
    </StyledLabeledContentContainer>
  );
};

export default LabeledContent;
