'use client';

import FullButton from '@/components/common/buttons/full-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@/components/ui/skeleton';

type CommentsProps = {
  disable: boolean;
};

const FormSchema = z.object({
  content: z.string().min(1, {
    message: '댓글을 입력해주세요.',
  }),
});

export default function Comments({ disable }: CommentsProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data, '댓글 생성');
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">댓글 (30)</h3>

      <form className="mb-8" onSubmit={form.handleSubmit(onSubmit)}>
        <Textarea
          {...form.register('content')}
          disabled={disable}
          placeholder={
            disable ? '회원만 이용 가능합니다.' : '댓글을 입력해주세요.'
          }
        />
        <FullButton>제출</FullButton>
      </form>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <Skeleton className="h-10 w-10 rounded-full" />
              <AvatarFallback>
                <Skeleton className="h-10 w-10 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div>jgjgill</div>
          </div>
          <span className="text-sm text-slate-500">Jun 12, 2023</span>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
          animi eaque consequuntur magnam voluptates architecto, ipsa accusamus
          ex recusandae vero, assumenda porro aut eum earum eligendi sapiente
          unde illo hic?
        </p>
      </div>
    </div>
  );
}
