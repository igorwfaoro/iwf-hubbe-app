import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
    base: 'rounded-lg px-4 py-3 h-auto font-bold text-center uppercase shadow-sm transition-all ease-in-out hover:brightness-90 disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-400 disabled:text-gray-300 [text-wrap:nowrap]',
    variants: {
        theme: {
            primary: 'bg-primary text-white',
            secondary: 'bg-secondary text-white',
            light: 'bg-neutral-100 text-neutral-950',
            highlight: 'bg-highlight text-white'
        }
    },
    defaultVariants: {
        theme: 'primary'
    }
});

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>;

export default function Button({ children, theme, onClick, disabled, className }: ButtonProps) {
    const buttonClasses = button({ theme, className });

    return (
        <button className={buttonClasses} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
