import React from 'react';

function useCloseByEscape (isOpen, onClose) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleCloseByEscape = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        onClose();
      }
    };

    document.addEventListener("keydown", handleCloseByEscape);
    return () => document.removeEventListener("keydown", handleCloseByEscape);
  }, [isOpen, onClose]);
}

export default useCloseByEscape;

