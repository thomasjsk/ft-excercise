import React from 'react';

interface LabelProps {
  text: string;
}
export const Label: React.FC<LabelProps> = ({ text }: LabelProps) => {
  return (
    <div
      className="leading-tight font-medium text-sm mt-2 mb-3"
      data-testid="base-text-input-label"
    >
      {text}
    </div>
  );
};
