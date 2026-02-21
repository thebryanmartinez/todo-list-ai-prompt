import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components';

import { CreateTaskChat } from './CreateTaskChat';
import { CreateTaskForm, type CreateTaskFormProps } from './CreateTaskForm';

interface CreateTaskContainerProps {
    onTaskCreated?: CreateTaskFormProps['onTaskCreated'];
}

export const CreateTaskContainer = ({ onTaskCreated }: CreateTaskContainerProps) => {
    return (
        <section className='flex-1 w-full h-full'>
            <Tabs defaultValue='chat'>
                <TabsList className='w-full'>
                    <TabsTrigger value='chat'>Chat</TabsTrigger>
                    <TabsTrigger value='form'>Form</TabsTrigger>
                </TabsList>
                <TabsContent value='chat'>
                    <CreateTaskChat />
                </TabsContent>
                <TabsContent value='form'>
                    <CreateTaskForm onTaskCreated={onTaskCreated} />
                </TabsContent>
            </Tabs>
        </section>
    );
};
