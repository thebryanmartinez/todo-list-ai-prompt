import { Trash2 } from 'lucide-react';

import { Button } from '@/modules/shared/components';

import tasksLocalization from '../localization/en.json';

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
            aria-label={tasksLocalization.tasks.deleteCompletedButton.ariaLabel}
        >
            <Trash2 className='h-4 w-4' />
        </Button>
    );
};
