import { TaskCounter, TaskHeader, TaskList } from '@/modules/tasks/components';

export default function Home() {
    return (
        <div className='flex min-h-screen p-8 gap-8 bg-slate-200'>
            <section className='flex flex-col flex-1 gap-8'>
                <div className='max-h-32 flex-1 rounded-xl'>
                    <TaskCounter tasks={6} completedTasks={5} />
                </div>
                <div className='flex-1 space-y-2'>
                    <TaskHeader text='To Do' numberIndicator={3} />
                    <TaskList
                        tasks={[
                            {
                                id: 1,
                                name: 'Focus Session',
                                finished: true,
                                description:
                                    'Chapter: Thermodynamics reviews & practice problems regarding heat transfer, this is a much bigger text and is really big, but like realllllly biiiiig',
                                priority: 'High',
                                subtasks: [
                                    { id: 1, taskId: 1, name: 'Review loop laws', finished: false },
                                    {
                                        id: 2,
                                        taskId: 1,
                                        name: 'Practice problem 3.1',
                                        finished: true,
                                    },
                                    {
                                        id: 3,
                                        taskId: 1,
                                        name: 'Read chapter summary',
                                        finished: false,
                                    },
                                ],
                            },
                            {
                                id: 2,
                                name: 'Buy groceries',
                                finished: false,
                                description:
                                    'Need to buy milk, eggs, bread, and some vegetables for the week.',
                                priority: 'Medium',
                                subtasks: [
                                    {
                                        id: 4,
                                        taskId: 2,
                                        name: 'Go to the supermarket',
                                        finished: false,
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </section>
            <section className='flex flex-1'>
                <div className='flex-1 bg-blue-200 rounded-xl'></div>
            </section>
        </div>
    );
}
