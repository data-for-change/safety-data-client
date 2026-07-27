import React from 'react';
import { Button as BsButton } from 'react-bootstrap';
import './button.css';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'icon';
  disabled?: boolean;
  isLoading?: boolean;
  title?: string;
  'aria-label'?: string;
  'data-testid'?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<IProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  isLoading = false,
  title,
  'aria-label': ariaLabel,
  'data-testid': testId,
  style,
}) => {
  if (variant === 'icon') {
    return (
      <span
        data-testid={testId}
        title={title}
        aria-label={ariaLabel}
        className="btn-icon"
        role="button"
        tabIndex={0}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            onClick();
          }
        }}
        style={{ ...style, opacity: disabled ? 0.5 : undefined, cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {children}
      </span>
    );
  }

  return (
    <BsButton
      data-testid={testId}
      title={title}
      aria-label={ariaLabel}
      style={{ margin: '0.5rem', ...style }}
      variant={variant}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </BsButton>
  );
};

export default Button;