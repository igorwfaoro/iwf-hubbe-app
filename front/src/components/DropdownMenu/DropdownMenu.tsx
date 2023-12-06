import { useState } from 'react';
import Button from '../Button/Button';
import { twMerge } from 'tailwind-merge';

interface DropdownMenuItem {
    label: string;
    onClick: () => void;
}

interface DropdownMenuProps {
    label?: string;
    className?: string;
    items?: DropdownMenuItem[];
}

export default function DropdownMenu({ label, className, items }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: DropdownMenuItem) => {
        item.onClick();
        setIsOpen(false);
    };

    return (
        <>
            <Button className={twMerge('relative', className)} onClick={() => setIsOpen(!isOpen)}>
                {label}
            </Button>

            {isOpen && (
                <>
                    {/* items */}
                    <div className="absolute top-14 bg-white shadow-md flex flex-col rounded-md border border-gray-200 z-50">
                        {items?.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => handleItemClick(item)}
                                className="px-4 py-2 hover:bg-gray-200"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* backdrop */}
                    <div
                        className="z-40 absolute w-full h-screen top-0 left-0"
                        onClick={() => setIsOpen(false)}
                    />
                </>
            )}
        </>
    );
}
