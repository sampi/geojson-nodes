import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

interface DialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

interface StyledDialogElementProps {
  $isOpen: boolean;
  $isClosing: boolean;
}

const fadeInScaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOutScaleDown = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const fadeOutBackdrop = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.5);
  }
  to {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const StyledDialog = styled.dialog<StyledDialogElementProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  border-radius: var(--space-unit);
  opacity: 0;
  transform: scale(0.9);

  background: var(--color-background-glass);
  border-radius: var(--border-radius-glass);
  box-shadow: var(--box-shadow-glass);
  backdrop-filter: var(--backdrop-filter-glass);
  border: var(--border-glass);

  ${(props) =>
    props.$isOpen &&
    css`
      animation: ${fadeInScaleUp} 0.3s forwards;
    `}

  ${(props) =>
    props.$isClosing &&
    css`
      animation: ${fadeOutScaleDown} 0.3s forwards;
    `}

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    ${(props) =>
      props.$isClosing &&
      css`
        animation: ${fadeOutBackdrop} 0.3s forwards;
      `}
  }
`;

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen && !dialogElement.open) {
      setIsClosing(false);
      dialogElement.showModal();
    } else if (!isOpen && dialogElement.open && !isClosing) {
      setIsClosing(true);
      dialogElement.addEventListener(
        "animationend",
        () => {
          dialogElement.close();
          setIsClosing(false);
        },
        { once: true },
      );
    }
  }, [isOpen, isClosing]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      const handleDialogCloseEvent = () => {
        if (!dialogElement.open && isOpen) {
          onClose();
          setIsClosing(false);
        }
      };
      dialogElement.addEventListener("close", handleDialogCloseEvent);
      return () => {
        dialogElement.removeEventListener("close", handleDialogCloseEvent);
      };
    }
  }, [isOpen, onClose]);

  return (
    <StyledDialog ref={dialogRef} $isOpen={isOpen} $isClosing={isClosing}>
      {children}
    </StyledDialog>
  );
};
