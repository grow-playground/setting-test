import { createContext, useContext } from 'react';

export type FormState = {
  title: string;
  summary: string;
  difficulty: '' | 'easy' | 'medium' | 'hard';
  hints: string[];
  description: string;
  answer: string;
};

export const initialState: FormState = {
  title: '',
  summary: '',
  difficulty: '',
  description: '',
  hints: [],
  answer: '',
};

export type Action =
  | { type: 'SET_TITLE'; payload: FormState['title'] }
  | { type: 'SET_SUMMARY'; payload: FormState['summary'] }
  | { type: 'SET_DIFFICULTY'; payload: FormState['difficulty'] }
  | { type: 'SET_ANSWER'; payload: FormState['answer'] }
  | { type: 'SET_DESCRIPTION'; payload: FormState['description'] }
  | { type: 'ADD_HINT'; payload: FormState['hints'][number] }
  | { type: 'REMOVE_HINT'; payload: FormState['hints'][number] };

export function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_SUMMARY':
      return { ...state, summary: action.payload };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    case 'SET_ANSWER':
      return { ...state, answer: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'ADD_HINT':
      return { ...state, hints: [...state.hints, action.payload] };
    case 'REMOVE_HINT':
      return {
        ...state,
        hints: state.hints.filter((hint) => hint !== action.payload),
      };
    default:
      return state;
  }
}

export const WriterFormContext = createContext<{
  form: FormState;
  dispatch: (action: Action) => void;
}>({
  form: initialState,
  dispatch: () => {},
});

export function useWriterForm() {
  return useContext(WriterFormContext);
}
