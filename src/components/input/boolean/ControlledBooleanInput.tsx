import React, { useMemo } from 'react';
import { BooleanInput } from './BooleanInput';
import { Error, Label } from '../common';
import { useFormContext } from 'react-hook-form';

const DEFAULT_ERROR = 'Pick one!';

export const ControlledBooleanInput: React.FC<Frontier.Element> = ({
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
  const input = <BooleanInput id={id} metadata={metadata} />;
  const errorLabel = <Error text={errorMessage} />;

  return (
    <div>
      {label}
      {input}
      {errorLabel}
    </div>
  );
};
