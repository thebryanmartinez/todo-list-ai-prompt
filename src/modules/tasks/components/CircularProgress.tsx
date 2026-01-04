'use client';

import { useEffect, useState } from 'react';

interface CircularProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
}

export const CircularProgress = ({
    percentage,
    size = 80,
    strokeWidth = 6,
}: CircularProgressProps) => {
    const [progress, setProgress] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        // Animate the progress on mount or when percentage changes
        const timer = setTimeout(() => {
            setProgress(percentage);
        }, 100);

        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className='relative inline-flex items-center justify-center'>
            <svg width={size} height={size} className='transform -rotate-90'>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke='#e5e7eb'
                    strokeWidth={strokeWidth}
                    fill='none'
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke='#3b82f6'
                    strokeWidth={strokeWidth}
                    fill='none'
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap='round'
                    className='transition-all duration-1000 ease-out'
                />
            </svg>
            {/* Percentage text */}
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='flex items-end'>
                    <span className='text-2xl font-bold text-foreground font-serif leading-none'>
                        {Math.round(percentage)}
                    </span>
                    <span className='text-xs font-bold text-foreground font-serif leading-none'>
                        %
                    </span>
                </div>
            </div>
        </div>
    );
};
