import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { ThemedTextInput } from '../styled-input';

interface TextInputProps {
  id: string;
  metadata: Frontier.ElementMeta;
}
export const TextInput: React.FC<TextInputProps> = ({
  id,
  metadata: { format, pattern, step, required, placeholder },
}: TextInputProps) => {
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

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await onChange(event);

    if (error) {
      await trigger(id);
    }
  };

  const classNames = clsx('ft-input', {
    'ft-input--error': error,
  });

  return (
    <ThemedTextInput
      type={format}
      className={classNames}
      data-testid="text-input"
      placeholder={placeholder}
      onChange={handleChange}
      {...(step ? { step } : {})}
      {...rest}
    />
  );
};
