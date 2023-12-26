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
      value: ['easy', 'medium', 'hard'] as const,
      message: '난이도를 선택해주세요',
    },
  },
  hints: {
    min: {
      value: 0,
    },
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
        message: '선택지를 입력해주세요',
      },
      max: {
        value: 200,
        message: '선택지는 200자 이하로 입력해주세요',
      },
    },
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
};

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
    .min(L.hints.min.value)
    .max(L.hints.max.value),
  choices: z
    .array(
      z.object({
        value: z
          .string()
          .min(L.choices.item.min.value, L.choices.item.min.message)
          .max(L.choices.item.max.value, L.choices.item.max.message),
      })
    )
    .length(L.choices.length),
  description: z
    .string()
    .min(L.description.min.value, L.description.min.message),
  answerDescription: z
    .string()
    .min(L.answerDescription.min.value, L.answerDescription.min.message),
});

type Inputs = z.infer<typeof formSchema>;

export { formLiteral, formSchema, type Inputs };
