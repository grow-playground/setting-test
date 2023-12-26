type HeaderProps = {
  leftArea?: JSX.Element;
  centerArea?: JSX.Element;
  rightArea?: JSX.Element;
};

export default function Header({
  leftArea,
  centerArea,
  rightArea,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-16 border-b-2 border-slate-50 bg-white">
      <div className="relative h-full">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          {leftArea}
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {centerArea}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {rightArea}
        </div>
      </div>
    </header>
  );
}
