import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Quiz } from './quiz';
import { getQuiz } from '@/hooks/quiz';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default async function Page() {
  const queryClient = new QueryClient();

  const quiz = await queryClient.fetchQuery({
    queryKey: ['quiz'],
    queryFn: getQuiz,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>나는 서버 컴포넌트에서 불러온 값!</div>
      <div className="break-all">{JSON.stringify(quiz)}</div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>관련 키워드</AccordionTrigger>
          <AccordionContent>유니언 타입</AccordionContent>
          <AccordionContent>인터페이스</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Quiz />
    </HydrationBoundary>
  );
}
