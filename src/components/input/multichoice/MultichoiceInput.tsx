import React, { useState } from 'react';
import clsx from 'clsx';
import { XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useFormContext } from 'react-hook-form';
import { ThemedMultiChoiceSelectedItem } from '../styled-input';

interface MultichoiceInputProps {
  id: string;
  metadata: Frontier.ElementMeta;
  options: { label: string; value: string }[];
}
export const MultichoiceInput: React.FC<MultichoiceInputProps> = ({
  id,
  metadata: { required },
  options,
}: MultichoiceInputProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleOpen = (event: React.MouseEvent<any>) => {
    event.preventDefault();

    setOpen(state => !state);
  };

  const {
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const selected = getValues(id) || [];
  const error = errors[id];
  const { onChange, ...rest } = register(id, {
    required,
  });

  const handleChange = (value: string[]) => {
    setValue(id, value);

    if (required && !value.length) {
      setError(id, { type: 'manual', message: '' });
    } else {
      clearErrors(id);
    }
  };

  const handleAdd = (valueToAdd: string) => (event: React.MouseEvent<any>) => {
    event.preventDefault();

    const nextValue = [...selected, valueToAdd];
    handleChange(nextValue);
  };

  const handleRemove =
    (valueToRemove: string) => (event: React.MouseEvent<any>) => {
      event.preventDefault();

      const nextValue = selected.filter(
        (value: string) => value !== valueToRemove,
      );
      handleChange(nextValue);
    };

  const buttonStyle = 'focus:outline-none focus:shadow-outline';

  const selectedOptions = selected.map((selectedOption: string) => (
    <ThemedMultiChoiceSelectedItem
      key={'selected-option-' + selectedOption}
      className="m-1 px-2 py-1 shadow rounded flex flex-row"
    >
      <button
        className={clsx(buttonStyle, 'mr-1')}
        onClick={handleRemove(selectedOption)}
      >
        <XIcon className="w-4 h-4" />
      </button>
      <div>{selectedOption}</div>
    </ThemedMultiChoiceSelectedItem>
  ));

  const toggleButton = (
    <button
      className={clsx(buttonStyle, 'mx-2 m-2 mr-1')}
      onClick={handleToggleOpen}
    >
      <ChevronDownIcon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="relative">
      <div
        className={clsx('flex flex-row ft-input', {
          'ft-input--error': error,
        })}
      >
        <div className="flex flex-row flex-wrap flex-grow">
          {selectedOptions}
        </div>
        <div>{toggleButton}</div>
      </div>
      {open ? (
        <div className="absolute mt-2 py-2 w-full h-64 border-1 rounded border-gray-300 bg-gray-100 shadow overflow-auto text-sm">
          {options.map(option => (
            <div
              key={'option' + option.label}
              className="px-4 py-1 cursor-pointer hover:bg-white"
              onClick={handleAdd(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
