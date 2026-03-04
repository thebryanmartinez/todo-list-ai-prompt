import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components';

import { CreateTaskChat } from './CreateTaskChat';
import { CreateTaskForm, type CreateTaskFormProps } from './CreateTaskForm';

interface CreateTaskContainerProps {
    onTaskCreated?: CreateTaskFormProps['onTaskCreated'];
}

export const CreateTaskContainer = ({ onTaskCreated }: CreateTaskContainerProps) => {
    return (
        <section className='h-full'>
            <Tabs defaultValue='chat' className='h-full'>
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
