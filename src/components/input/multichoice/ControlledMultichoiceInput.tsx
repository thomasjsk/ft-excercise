import React, { useMemo } from 'react';
import { MultichoiceInput } from './MultichoiceInput';
import { Error, Label } from '../common';
import { useFormContext } from 'react-hook-form';

const DEFAULT_ERROR = 'Invalid value';

export const ControlledMultichoiceInput: React.FC<Frontier.Element> = ({
  id,
  question_text: questionText,
  metadata,
}: Frontier.Element) => {
  const { required } = metadata;
  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const selected = getValues(id);
  const error = errors[id];

  const errorMessage = useMemo(() => {
    return error ? DEFAULT_ERROR : '';
  }, [error && error.type]);

  const displayedOptions = useMemo(
    () =>
      (metadata.options || []).filter(
        option => !(selected || []).includes(option.value),
      ),
    [selected],
  );

  const label = useMemo(
    () => <Label text={required ? questionText + '*' : questionText} />,
    [required, questionText],
  );
  const input = (
    <MultichoiceInput id={id} metadata={metadata} options={displayedOptions} />
  );
  const errorLabel = <Error text={errorMessage} />;

  return (
    <div>
      {label}
      {input}
      {errorLabel}
    </div>
  );
};
