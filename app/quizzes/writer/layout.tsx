import BackHeader from '@/components/common/headers/back-header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <BackHeader />

      <section className="p-4">{children}</section>
    </>
  );
}
