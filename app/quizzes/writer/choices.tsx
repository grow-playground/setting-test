'use client';

import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Inputs } from './writer-form';
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import Markdown from '@/components/common/markdown/markdown';

interface ChoicesProps {
  form: ReturnType<typeof useForm<Inputs>>;
}

export default function Choices({ form }: ChoicesProps) {
  const { watch, setValue } = form;

  return (
    <>
      <Label className="grow text-lg font-bold">선택지</Label>
      {Array.from({ length: 4 }).map((_, index) => (
        <Accordion type="multiple" key={index}>
          <AccordionItem value={`item-${index + 1}`}>
            <AccordionTrigger className="py-2">{index + 1}번</AccordionTrigger>
            <AccordionContent className="p-2">
              <MDEditor
                placeholder="선택지를 입력해주세요"
                value={watch(`choices.${index}.value`)}
                onChange={(value) =>
                  setValue(`choices.${index}.value`, value ?? '')
                }
                hideToolbar
                height={110}
                preview="edit"
              />
              <Markdown className="min-h-[2rem]">
                {watch(`choices.${index}.value`) ?? ''}
              </Markdown>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
}
