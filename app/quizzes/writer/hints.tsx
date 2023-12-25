'use client';

import { useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Inputs } from './writer-form';

interface HintsProps {
  form: ReturnType<typeof useForm<Inputs>>;
}

export default function Hints({ form }: HintsProps) {
  const { control } = form;

  const {
    append,
    fields: hints,
    remove,
  } = useFieldArray({ control, name: 'hints' });

  const inputRef = useRef<HTMLInputElement>(null);

  const addHint = () => {
    if (!inputRef.current || !inputRef.current.value) {
      return;
    }

    const value = inputRef.current.value;
    inputRef.current.value = '';

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
          id="hint"
          autoComplete="off"
          ref={inputRef}
          onKeyDown={(e) => e.key === 'Enter' && addHint()}
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => addHint()}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="mt-2 flex gap-2">
        {hints.map((hint, idx) => (
          <Badge
            key={idx}
            className="flex items-center gap-1"
            variant="secondary"
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
    </>
  );
}
