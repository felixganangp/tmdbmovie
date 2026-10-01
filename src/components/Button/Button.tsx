import type { ReactNode } from 'react';

interface ButtonProps {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

const Button = ({
  label,
  icon,
  active = false,
  onClick,
  className = '',
}: ButtonProps) => {
  const baseClass =
    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer';

  const stateClass = active
    ? 'bg-linear-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/25'
    : 'bg-gray-800 text-gray-300 hover:bg-gray-700';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClass} ${stateClass} ${className}`}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
