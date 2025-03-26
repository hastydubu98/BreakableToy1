import React from 'react';
import PropTypes from 'prop-types';

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{title}</h2>
        <button onClick={onClose} className="dialog-close">X</button>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dialog;