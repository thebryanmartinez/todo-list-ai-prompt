'use client';

import * as React from 'react';

import { type Subtask, type Task as TaskType } from '@/lib/db';
import { ItemGroup, ItemSeparator } from '@/modules/shared/components/item';
import { Task } from '@/modules/tasks/components/Task';

interface TaskWithSubtasks extends TaskType {
    subtasks?: Subtask[];
}

interface TaskListPropsEnhanced {
    tasks: TaskWithSubtasks[];
    onToggleTaskComplete?: (taskId: number, completed: boolean) => void;
    onToggleSubtaskComplete?: (subtaskId: number, completed: boolean) => void;
    onPlayClick?: (taskId: number) => void;
}

export function TaskList({
    tasks,
    onToggleTaskComplete,
    onToggleSubtaskComplete,
    onPlayClick,
}: TaskListPropsEnhanced) {
    const [expandedTaskId, setExpandedTaskId] = React.useState<number | null>(null);

    const handleToggleExpand = (taskId: number) => {
        setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
    };

    return (
        <ItemGroup className='gap-4'>
            {tasks.map((task, index) => (
                <div key={task.id} className='contents'>
                    <Task
                        task={task}
                        subtasks={task.subtasks || []}
                        subtaskCount={task.subtasks?.length || 0}
                        isExpanded={expandedTaskId === task.id}
                        onToggleExpand={() => handleToggleExpand(task.id)}
                        onToggleComplete={onToggleTaskComplete}
                        onSubtaskToggle={onToggleSubtaskComplete}
                        onPlayClick={onPlayClick}
                    />
                    {index < tasks.length - 1 && <ItemSeparator className='hidden' />}
                </div>
            ))}
        </ItemGroup>
    );
}
