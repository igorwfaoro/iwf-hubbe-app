import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageProps {
    children?: ReactNode;
    className?: string;
}

export default function Page({ children, className }: PageProps) {
    return <div className={twMerge('p-4 pt-20', className)}>{children}</div>;
}
