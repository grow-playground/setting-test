import LoadingSpinner from '@/components/common/loading-spinner/loading-spinner';

export default function Loading() {
  return (
    <section className="flex min-h-[90vh] items-center justify-center overflow-hidden">
      <LoadingSpinner size="3xl" className="text-blue-600" />
    </section>
  );
}
