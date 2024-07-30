import styled from 'styled-components';
import Typography, { TypographyProps } from './Typography';

export interface GradientTypographyProps extends TypographyProps {
  gradientVariant?: 'primary' | 'secondary';
}

const StyledTypography = styled(Typography)<{
  $gradientVariant: GradientTypographyProps['gradientVariant'];
}>`
  background: ${({ $gradientVariant }) => {
    return $gradientVariant === 'primary'
      ? '-webkit-linear-gradient(90deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%)'
      : '-webkit-linear-gradient(90deg, #2CD8D5 100%, #6B8DD6 100%, #8E37D7 100%)'
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GradientTypography = ({ gradientVariant, ...restProps }: GradientTypographyProps) => {
  return (
    <StyledTypography $gradientVariant={gradientVariant || 'primary'} {...restProps} />
  )
};

export default GradientTypography;
