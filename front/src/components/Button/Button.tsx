import {
  CSSProperties,
  ComponentProps,
  HTMLAttributeAnchorTarget
} from 'react';
import Link from 'next/link';
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

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    icon?: any;
    link?: string;
    linkTarget?: HTMLAttributeAnchorTarget;
    color?: string;
    loading?: boolean;
  };

export default function Button({
  children,
  icon: Icon,
  link,
  linkTarget,
  theme,
  onClick,
  disabled,
  className,
  color,
  style,
  loading
}: ButtonProps) {
  const content = (
    <>
      {Icon && <Icon />} {children}
    </>
  );

  const buttonClasses = button({ theme, className });

  const buttonStyle: CSSProperties = { ...style, backgroundColor: color };

  const Loading = () => (
    <div className="animate-spin h-5 w-5 border-2 border-t-transparent" />
  );

  const ButtonContent = () => <>{loading ? Loading : content}</>;

  return link ? (
    <Link
      className={buttonClasses}
      style={buttonStyle}
      href={link}
      target={linkTarget}
    >
      <ButtonContent />
    </Link>
  ) : (
    <button
      className={buttonClasses}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <ButtonContent />
    </button>
  );
}
