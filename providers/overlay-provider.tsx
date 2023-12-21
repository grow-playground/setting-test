'use client';

import { OverlayProvider as OlProvider } from '@toss/use-overlay';

type OverlayProviderPropsType = {
  children: React.ReactNode;
};

export default function OverlayProvider({
  children,
}: OverlayProviderPropsType) {
  return <OlProvider>{children}</OlProvider>;
}
