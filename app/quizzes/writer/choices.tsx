'use client';

import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Inputs } from './writer-form-schema';
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import Markdown from '@/components/common/markdown/markdown';

type ChoicesProps = {
  form: ReturnType<typeof useForm<Inputs>>;
};

export default function Choices({ form }: ChoicesProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <>
      <Label className="grow text-lg font-bold">선택지</Label>
      {Array.from({ length: 4 }).map((_, index) => (
        <Accordion type="multiple" key={index}>
          <AccordionItem value={`item-${index + 1}`}>
            <AccordionTrigger>
              <p>
                {index + 1}번{' '}
                <span className="text-sm text-gray-500">
                  ({watch(`choices.${index}.value`)?.length ?? 0}/200)
                </span>
              </p>
            </AccordionTrigger>
            <AccordionContent className="p-2">
              <MDEditor
                placeholder="선택지를 입력해주세요"
                value={watch(`choices.${index}.value`)}
                onChange={(value) =>
                  setValue(`choices.${index}.value`, value ?? '')
                }
                textareaProps={{
                  maxLength: 200,
                }}
                hideToolbar
                height={110}
                preview="edit"
              />
              {watch(`choices.${index}.value`) && (
                <Markdown className="min-h-[2rem]">
                  {watch(`choices.${index}.value`)}
                </Markdown>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      {errors.choices && (
        <div className="mt-2 text-sm text-red-500 empty:hidden">
          {errors.choices.message && <p>{errors.choices.message}</p>}

          {Array.isArray(errors.choices) && (
            <p>
              {errors.choices.find((choice) => choice?.value)?.value?.message}
            </p>
          )}
        </div>
      )}
    </>
  );
}
