import { useOverlay } from '@toss/use-overlay';
import { useRef } from 'react';
import Modal from './modal';
import Dimmer from './dimmer';

export default function useTempModal() {
  const overlay = useOverlay();
  const ref = useRef<HTMLDivElement>(null);

  const openModal = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => {
        const onClickDimmer = (e: React.MouseEvent) => {
          resolve(false);
          e.target === ref.current ? close() : null;
        };

        const onCloseModal = () => {
          resolve(false);
          close();
        };

        const onConfirmModal = () => {
          resolve(true);
          close();
        };

        return (
          <>
            {isOpen && (
              <Dimmer ref={ref} onClick={onClickDimmer}>
                <Modal
                  open={isOpen}
                  onClose={onCloseModal}
                  onConfirm={onConfirmModal}
                />
              </Dimmer>
            )}
          </>
        );
      });
    });
  };

  return { open: openModal };
}
