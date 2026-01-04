import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/modules/shared/components';
import { CircularProgress } from '@/modules/tasks/components/CircularProgress';

interface TaskCounterProps {
    tasks: number;
    completedTasks: number;
}

export const TaskCounter = ({ tasks, completedTasks }: TaskCounterProps) => {
    const percentage = tasks > 0 ? (completedTasks / tasks) * 100 : 0;

    return (
        <Item className='h-full bg-background' variant='outline'>
            <ItemContent>
                <ItemTitle>
                    <span className='text-2xl font-bold'>
                        {completedTasks}/{tasks}
                    </span>
                    <span className='text-xs'>TASKS</span>
                </ItemTitle>
                <ItemDescription className='font-cursive text-3xl text-black'>
                    You&apos;re Productive
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <CircularProgress percentage={percentage} />
            </ItemActions>
        </Item>
    );
};
