import React, { useState,ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode; // Ensure to import ReactNode
  }

const ScalesSelector = (props: ModalProps) => {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-button" onClick={props.onClose}>
              X
            </button>
            <div className="modal-content">{props.children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScalesSelector;
