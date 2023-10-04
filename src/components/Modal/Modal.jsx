import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export function Modal({ onCloseModal, children }) {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={onOverlayClick}>
      <div>{children}</div>
    </Overlay>
  );
}

