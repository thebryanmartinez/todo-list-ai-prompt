import { Dexie, type EntityTable } from 'dexie';

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

// Database definition
const db = new Dexie('TaskDatabase') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
    subtasks: EntityTable<Subtask, 'id'>;
};

// Database schema
db.version(1).stores({
    tasks: '++id, name, finished, description, priority',
    subtasks: '++id, taskId, name, finished',
});

export { db };
