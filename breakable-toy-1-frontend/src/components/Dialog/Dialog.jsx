import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dialog component for displaying a modal dialog.
 * @param {boolean} isOpen - Whether the dialog is open.
 * @param {function} onClose - Function to close the dialog.
 * @param {string} title - Title of the dialog.
 * @param {ReactNode} children - Content to display inside the dialog.
 */
const Dialog = ({ isOpen, onClose, title, children }) => {
  // If the dialog is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        {/* Dialog title */}
        <h2>{title}</h2>

        {/* Close button */}
        <button onClick={onClose} className="dialog-close">X</button>

        {/* Dialog content */}
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};

// Define the expected prop types for the Dialog component
Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dialog;