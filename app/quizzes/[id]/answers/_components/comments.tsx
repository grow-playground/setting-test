'use client';

import FullButton from '@/components/common/buttons/full-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCommentsOfQuiz } from '@/services/comment/hooks';
import dayjs from 'dayjs';

type CommentsProps = {
  disable: boolean;
  quizId: number;
};

const FormSchema = z.object({
  content: z.string().min(1, {
    message: '댓글을 입력해주세요.',
  }),
});

export default function Comments({ disable, quizId }: CommentsProps) {
  const { data: comments = [] } = useGetCommentsOfQuiz(quizId);

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data, '댓글 생성');
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">댓글 ({comments?.length})</h3>

      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register('content')}
          disabled={disable}
          placeholder={
            disable ? '회원만 이용 가능합니다.' : '자유롭게 의견을 남겨주세요.'
          }
        />
        <FullButton disabled={disable || isLoading}>제출</FullButton>
        <p className="mt-4 text-destructive">{errors.content?.message}</p>
      </form>
      <>
        {comments?.map((comment) => (
          <div className="flex flex-col gap-4" key={comment.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <AvatarFallback>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <span className="max-w-[150px] truncate">
                  {comment.users?.name}
                </span>
              </div>
              <span className="text-sm text-slate-500">
                {dayjs('2023-12-26T14:05:45.449Z').format('MMM DD, YYYY')}
              </span>
            </div>

            <p>{comment.content}</p>
          </div>
        ))}
      </>
    </div>
  );
}
