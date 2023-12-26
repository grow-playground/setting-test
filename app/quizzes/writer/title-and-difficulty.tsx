import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Inputs, formLiteral } from './writer-form-schema';

type TitleAndDifficultyProps = {
  form: ReturnType<typeof useForm<Inputs>>;
};

export default function TitleAndDifficulty({ form }: TitleAndDifficultyProps) {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  return (
    <>
      <div className="flex justify-between gap-4">
        <section className="grow">
          <Label
            className="mb-2 inline-block text-lg font-bold"
            htmlFor="title"
          >
            제목
          </Label>
          <Input
            {...register('title')}
            className="bg-white"
            id="title"
            placeholder="제목을 입력해주세요"
            autoComplete="off"
            maxLength={formLiteral.title.max.value}
          />
        </section>
        <section className="w-24">
          <Label
            className="mb-2 inline-block text-lg font-bold"
            htmlFor="difficulty"
          >
            난이도
          </Label>
          <Select
            onValueChange={(value) => {
              setValue('difficulty', value as Inputs['difficulty']);
              trigger(['difficulty']);
            }}
          >
            <SelectTrigger className="bg-white" id="difficulty">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent {...register('difficulty')}>
              <SelectItem value="easy">쉬움</SelectItem>
              <SelectItem value="medium">보통</SelectItem>
              <SelectItem value="hard">어려움</SelectItem>
            </SelectContent>
          </Select>
        </section>
      </div>
      {errors.title && (
        <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
      )}
      {errors.difficulty && (
        <p className="mt-2 text-sm text-red-500">{errors.difficulty.message}</p>
      )}
    </>
  );
}
