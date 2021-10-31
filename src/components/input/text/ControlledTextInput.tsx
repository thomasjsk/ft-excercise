import React, { useMemo } from 'react';
import { Error, Label } from '../common';
import { TextInput } from './TextInput';
import { useFormContext } from 'react-hook-form';

const DEFAULT_ERROR = 'Incorrect value';

export const ControlledTextInput: React.FC<Frontier.Element> = ({
  id,
  question_text: questionText,
  metadata,
}: Frontier.Element) => {
  const { required } = metadata;
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[id];

  const errorMessage = useMemo(() => {
    return error ? DEFAULT_ERROR : '';
  }, [error && error.type]);

  const label = useMemo(
    () => <Label text={required ? questionText + '*' : questionText} />,
    [required, questionText],
  );
  const input = <TextInput id={id} metadata={metadata} />;
  const errorLabel = <Error text={errorMessage} />;

  return (
    <div className="flex flex-col">
      {label}
      <div>
        {input}
        {errorLabel}
      </div>
    </div>
  );
};
