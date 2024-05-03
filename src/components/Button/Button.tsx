import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  className?: string;
  kind?: 'primary' | 'secondary';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const StyledButton = styled.button`
  min-width: 180px;
  background: linear-gradient(90deg, #a049c9 0%, #ff00ff 100%);
  border-radius: 12px;
  color: ${({ theme }) => theme.palette.white100Base};
  padding: 8px;
  cursor: pointer;
  outline: 0;
  border: 0;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;

  &:not(:disabled):hover {
    background: linear-gradient(90deg, rgba(160, 73, 201, 0.7) 0%, rgba(255, 0, 255, 0.7) 100%);
  }

  @media (${({ theme }) => theme.devices.tablet}) {
    font-size: 1.5rem;
    padding: 12px;
  }
`;

const Button = ({ children, disabled, className, onClick }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} className={className} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
