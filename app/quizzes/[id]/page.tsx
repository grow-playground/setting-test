import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import MarkDown from '@/components/common/markdown/markdown';
import Link from 'next/link';
import ChoiceForm from './_components/choice-form';
import quizOptions from '@/services/quiz/options';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import NotFound from '@/components/common/not-found/not-found';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const quizId = Number(params.id) ?? 0;

  const [quiz, hints] = await Promise.all([
    queryClient.fetchQuery(quizOptions.detail(quizId)),
    queryClient.fetchQuery(quizOptions.hints(quizId)),
    queryClient.fetchQuery(quizOptions.choices(quizId)),
  ]);

  if (quiz) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section className="mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {quiz?.id} {quiz?.title}
            </h1>
            <p>
              By{' '}
              <Link className="underline" href={`/user/${quiz?.users?.id}`}>
                {quiz?.users?.name}
              </Link>
            </p>
          </div>
        </section>
        <MarkDown style={dracula}>{quiz?.description ?? ''}</MarkDown>
        <ChoiceForm quizId={quizId}>
          {hints && hints?.length > 0 ? (
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger>힌트 보기</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-1">
                  {hints?.map((hint) => (
                    <Badge key={hint.id} variant="secondary">
                      {hint.description}
                    </Badge>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : null}
        </ChoiceForm>
      </HydrationBoundary>
    );
  } else {
    return <NotFound />;
  }
}
