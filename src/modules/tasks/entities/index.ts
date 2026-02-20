export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
    id: number;
    name: string;
    finished: boolean;
    description: string;
    priority: Priority;
}

export interface Subtask {
    id: number;
    taskId: number;
    name: string;
    finished: boolean;
}