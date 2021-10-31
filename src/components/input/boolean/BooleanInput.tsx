import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { ThemedBooleanButton } from '../styled-input';

interface BooleanInputProps {
  id: string;
  metadata: Frontier.ElementMeta;
}
export const BooleanInput: React.FC<BooleanInputProps> = ({
  id,
  metadata: { pattern, required },
}: BooleanInputProps) => {
  const {
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const checked: boolean | null = getValues(id);
  const error = errors[id];
  const { onChange, ...rest } = register(id, {
    validate: () => required && checked !== null,
    required,
    ...(pattern ? { pattern: new RegExp(pattern) } : {}),
  });

  const handleClick =
    (value: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      setValue(id, value);

      if (required && value === null) {
        setError(id, { type: 'manual', message: '' });
      } else {
        clearErrors(id);
      }
    };

  const buttonStyle =
    'p-3 border-2 border-gray-200 bg-gray-100 focus:outline-none focus:shadow-outline';

  const classNames = clsx('grid grid-cols-2 gap-0');

  return (
    <div className={classNames}>
      <ThemedBooleanButton
        className={clsx(
          buttonStyle,
          'ft-boolean border-r-0 rounded-tl rounded-bl',
          {
            active: checked === true,
          },
          {
            'ft-input--error': error,
          },
        )}
        onClick={handleClick(true)}
      >
        Yes
      </ThemedBooleanButton>
      <ThemedBooleanButton
        className={clsx(
          buttonStyle,
          'ft-boolean rounded-tr rounded-br',
          {
            active: checked === false,
          },
          {
            'ft-input--error': error,
          },
        )}
        onClick={handleClick(false)}
      >
        No
      </ThemedBooleanButton>
    </div>
  );
};
