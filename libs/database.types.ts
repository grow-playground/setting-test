export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      answers: {
        Row: {
          choice_id: number;
          description: string;
          id: number;
          quiz_id: number;
        };
        Insert: {
          choice_id: number;
          description: string;
          id?: number;
          quiz_id: number;
        };
        Update: {
          choice_id?: number;
          description?: string;
          id?: number;
          quiz_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'answers_choice_id_fkey';
            columns: ['choice_id'];
            isOneToOne: false;
            referencedRelation: 'choices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'answers_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: true;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
        ];
      };
      choices: {
        Row: {
          description: string;
          id: number;
          quiz_id: number;
        };
        Insert: {
          description: string;
          id?: number;
          quiz_id: number;
        };
        Update: {
          description?: string;
          id?: number;
          quiz_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'choices_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
        ];
      };
      notes: {
        Row: {
          id: number;
          title: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          quiz_id: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: number;
          quiz_id: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          quiz_id?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'questions_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'questions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      quizsubmissions: {
        Row: {
          created_at: string;
          id: number;
          quiz_id: number | null;
          success: boolean;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          quiz_id?: number | null;
          success: boolean;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          quiz_id?: number | null;
          success?: boolean;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'quizsubmissions_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'quizsubmissions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      quizzes: {
        Row: {
          created_at: string;
          description: string;
          difficulty: Database['public']['Enums']['difficulty'];
          id: number;
          summary: string;
          title: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description: string;
          difficulty: Database['public']['Enums']['difficulty'];
          id?: number;
          summary: string;
          title: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string;
          difficulty?: Database['public']['Enums']['difficulty'];
          id?: number;
          summary?: string;
          title?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'quizzes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      quizzes_before: {
        Row: {
          answer: number | null;
          answer_description: string | null;
          category: string | null;
          choices: string | null;
          created_at: string;
          description: string | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          answer?: number | null;
          answer_description?: string | null;
          category?: string | null;
          choices?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          answer?: number | null;
          answer_description?: string | null;
          category?: string | null;
          choices?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          name: string;
          username: string;
        };
        Insert: {
          id: string;
          name: string;
          username: string;
        };
        Update: {
          id?: string;
          name?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      difficulty: 'easy' | 'medium' | 'hard';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
