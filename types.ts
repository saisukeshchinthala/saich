
export enum Role {
  Student = 'student',
  Admin = 'admin',
}

export enum TestType {
  Career = 'career',
  Personality = 'personality',
  Skills = 'skills',
}

export interface Question {
  id: string;
  text: string;
}

export interface Test {
  title: string;
  questions: Question[];
}
