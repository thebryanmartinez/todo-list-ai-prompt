import { Dexie, type EntityTable } from 'dexie';
import { Task, Subtask } from '@/modules/tasks/entities';

const db = new Dexie('TaskDatabase') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
    subtasks: EntityTable<Subtask, 'id'>;
};

db.version(1).stores({
    tasks: '++id, name, finished, description, priority',
    subtasks: '++id, taskId, name, finished',
});

export { db };
