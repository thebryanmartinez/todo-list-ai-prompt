'use client';

import { PlusIcon, XIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { useTaskForm } from '@/modules/chat/hooks';
import chatLocalization from '@/modules/chat/localization/en.json';
import {
    Button,
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from '@/modules/shared/components';

export const CreateTaskForm = ({ onTaskCreated }: { onTaskCreated?: () => void }) => {
    const { form, fields, append, remove, onSubmit } = useTaskForm({ onTaskCreated });

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
                                <FieldLabel htmlFor='task-name'>
                                    {chatLocalization.chat.createTaskForm.fields.name.label}
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        {...field}
                                        id='task-name'
                                        placeholder={
                                            chatLocalization.chat.createTaskForm.fields.name
                                                .placeholder
                                        }
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        {
                                            chatLocalization.chat.createTaskForm.fields.name
                                                .description
                                        }
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
                                <FieldLabel htmlFor='task-description'>
                                    {chatLocalization.chat.createTaskForm.fields.description.label}
                                </FieldLabel>
                                <FieldContent>
                                    <Textarea
                                        {...field}
                                        id='task-description'
                                        placeholder={
                                            chatLocalization.chat.createTaskForm.fields.description
                                                .placeholder
                                        }
                                        className='min-h-[100px]'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        {
                                            chatLocalization.chat.createTaskForm.fields.description
                                                .description
                                        }
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
                                <FieldLabel htmlFor='task-priority'>
                                    {chatLocalization.chat.createTaskForm.fields.priority.label}
                                </FieldLabel>
                                <FieldContent>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger
                                            id='task-priority'
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue
                                                placeholder={
                                                    chatLocalization.chat.createTaskForm.fields
                                                        .priority.placeholder
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='High'>
                                                {chatLocalization.chat.priorities.high}
                                            </SelectItem>
                                            <SelectItem value='Medium'>
                                                {chatLocalization.chat.priorities.medium}
                                            </SelectItem>
                                            <SelectItem value='Low'>
                                                {chatLocalization.chat.priorities.low}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FieldDescription>
                                        {
                                            chatLocalization.chat.createTaskForm.fields.priority
                                                .description
                                        }
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Field>
                        <FieldLabel>
                            {chatLocalization.chat.createTaskForm.fields.subtasks.label}
                        </FieldLabel>
                        <FieldContent>
                            <FieldDescription>
                                {chatLocalization.chat.createTaskForm.fields.subtasks.description}
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
                                                    placeholder={chatLocalization.chat.createTaskForm.fields.subtasks.placeholder.replace(
                                                        '{index}',
                                                        String(index + 1)
                                                    )}
                                                    aria-invalid={fieldState.invalid}
                                                    className='flex-1'
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    onClick={() => remove(index)}
                                                    aria-label={chatLocalization.chat.createTaskForm.fields.subtasks.removeAriaLabel.replace(
                                                        '{index}',
                                                        String(index + 1)
                                                    )}
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
                                    {chatLocalization.chat.createTaskForm.fields.subtasks.addButton}
                                </Button>
                            </div>
                        </FieldContent>
                    </Field>
                </FieldGroup>
            </form>
            <Button type='submit' form='create-task-form' className='w-full sticky bottom-0 mt-4'>
                {chatLocalization.chat.createTaskForm.submitButton}
            </Button>
        </div>
    );
};
