import { type Ref, forwardRef } from 'react';

type DimmerProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
};

export default forwardRef(function Dimmer(
  { children, onClick }: DimmerProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center backdrop-brightness-75"
    >
      {children}
    </div>
  );
});
