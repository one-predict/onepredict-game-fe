import React from 'react';
import styled from 'styled-components';
import { Modal as MuiModal } from '@mui/material';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

export interface ModalProps {
  className?: string;
  children: React.ReactNode;
}

const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 0;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  
  @media (${({ theme }) => theme.devices.tablet}) {
    padding: 32px;
    width: 546px;
  }
  
  @media (${({ theme }) => theme.devices.desktop}) {
    width: 800px;
  }
`;

const Modal = ({ children, className }: ModalProps) => {
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
          {children}
        </StyledBox>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
