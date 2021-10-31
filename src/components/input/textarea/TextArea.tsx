import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { ThemedTextArea } from '../styled-input';

interface TextAreaProps {
  id: string;
  metadata: Frontier.ElementMeta;
}
export const TextArea: React.FC<TextAreaProps> = ({
  id,
  metadata: { pattern, required, placeholder },
}: TextAreaProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
  const error = errors[id];
  const { onChange, ...rest } = register(id, {
    required,
    ...(pattern ? { pattern: new RegExp(pattern) } : {}),
  });

  const handleChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    await onChange(event);

    if (error) {
      await trigger(id);
    }
  };

  const classNames = clsx('ft-input', {
    'ft-input--error': error,
  });

  return (
    <ThemedTextArea
      className={classNames}
      data-testid="base-text-input"
      onChange={handleChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
