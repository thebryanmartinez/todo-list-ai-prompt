'use client';
import * as React from 'react';

import { BadgeCheck, Flag, ListTodo, Play } from 'lucide-react';

import { type Priority, type Subtask, type Task as TaskType } from '@/modules/tasks/entities';
import { Badge } from '@/modules/shared/components/badge';
import { Button } from '@/modules/shared/components/button';
import { Checkbox } from '@/modules/shared/components/checkbox';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from '@/modules/shared/components/item';
import tasksLocalization from '../localization/en.json';

interface TaskProps {
    task: TaskType;
    subtasks?: Subtask[]; // Made optional to be backward compatible
    subtaskCount: number;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
    onToggleComplete?: (taskId: number, completed: boolean) => void;
    onSubtaskToggle?: (subtaskId: number, completed: boolean) => void;
    onPlayClick?: (taskId: number) => void;
}

const priorityColors: Record<Priority, string> = {
    High: 'text-red-400 fill-red-400',
    Medium: 'text-orange-400 fill-orange-400',
    Low: 'text-blue-400 fill-blue-400',
};

export function Task({
    task,
    subtasks = [],
    subtaskCount,
    isExpanded: controlledIsExpanded,
    onToggleExpand,
    onToggleComplete,
    onSubtaskToggle,
    onPlayClick,
}: TaskProps) {
    const [internalIsExpanded, setInternalIsExpanded] = React.useState(false);

    const isExpanded = controlledIsExpanded ?? internalIsExpanded;

    const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
        if (typeof checked === 'boolean' && onToggleComplete) {
            onToggleComplete(task.id, checked);
        }
    };

    const handleSubtaskCheckboxChange = (subtaskId: number, checked: boolean | 'indeterminate') => {
        if (typeof checked === 'boolean' && onSubtaskToggle) {
            onSubtaskToggle(subtaskId, checked);
        }
    };

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onPlayClick) {
            onPlayClick(task.id);
        }
    };

    const handleToggleExpand = () => {
        if (onToggleExpand) {
            onToggleExpand();
        } else {
            setInternalIsExpanded(!internalIsExpanded);
        }
    };

    return (
        <Item
            variant='outline'
            className='relative cursor-pointer bg-background transition-all duration-200'
            onClick={handleToggleExpand}
        >
            {/* Left Section - Checkbox */}
            <ItemMedia className='self-start pt-1'>
                <div onClick={(e) => e.stopPropagation()}>
                    {task.finished ? (
                        <button
                            onClick={() => handleCheckboxChange(false)}
                            className='text-green-500 hover:text-green-600 transition-colors'
                            aria-label={tasksLocalization.tasks.task.ariaLabels.markIncomplete.replace('{taskName}', task.name)}
                        >
                            <BadgeCheck className='h-6 w-6 fill-green-500 text-white' />
                        </button>
                    ) : (
                        <Checkbox
                            checked={task.finished}
                            onCheckedChange={handleCheckboxChange}
                            className='h-5 w-5 rounded-full'
                            aria-label={tasksLocalization.tasks.task.ariaLabels.markComplete.replace('{taskName}', task.name)}
                        />
                    )}
                </div>
            </ItemMedia>

            {/* Middle Section - Content */}
            <ItemContent>
                <div className='flex flex-col gap-1'>
                    <ItemTitle
                        className={`font-serif text-xl tracking-tighter ${
                            task.finished ? 'text-muted-foreground line-through' : ''
                        }`}
                    >
                        {task.name}
                    </ItemTitle>
                    <ItemDescription
                        className={`${isExpanded ? 'line-clamp-none' : ''} ${
                            task.finished ? 'line-through' : ''
                        }`}
                    >
                        {task.description}
                    </ItemDescription>
                </div>

                {subtasks.length > 0 && (
                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                    >
                        <div className='overflow-hidden'>
                            <div className='mt-4 flex flex-col gap-2'>
                                <ItemSeparator />
                                <div className='flex flex-col gap-2 pt-2'>
                                    {subtasks.map((subtask) => (
                                        <div
                                            key={subtask.id}
                                            className='flex items-center gap-2'
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox
                                                checked={task.finished || subtask.finished}
                                                onCheckedChange={(checked) =>
                                                    handleSubtaskCheckboxChange(subtask.id, checked)
                                                }
                                                className={`h-4 w-4 rounded-full ${
                                                    task.finished || subtask.finished
                                                        ? 'border-green-500 bg-green-500 text-white data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500'
                                                        : ''
                                                }`}
                                            />
                                            <span
                                                className={`text-sm ${
                                                    task.finished || subtask.finished
                                                        ? 'text-muted-foreground line-through'
                                                        : ''
                                                }`}
                                            >
                                                {subtask.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <ItemFooter className='mt-1'>
                    <div className='flex items-center gap-2'>
                        <Badge variant='secondary' className='font-bold'>
                            <Flag className={`size-4 ${priorityColors[task.priority]}`} />
                            <span className={priorityColors[task.priority]}>{tasksLocalization.tasks.priorities[task.priority as keyof typeof tasksLocalization.tasks.priorities]}</span>
                        </Badge>
                        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                            <ListTodo className='size-4' />
                            <span>{subtaskCount}</span>
                        </div>
                    </div>
                </ItemFooter>
            </ItemContent>

            {/* Right Section - Play Button */}
            <ItemMedia className='self-start pt-0.5'>
                <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full bg-blue-200 outline-blue-500'
                    onClick={handlePlayClick}
                    aria-label={tasksLocalization.tasks.task.ariaLabels.startPomodoro}
                >
                    <Play className='size-4 fill-blue-500 outline-blue-500' strokeWidth={0} />
                </Button>
            </ItemMedia>
        </Item>
    );
}
