import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children?: ReactNode | ReactNode[];
    className?: string;
    bgImageUrl?: string;
}

export default function Card({ children, className, bgImageUrl }: CardProps) {
    return (
        <div
            role="card"
            className={twMerge('rounded-2xl shadow-xl bg-cover', className)}
            style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : '' }}
        >
            {children}
        </div>
    );
}
