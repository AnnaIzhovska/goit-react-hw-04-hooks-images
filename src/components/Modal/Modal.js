import { useEffect } from "react";
import PropTypes from "prop-types";
import s from './Modal.module.css';

export default function Modal({ onClose, children}) {
 
  useEffect(() => {
    window.addEventListener('keydown', closeModalEsc)
    return () => {
      window.removeEventListener('keydown', handleBackdropClick)
    }
  })

  const closeModalEsc = (e) => {
    if (e.code === 'Escape') {
    onClose();
    }
  };
  const handleBackdropClick = (e) => {
   if (e.target === e.currentTarget) {
     onClose();
    }
  };
    return (
      <div className={s.Overlay} onClick={onClose}>
        <div className={s.Modal}>{children}</div>
      </div>
    )
  }

  Modal.defaultProps = {
  onClose: () => null,
  children: null,
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
}