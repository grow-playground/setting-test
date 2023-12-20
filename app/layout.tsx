import { GeistSans } from 'geist/font/sans';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import { PcScreen } from '@/components/pc-screen';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: '타입타임: 타입과 함께 시간을 더욱 가치있게',
  description: '타입스크립트의 세계로 초대합니다!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <QueryProvider>
        <body>
          <div id="background" />
          <PcScreen />

          <div id="app-background" />
          <div id="app-screen" className="bg-white">
            {children}
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}
