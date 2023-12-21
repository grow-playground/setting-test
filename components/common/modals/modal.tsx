type ModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function Modal({ open, onClose, onConfirm }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="flex h-40 w-40 flex-col justify-end rounded bg-white">
      <div className="mt-auto">나는 테스트 모달입니다.</div>

      <div className="mt-auto flex gap-2">
        <button onClick={onClose} className="w-full text-center">
          나는 취소
        </button>
        <button onClick={onConfirm} className="w-full text-center">
          나는 확인
        </button>
      </div>
    </div>
  );
}
