import React from 'react';
import styled from 'styled-components';
import { Modal as MuiModal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

export interface ModalProps {
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 0;
  padding: 24px;
  background-color: #151727;
  border: 1px solid ${({ theme }) => theme.palette.brightPink};

  @media (${({ theme }) => theme.devices.tablet}) {
    padding: 32px;
    width: 546px;
  }

  @media (${({ theme }) => theme.devices.desktop}) {
    width: 800px;
  }
`;

const CloseMark = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.brightPink};
  font-size: 1.25rem;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    font-size: 1.5rem;
  }
`;

const Modal = ({ children, className, onClose }: ModalProps) => {
  return (
    <MuiModal
      open
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      onClose={() => {}}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in>
        <StyledBox className={className}>
          <CloseMark onClick={onClose}>X</CloseMark>
          {children}
        </StyledBox>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
