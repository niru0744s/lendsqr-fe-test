import React, { useState } from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  error,
  label,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`input-group ${error ? 'input-group--error' : ''} ${className}`}>
      {label && <label className="input-group__label">{label}</label>}
      <div className="input-group__control-wrapper">
        <input
          type={inputType}
          className="input-group__input"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="input-group__toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>
      {error && <span className="input-group__error-msg">{error}</span>}
    </div>
  );
};
