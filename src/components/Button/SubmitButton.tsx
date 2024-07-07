import styled from 'styled-components';
import Button, { ButtonProps } from './Button';
import CheckedIcon from '@assets/icons/checked-circle.svg?react';

const StyledButton = styled(Button)`
  padding: 10px 12px;
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  margin-right: 8px;
`;

const SubmitButton = ({ children, ...restProps }: ButtonProps) => {
  return (
    <StyledButton {...restProps}>
      <StyledCheckedIcon />
      {children}
    </StyledButton>
  );
};

export default SubmitButton;
