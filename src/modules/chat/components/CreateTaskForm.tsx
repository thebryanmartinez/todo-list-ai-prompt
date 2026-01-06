'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, XIcon } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { db } from '@/lib/db';
import { Button } from '@/modules/shared/components/button';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/modules/shared/components/field';
import { Input } from '@/modules/shared/components/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/modules/shared/components/select';
import { Textarea } from '@/modules/shared/components/textarea';

const formSchema = z.object({
    name: z.string().min(1, 'Task name is required.'),
    description: z.string().optional(),
    priority: z.enum(['High', 'Medium', 'Low']),
    subtasks: z
        .array(
            z.object({
                name: z.string().min(1, 'Subtask name cannot be empty.'),
            })
        )
        .optional(),
});

type FormData = z.infer<typeof formSchema>;

export const CreateTaskForm = ({ onTaskCreated }: { onTaskCreated?: () => void }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            priority: 'Medium',
            subtasks: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'subtasks',
    });

    async function onSubmit(data: FormData) {
        try {
            const taskId = await db.tasks.add({
                name: data.name,
                description: data.description || '',
                priority: data.priority,
                finished: false,
            });

            if (data.subtasks && data.subtasks.length > 0) {
                await Promise.all(
                    data.subtasks.map((subtask) =>
                        db.subtasks.add({
                            taskId,
                            name: subtask.name,
                            finished: false,
                        })
                    )
                );
            }

            form.reset();
            onTaskCreated?.();
        } catch (error) {
            // TODO: Implement sonner for showing error on toast notifications
            console.error('Error saving task:', error);
        }
    }

    return (
        <div className='p-6 h-full flex flex-col'>
            <form
                id='create-task-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex-1 overflow-y-auto space-y-4'
            >
                <FieldGroup>
                    <Controller
                        name='name'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='task-name'>Task Name</FieldLabel>
                                <FieldContent>
                                    <Input
                                        {...field}
                                        id='task-name'
                                        placeholder='Enter task name'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        This is the name of your task.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        name='description'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='task-description'>Description</FieldLabel>
                                <FieldContent>
                                    <Textarea
                                        {...field}
                                        id='task-description'
                                        placeholder='Enter task description (optional)'
                                        className='min-h-[100px]'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        Provide additional details about the task.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        name='priority'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='task-priority'>Priority</FieldLabel>
                                <FieldContent>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger
                                            id='task-priority'
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder='Select priority' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='High'>High</SelectItem>
                                            <SelectItem value='Medium'>Medium</SelectItem>
                                            <SelectItem value='Low'>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FieldDescription>
                                        Choose the priority level for this task.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Field>
                        <FieldLabel>Subtasks</FieldLabel>
                        <FieldContent>
                            <FieldDescription>
                                Add subtasks to break down your task (optional).
                            </FieldDescription>
                            <div className='space-y-2 max-h-32 overflow-y-auto'>
                                {fields.map((field, index) => (
                                    <Controller
                                        key={field.id}
                                        name={`subtasks.${index}.name`}
                                        control={form.control}
                                        render={({ field: controllerField, fieldState }) => (
                                            <div className='flex items-center gap-2'>
                                                <Input
                                                    {...controllerField}
                                                    placeholder={`Subtask ${index + 1}`}
                                                    aria-invalid={fieldState.invalid}
                                                    className='flex-1'
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    onClick={() => remove(index)}
                                                    aria-label={`Remove subtask ${index + 1}`}
                                                >
                                                    <XIcon className='size-4' />
                                                </Button>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </div>
                                        )}
                                    />
                                ))}
                                <Button
                                    type='button'
                                    variant='outline'
                                    size='sm'
                                    onClick={() => append({ name: '' })}
                                >
                                    <PlusIcon className='size-4 mr-2' />
                                    Add Subtask
                                </Button>
                            </div>
                        </FieldContent>
                    </Field>
                </FieldGroup>
            </form>
            <Button type='submit' form='create-task-form' className='w-full sticky bottom-0 mt-4'>
                Create Task
            </Button>
        </div>
    );
};
