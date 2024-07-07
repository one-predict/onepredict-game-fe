import React from 'react';
import styled from 'styled-components';
import ButtonLoader from './ButtonLoader';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}

const StyledButton = styled.button<{ $loading?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  background: linear-gradient(111.04deg, rgba(44, 216, 213, 0.4) 0%, rgba(107, 141, 214, 0.4) 47.26%, rgba(142, 55, 215, 0.4) 98.45%);
  border: 1px solid #8C8498;
  box-shadow: 0 4px 10px 0 #8B46AB99;
  border-radius: 12px;
  color: ${({ theme }) => theme.palette.white};
  padding: 12px;
  cursor: ${({ $loading }) => ($loading ? 'default' : 'pointer')};
  outline: 0;
  line-height: 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  
  &:not(:disabled):hover {
    background: linear-gradient(111.04deg, #2CD8D5 0%, #6B8DD6 47.26%, #8E37D7 98.45%);
  }
  
  &:focus-visible, &:focus {
    border: 1px solid ${({ theme }) => theme.palette.white};
  }
  
  &:disabled {
    cursor: default;
    opacity: 40%;
  }
`;

const Button = ({
  children,
  disabled,
  className,
  onClick,
  loading,
}: ButtonProps) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      return;
    }

    onClick?.(event);
  }

  return (
    <StyledButton
      $loading={loading}
      onClick={handleButtonClick}
      className={className}
      disabled={disabled}
    >
      {loading ? <ButtonLoader /> : children}
    </StyledButton>
  );
};

export default Button;
