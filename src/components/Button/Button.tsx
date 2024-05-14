import React from 'react';
import styled from 'styled-components';
import ButtonLoader from './ButtonLoader';

type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  loading?: boolean;
}

const StyledButton = styled.button<{ $size?: ButtonSize; $loading?: boolean }>`
  position: relative;
  min-width: 180px;
  color: ${({ theme }) => theme.palette.white};
  padding: 8px;
  cursor: ${({ $loading }) => ($loading ? 'default' : 'pointer')};
  outline: 0;
  border: 0;
  font-weight: 400;
  font-size: ${({ $size }) => {
    if ($size === 'small') {
      return `0.75rem`;
    }

    if ($size === 'medium') {
      return `1rem`;
    }

    return `1.125rem`;
  }};

  line-height: 1.5;
  background:
    linear-gradient(to right, ${({ theme }) => theme.palette.brightPink} 1px, transparent 1px) 0 100%,
    linear-gradient(to left, ${({ theme }) => theme.palette.brightPink} 1px, transparent 1px) 100% 0,
    linear-gradient(to bottom, ${({ theme }) => theme.palette.brightPink} 1px, transparent 1px) 100% 0,
    linear-gradient(to top, ${({ theme }) => theme.palette.brightPink} 1px, transparent 1px) 0 100%;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  text-transform: uppercase;

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.palette.darkPurple};
  }

  @media (${({ theme }) => theme.devices.tablet}) {
    font-size: ${({ $size }) => {
      if ($size === 'small') {
        return `1rem`;
      }

      if ($size === 'medium') {
        return `1.5rem`;
      }

      return `2rem`;
    }};

    padding: 12px;
  }
  
  &:disabled {
    cursor: default;
    color: gray;
    background:
      linear-gradient(to right, gray 1px, transparent 1px) 0 100%,
      linear-gradient(to left, gray 1px, transparent 1px) 100% 0,
      linear-gradient(to bottom, gray 1px, transparent 1px) 100% 0,
      linear-gradient(to top, gray 1px, transparent 1px) 0 100%;
    background-repeat: no-repeat;
    background-size: 20px 20px;
  }
`;

const Button = ({
  children,
  disabled,
  className,
  onClick,
  size = 'large',
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
      $size={size}
      onClick={handleButtonClick}
      className={className}
      disabled={disabled}
    >
      {loading ? <ButtonLoader /> : children}
    </StyledButton>
  );
};

export default Button;
