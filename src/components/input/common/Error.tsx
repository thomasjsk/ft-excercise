import React from 'react';

interface ErrorProps {
  text: string;
}
export const Error: React.FC<ErrorProps> = ({ text }: ErrorProps) => {
  return (
    <div className="input-error-label text-sm text-red-400 leading-tight font-normal mt-2">
      <span data-testid="text-input-error">{text}</span>
    </div>
  );
};
