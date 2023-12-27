'use client';

import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Inputs, formLiteral } from './writer-form-schema';
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
    trigger,
    formState: { errors },
  } = form;

  return (
    <>
      <Label className="grow text-lg font-bold">선택지</Label>
      {Array.from({ length: formLiteral.choices.length }).map((_, index) => (
        <Accordion type="multiple" key={index}>
          <AccordionItem value={`item-${index + 1}`}>
            <AccordionTrigger>
              <p>
                {index + 1}번{' '}
                <span className="text-sm text-gray-500">
                  ({watch(`choices.${index}.value`)?.length ?? 0}/
                  {formLiteral.choices.item.max.value})
                </span>
              </p>
            </AccordionTrigger>
            <AccordionContent className="p-2">
              <MDEditor
                placeholder="선택지를 입력해주세요"
                preview="edit"
                hideToolbar
                height={110}
                textareaProps={{
                  maxLength: formLiteral.choices.item.max.value,
                }}
                value={watch(`choices.${index}.value`)}
                onChange={(value) =>
                  setValue(`choices.${index}.value`, value ?? '')
                }
                onBlur={() => trigger(['choices'])}
              />
              {watch(`choices.${index}.value`) && (
                <Markdown className="min-h-[2rem]" wrapLongLines={true}>
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
