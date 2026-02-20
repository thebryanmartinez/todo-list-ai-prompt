'use client';

import {CreateTaskForm} from '@/modules/chat/components';
import {
    DeleteCompletedTasksButton,
    TaskCounter,
    TaskHeader,
    TaskList,
} from '@/modules/tasks/components';
import { useTasks } from '@/modules/tasks/hooks';
import tasksLocalization from '@/modules/tasks/localization/en.json';

export default function Home() {
    const { totalTasks, todoTasks, handleToggleTaskComplete, handleToggleSubtaskComplete, handlePlayClick, handleDeleteAllCompleted, completedTasks, doneTasks, incompleteTasks, loadTasks } = useTasks()
    return (
        <div className='flex min-h-screen p-8 gap-8 bg-slate-200'>
            <section className='flex flex-col flex-1 gap-8'>
                <div className='max-h-32 flex-1 rounded-xl'>
                    <TaskCounter tasks={totalTasks} completedTasks={completedTasks} />
                </div>
                <div className='flex-1 space-y-4'>
                    <div className='space-y-2'>
                        <TaskHeader text={tasksLocalization.tasks.headers.todo} numberIndicator={incompleteTasks} />
                        <TaskList
                            tasks={todoTasks}
                            onToggleTaskComplete={handleToggleTaskComplete}
                            onToggleSubtaskComplete={handleToggleSubtaskComplete}
                            onPlayClick={handlePlayClick}
                            emptyStateType='noTasks'
                        />
                    </div>
                    <div className='space-y-2'>
                        <div className='flex justify-between items-center'>
                            <TaskHeader text={tasksLocalization.tasks.headers.completed} numberIndicator={completedTasks} />
                            { doneTasks.length > 0 && <DeleteCompletedTasksButton
                                onDeleteCompleted={handleDeleteAllCompleted}
                            />}
                        </div>
                        <TaskList
                            tasks={doneTasks}
                            onToggleTaskComplete={handleToggleTaskComplete}
                            onToggleSubtaskComplete={handleToggleSubtaskComplete}
                            onPlayClick={handlePlayClick}
                            emptyStateType='noCompletedTasks'
                        />
                    </div>
                </div>
            </section>
            <section className='flex flex-1 max-h-full'>
                <div className='flex-1 bg-white rounded-xl h-full overflow-hidden'>
                    <CreateTaskForm onTaskCreated={loadTasks} />
                </div>
            </section>
        </div>
    );
}
