import React, { useState,ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode; // Ensure to import ReactNode
  }

const ScalesSelector = (props: ModalProps) => {
  const {isOpen, onClose ,children } = props;
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-button" onClick={onClose}>
              X
            </button>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScalesSelector;
