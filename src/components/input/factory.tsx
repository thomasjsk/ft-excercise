import React from 'react';
import { ControlledTextInput } from './text';
import { ControlledTextArea } from './textarea';
import { ControlledBooleanInput } from './boolean';
import { ControlledMultichoiceInput } from './multichoice';
export const elementFactory = ({
  id,
  type,
  question_text: questionText,
  metadata,
}: Frontier.Element): JSX.Element => {
  return {
    boolean: (
      <ControlledBooleanInput
        key={`element-${id}`}
        id={id}
        question_text={questionText}
        metadata={metadata}
        type={type}
      />
    ),
    text: (
      <ControlledTextInput
        key={`element-${id}`}
        id={id}
        type={type}
        question_text={questionText}
        metadata={metadata}
      />
    ),
    textarea: (
      <ControlledTextArea
        key={`element-${id}`}
        id={id}
        type={type}
        question_text={questionText}
        metadata={metadata}
      />
    ),
    multichoice: (
      <ControlledMultichoiceInput
        key={`element-${id}`}
        id={id}
        type={type}
        question_text={questionText}
        metadata={metadata}
      />
    ),
  }[type];
};
