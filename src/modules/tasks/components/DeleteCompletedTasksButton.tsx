import { Trash2 } from 'lucide-react';

import { Button } from '@/modules/shared/components/button';

interface DeleteCompletedTasksButtonProps {
    onDeleteCompleted: () => void;
}

export const DeleteCompletedTasksButton = ({
    onDeleteCompleted,
}: DeleteCompletedTasksButtonProps) => {
    return (
        <Button
            onClick={onDeleteCompleted}
            variant='ghost'
            size='icon'
            className='text-neutral-500 hover:text-neutral-600'
            aria-label='Delete all completed tasks'
        >
            <Trash2 className='h-4 w-4' />
        </Button>
    );
};
