import { ReactNode } from 'react';

import { Badge } from '@/modules/shared/components';

interface NumberIndicatorProps {
    children: ReactNode;
}

interface TaskHeaderProps {
    numberIndicator: number;
    text: string;
}

const NumberIndicator = ({ children }: NumberIndicatorProps) => {
    return <Badge variant='default'>{children}</Badge>;
};

export const TaskHeader = ({ numberIndicator, text }: TaskHeaderProps) => {
    return (
        <div className='flex gap-2'>
            <h2 className='text-2xl font-medium'>{text}</h2>
            {numberIndicator ?? <NumberIndicator>{numberIndicator}</NumberIndicator>}
        </div>
    );
};
