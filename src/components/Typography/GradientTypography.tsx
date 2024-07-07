import styled from 'styled-components';
import Typography, { TypographyProps } from './Typography';

const StyledTypography = styled(Typography)`
  background: -webkit-linear-gradient(90deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GradientTypography = (props: TypographyProps) => {
  return (
    <StyledTypography {...props} />
  )
};

export default GradientTypography;
