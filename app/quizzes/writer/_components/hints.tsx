'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Inputs, formLiteral } from './writer-form-schema';

type HintsProps = {
  form: ReturnType<typeof useForm<Inputs>>;
};

export default function Hints({ form }: HintsProps) {
  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const {
    append,
    fields: hints,
    remove,
  } = useFieldArray({ control, name: 'hints' });

  const addHint = () => {
    const value = getValues('hintInput');

    if (!value) {
      return;
    }

    setValue('hintInput', '');

    if (hints.some((hint) => hint.value === value)) {
      return;
    }

    append({ value });
  };

  const removeHint = (id: string) => {
    remove(hints.findIndex((hint) => hint.id === id));
  };

  return (
    <>
      <div className="flex w-full space-x-2">
        <Input
          {...register('hintInput')}
          className="bg-white"
          id="hint"
          autoComplete="off"
          placeholder="힌트를 입력해주세요"
          maxLength={formLiteral.hints.item.max.value}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault();
              addHint();
            }
          }}
        />
        <Button
          type="button"
          variant="primary"
          size="icon"
          onClick={() => addHint()}
        >
          <PlusIcon />
        </Button>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        퀴즈를 풀기 위해 학습해야 할 키워드가 있다면 제안해주세요.
      </p>

      {hints && hints.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {hints.map((hint, idx) => (
            <Badge
              key={idx}
              className="flex items-center gap-1"
              variant="default"
            >
              {hint.value}
              <Cross1Icon
                className="cursor-pointer"
                width={10}
                height={10}
                onClick={() => removeHint(hint.id)}
              />
            </Badge>
          ))}
        </div>
      )}

      {errors.hints && (
        <div className="mt-2 text-sm text-red-500 empty:hidden">
          {errors.hints.message && <p>{errors.hints.message}</p>}

          {Array.isArray(errors.hints) && (
            <p>
              {errors.hints.find((choice) => choice?.value)?.value?.message}
            </p>
          )}
        </div>
      )}
    </>
  );
}
