'use client';

import { useCallback, useEffect, useState } from 'react';

import { type Subtask, type Task, db } from '@/lib/db';
import { CreateTaskForm } from '@/modules/chat/components';
import {
    DeleteCompletedTasksButton,
    TaskCounter,
    TaskHeader,
    TaskList,
} from '@/modules/tasks/components';

interface TaskWithSubtasks extends Task {
    subtasks?: Subtask[];
}

export default function Home() {
    const [tasks, setTasks] = useState<TaskWithSubtasks[]>([]);

    const loadTasks = useCallback(async () => {
        const allTasks = await db.tasks.toArray();
        const tasksWithSubtasks = await Promise.all(
            allTasks.map(async (task) => {
                const subtasks = await db.subtasks.where('taskId').equals(task.id).toArray();
                return { ...task, subtasks };
            })
        );
        setTasks(tasksWithSubtasks);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTasks();
    }, [loadTasks]);

    const handleToggleTaskComplete = async (taskId: number, completed: boolean) => {
        await db.tasks.update(taskId, { finished: completed });
        loadTasks();
    };

    const handleToggleSubtaskComplete = async (subtaskId: number, completed: boolean) => {
        await db.subtasks.update(subtaskId, { finished: completed });
        loadTasks();
    };

    const handlePlayClick = (taskId: number) => {
        console.log('Play clicked for task', taskId);
    };

    const handleDeleteAllCompleted = async () => {
        const completedTaskIds = tasks.filter((task) => task.finished).map((task) => task.id);
        if (completedTaskIds.length > 0) {
            await db.subtasks.where('taskId').anyOf(completedTaskIds).delete();
            await db.tasks.where('id').anyOf(completedTaskIds).delete();
            loadTasks();
        }
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.finished).length;
    const incompleteTasks = totalTasks - completedTasks;
    const todoTasks = tasks.filter((task) => !task.finished);
    const doneTasks = tasks.filter((task) => task.finished);

    return (
        <div className='flex min-h-screen p-8 gap-8 bg-slate-200'>
            <section className='flex flex-col flex-1 gap-8'>
                <div className='max-h-32 flex-1 rounded-xl'>
                    <TaskCounter tasks={totalTasks} completedTasks={completedTasks} />
                </div>
                <div className='flex-1 space-y-4'>
                    <div className='space-y-2'>
                        <TaskHeader text='To Do' numberIndicator={incompleteTasks} />
                        <TaskList
                            tasks={todoTasks}
                            onToggleTaskComplete={handleToggleTaskComplete}
                            onToggleSubtaskComplete={handleToggleSubtaskComplete}
                            onPlayClick={handlePlayClick}
                        />
                    </div>
                    <div className='space-y-2'>
                        <div className='flex justify-between items-center'>
                            <TaskHeader text='Completed' numberIndicator={completedTasks} />
                            <DeleteCompletedTasksButton
                                onDeleteCompleted={handleDeleteAllCompleted}
                            />
                        </div>
                        <TaskList
                            tasks={doneTasks}
                            onToggleTaskComplete={handleToggleTaskComplete}
                            onToggleSubtaskComplete={handleToggleSubtaskComplete}
                            onPlayClick={handlePlayClick}
                        />
                    </div>
                </div>
            </section>
            <section className='flex flex-1 max-h-full'>
                <div className='flex-1 bg-white rounded-xl h-full overflow-hidden'>
                    <CreateTaskForm />
                </div>
            </section>
        </div>
    );
}
