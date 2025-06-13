export interface User {
  data: any;
  _id: string;
  name: string;
  email: string;
  authProvider: "local" | "google";
  createdAt: string;
  updatedAt: string;
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
export interface GoogleLoginInput {
  code: string;
}

export interface getCurrentUserResponse {
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  userId: string;
  updatedAt: string;
}
export interface CreateTaskInput {
  title: string;
  description?: string | null;
  completed: boolean;
}
export interface UpdateTaskInput {
  _id: string;
  title?: string;
  description?: string | null;
  completed?: boolean;
}
export interface DeleteTaskInput {
  _id: string;
}

export interface Note {
  fileType: string;
  _id: string;
  userId: string;
  title: string;
  text: string;
  originalNote: string;
  summarizedNote: string;
  summaryLength: "short" | "medium" | "long";
  downloadedPdf: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateNoteInput {
  title: string;
  text?: string;
  file?: File;
  summaryLength?: "short" | "medium" | "long";
}

export interface UpdateNoteInput {
  id: string;
  title: string;
  text?: string;
  file?: File;
  summaryLength?: "short" | "medium" | "long";
}

export interface DeleteNoteInput {
  id: string;
}

export interface DailyPlan {
  _id: string;
  day: number;
  title: string;
  description: string;
  resources: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LearningGuide {
  _id: string;
  userId: string;
  topic: string;
  durationDays: number;
  dailyPlan: DailyPlan[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAiLearningInput {
  topic: string;
  durationDays: number;
}

export interface GetAiLearningInput {
  userId: string;
}

export interface DeleteAiLearningInput {
  id: string;
}

export interface StatsData {
  totalNotes: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  aiLearnings: number;
}
