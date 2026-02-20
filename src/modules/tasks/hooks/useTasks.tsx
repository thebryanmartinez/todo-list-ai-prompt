import { useCallback, useEffect, useState } from 'react';

import { db } from '@/lib/db';
import { Subtask, Task } from '@/modules/tasks/entities';

interface TaskWithSubtasks extends Task {
    subtasks: Subtask[];
}

export const useTasks = () => {
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

    return {
        tasks,
        totalTasks,
        completedTasks,
        incompleteTasks,
        todoTasks,
        doneTasks,
        loadTasks,
        handleToggleTaskComplete,
        handleToggleSubtaskComplete,
        handlePlayClick,
        handleDeleteAllCompleted,
    };
};
