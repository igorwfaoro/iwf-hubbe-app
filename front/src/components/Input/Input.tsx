import { twMerge } from 'tailwind-merge';

interface InputProps {
    label: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorMessageClassName?: string;
    errorMessage?: string | null;
    helpText?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | readonly string[];
}

export default function Input({
    // label,
    // className,
    // labelClassName,
    // inputClassName,
    // errorMessage,
    // errorMessageClassName,
    // helpText,
    // onChange,
    // value
}: InputProps) {
    return (
        // <div className={twMerge('mb-4 flex flex-col gap-1', className)}>
        <div className="fixed">
            {/* <label className={twMerge('text-gray-700 text-sm mb-1', labelClassName)}>{label}</label>
            {helpText && <small className="text-neutral-500">{helpText}</small>}
            <input
                className={twMerge(
                    'border border-gray-300 p-4 rounded-md focus:outline-none',
                    inputClassName
                )}
                onChange={onChange}
                value={value}
            />
            {errorMessage && (
                <span className={twMerge('text-sm text-red-600', errorMessageClassName)}>
                    {errorMessage}
                </span>
            )} */}

            <h1>ddd</h1>
        </div>
    );
}
