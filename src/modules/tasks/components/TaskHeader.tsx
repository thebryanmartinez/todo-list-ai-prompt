import { Badge } from '@/modules/shared/components';

interface TaskHeaderProps {
    numberIndicator: number;
    text: string;
}

export const TaskHeader = ({ numberIndicator, text }: TaskHeaderProps) => {
    return (
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl font-medium'>{text}</h2>
            {numberIndicator && (
                <Badge className='font-sans' variant='secondary'>
                    {numberIndicator}
                </Badge>
            )}
        </div>
    );
};
