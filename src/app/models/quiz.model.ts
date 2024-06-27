export interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    text: string;
    options: Option[];
    correctAnswer: number | number[];
    type: 'dropdown' | 'radio' | 'checkbox';
    timeLimit: number;
  }
  
  export interface Option {
    id: number;
    text: string;
  }
  