

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { db } from "@/lib/db";
import chatLocalization from '../localization/en.json';

const formSchema = z.object({
    name: z.string().min(1, chatLocalization.chat.validation.taskNameRequired),
    description: z.string().optional(),
    priority: z.enum(['High', 'Medium', 'Low']),
    subtasks: z
        .array(
            z.object({
                name: z.string().min(1, chatLocalization.chat.validation.subtaskNameEmpty),
            })
        )
        .optional(),
});

type FormData = z.infer<typeof formSchema>;

export const useTaskForm = ({ onTaskCreated }: { onTaskCreated?: () => void }) => {

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


    return {
        form,
        fields,
        append,
        remove,
        onSubmit,
    };
};