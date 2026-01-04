import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/modules/shared/components';

interface TaskCounterProps {
    tasks: number;
    completedTasks: number;
}

export const TaskCounter = ({ tasks, completedTasks }: TaskCounterProps) => {
    return (
        <Item className='h-full bg-background' variant='outline'>
            <ItemContent>
                <ItemTitle>
                    <span className='text-2xl font-bold'>
                        {completedTasks}/{tasks}
                    </span>
                    <span className='text-xs'>DAILY TASKS</span>
                </ItemTitle>
                <ItemDescription className='font-cursive text-3xl text-black'>
                    You're Productive
                </ItemDescription>
            </ItemContent>
            <ItemActions></ItemActions>
        </Item>
    );
};
