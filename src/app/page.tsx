import { TaskCounter, TaskHeader } from '@/modules/tasks/components';

export default function Home() {
    return (
        <div className='flex min-h-screen p-8 gap-8 bg-slate-200'>
            <section className='flex flex-col flex-1 gap-8'>
                <div className='max-h-32 flex-1 rounded-xl'>
                    <TaskCounter tasks={6} completedTasks={5} />
                </div>
                <div className='flex-1 bg-amber-200 rounded-xl'>
                    <TaskHeader text='To Do' numberIndicator={3} />
                </div>
            </section>
            <section className='flex flex-1'>
                <div className='flex-1 bg-blue-200 rounded-xl'></div>
            </section>
        </div>
    );
}
