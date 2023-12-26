import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formLiteral = {
  title: {
    min: {
      value: 1,
      message: '제목을 입력해주세요',
    },
    max: {
      value: 30,
      message: '제목은 30자 이하로 입력해주세요',
    },
  },
  summary: {
    min: {
      value: 1,
      message: '한 줄 소개를 입력해주세요',
    },
    max: {
      value: 40,
      message: '한 줄 소개는 40자 이하로 입력해주세요',
    },
  },
  difficulty: {
    item: {
      value: ['easy', 'medium', 'hard'],
      message: '난이도를 선택해주세요',
    },
  },
  hints: {
    min: 0,
    max: {
      value: 10,
      message: '힌트는 10개 이하로 입력해주세요',
    },
    item: {
      min: {
        value: 1,
        message: '힌트를 입력해주세요',
      },
      max: {
        value: 20,
        message: '힌트는 20자 이하로 입력해주세요',
      },
    },
  },
  choices: {
    length: 4,
    item: {
      min: {
        value: 1,
        message: '모든 선택지의 내용을 입력해주세요',
      },
      max: {
        value: 200,
        message: '선택지는 200자 이하로 입력해주세요',
      },
    },
  },
  answer: {
    required_error: '정답을 선택해주세요',
  },
  description: {
    min: {
      value: 1,
      message: '문제 내용을 입력해주세요',
    },
  },
  answerDescription: {
    min: {
      value: 1,
      message: '정답에 대한 설명을 입력해주세요',
    },
  },
} as const;

const L = formLiteral;

const formSchema = z.object({
  hintInput: z.string(),
  title: z
    .string()
    .min(L.title.min.value, L.title.min.message)
    .max(L.title.max.value, L.title.max.message),
  summary: z
    .string()
    .min(L.summary.min.value, L.summary.min.message)
    .max(L.summary.max.value, L.summary.max.message),
  difficulty: z.enum(L.difficulty.item.value, {
    required_error: L.difficulty.item.message,
  }),
  hints: z
    .array(
      z.object({
        value: z
          .string()
          .min(L.hints.item.min.value, L.hints.item.min.message)
          .max(L.hints.item.max.value, L.hints.item.max.message),
      })
    )
    .min(L.hints.min)
    .max(L.hints.max.value, L.hints.max.message),
  choices: z
    .array(
      z.object({
        value: z
          .string({
            invalid_type_error: L.choices.item.min.message,
          })
          .min(L.choices.item.min.value, L.choices.item.min.message)
          .max(L.choices.item.max.value, L.choices.item.max.message),
      }),
      {
        required_error: L.choices.item.min.message,
      }
    )
    .length(L.choices.length, L.choices.item.min.message),
  answer: z.coerce
    .number()
    .min(1, L.answer.required_error)
    .max(L.choices.length, L.answer.required_error),
  description: z
    .string({
      required_error: L.description.min.message,
    })
    .min(L.description.min.value, L.description.min.message),
  answerDescription: z
    .string({
      required_error: L.answerDescription.min.message,
    })
    .min(L.answerDescription.min.value, L.answerDescription.min.message),
});

type Inputs = z.infer<typeof formSchema>;

const useWriterForm = () => {
  return useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      difficulty: undefined,
      summary: '',
      description: '',
      choices: Array.from({ length: formLiteral.choices.length }, () => ({
        value: '',
      })),
      answer: undefined,
      answerDescription: '',
      hints: [],
    },
  });
};

export { formLiteral, formSchema, type Inputs, useWriterForm };
