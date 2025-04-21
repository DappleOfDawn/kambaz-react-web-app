export interface Course {
  _id?: string;
  name?: string;
  number?: string;
  credits?: number;
  description?: string;
  enrolled?: boolean;
}

export type Role = "STUDENT" | "FACULTY" | "ADMIN" | "USER";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface User {
  _id?: string;
  username: string;
  password: string;
  firstName?: string;
  email?: string;
  lastName?: string;
  dob?: Date;
  role?: Role;
  loginId?: string;
  section?: string;
  lastActivity?: Date;
  totalActivity?: string;
}

export interface Module {
  _id?: string;
  name?: string;
  description?: string;
  course?: string;
  lessons?: string[];
  editing?: boolean;
}

export interface Assignment {
  _id?: string;
  title?: string;
  course?: string;
  description?: string;
  points?: number;
  dueDate?: Date;
  availableDate?: Date;
  untilDate?: Date;
}

export type QuizType = "GRADED QUIZ" | "PRACTICE QUIZ" | "GRADED SURVEY" | "UNGRADED SURVEY";

export type AssignmentGroup = "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";

export type ShowCorrectAnswersOptions = "Immediately" | "No" | "After Due Date";

export interface Quiz {
  _id?: string;
  title: string;
  course: string;
  description?: string;
  quizType: QuizType;
  assignmentGroup: AssignmentGroup;
  points: number;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  numberOfAttempts: number;
  showCorrectAnswers: ShowCorrectAnswersOptions;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableDate: Date;
  untilDate: Date;
  published: boolean;
  completed?: boolean;
}

export type QuestionType = "MULTIPLE CHOICE" | "TRUE FALSE" | "FILL IN THE BLANK";

export interface Question {
  _id?: string;
  title: string;
  quiz: string;
  questionText: string;
  questionType: QuestionType;
  points: number;
  answers: string[];
  correctAnswers: string[];
}