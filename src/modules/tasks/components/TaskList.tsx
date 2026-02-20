'use client';

import * as React from 'react';

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
    ItemGroup,
    ItemSeparator,
} from '@/modules/shared/components';
import { Task } from '@/modules/tasks/components/Task';
import type { Subtask, Task as TaskType } from '@/modules/tasks/entities';

import tasksLocalization from '../localization/en.json';

interface TaskWithSubtasks extends TaskType {
    subtasks?: Subtask[];
}

interface TaskListPropsEnhanced {
    tasks: TaskWithSubtasks[];
    onToggleTaskComplete?: (taskId: number, completed: boolean) => void;
    onToggleSubtaskComplete?: (subtaskId: number, completed: boolean) => void;
    onPlayClick?: (taskId: number) => void;
    emptyStateType?: 'noTasks' | 'noCompletedTasks';
}

export function TaskList({
    tasks,
    onToggleTaskComplete,
    onToggleSubtaskComplete,
    onPlayClick,
    emptyStateType = 'noTasks',
}: TaskListPropsEnhanced) {
    const emptyStateContent = tasksLocalization.tasks.taskList.empty[emptyStateType];

    const [expandedTaskId, setExpandedTaskId] = React.useState<number | null>(null);

    const handleToggleExpand = (taskId: number) => {
        setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
    };

    return (
        <ItemGroup className='gap-4'>
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
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
                ))
            ) : (
                <Empty className='border border-dashed border-background'>
                    <EmptyHeader>
                        <EmptyTitle>{emptyStateContent.title}</EmptyTitle>
                        <EmptyDescription>{emptyStateContent.description}</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </ItemGroup>
    );
}
