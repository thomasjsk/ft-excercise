import React from 'react';
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { ControlledTextInput } from './ControlledTextInput';
import { FormProvider, useForm } from 'react-hook-form';

const getErrorLabel = () => screen.getByTestId('text-input-error');
const getSourceInput = () => screen.getByTestId('base-text-input');
const getSourceInputLabel = () => screen.getByTestId('base-text-input-label');

const exampleMetadata = {
  format: 'text',
  required: true,
  placeholder: 'banana',
} as Frontier.ElementMeta;

const TestingComponent = props => {
  const methods = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  const onSubmit = (data: any) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{props.children}</form>
    </FormProvider>
  );
};
describe('ControlledTextInput', () => {
  test('should render one text input', () => {
    render(
      <TestingComponent>
        <ControlledTextInput
          id="pomelo"
          type="text"
          question_text="Label text"
          metadata={exampleMetadata}
        />
      </TestingComponent>,
    );

    expect(screen.getAllByTestId('text-input')).toHaveLength(1);
  });

  test('error label should be empty on pristine element', () => {
    render(
      <ControlledTextInput
        id="pomelo"
        type="text"
        question_text="Label text"
        metadata={exampleMetadata}
      />,
    );

    expect(getErrorLabel()).toHaveTextContent('');
  });

  test('input label should be postfixed with "*" if is required', () => {
    const required = true;
    const label = 'Full name';
    const expectedLabel = label + '*';

    render(
      <ControlledTextInput
        id="pomelo"
        type="text"
        question_text={label}
        metadata={{ ...exampleMetadata, required }}
      />,
    );

    expect(getSourceInputLabel()).toHaveTextContent(expectedLabel);
  });

  describe('validation', () => {
    describe('required', () => {
      test('should display error message when required input was emptied', () => {
        const required = true;

        render(
          <ControlledTextInput
            id="pomelo"
            type="text"
            question_text="Label text"
            metadata={{ ...exampleMetadata, required }}
          />,
        );
        const sourceInput = getSourceInput();

        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: 'John Doe' },
        });
        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: '' },
        });
        expect(getErrorLabel().textContent).not.toBeNull();
      });

      test('should NOT display error message when required input was emptied', () => {
        const required = false;

        render(
          <ControlledTextInput
            id="pomelo"
            type="text"
            question_text="Label text"
            metadata={{ ...exampleMetadata, required }}
          />,
        );
        const sourceInput = getSourceInput();

        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: 'John Doe' },
        });
        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: '' },
        });
        expect(getErrorLabel()).toHaveTextContent('');
      });
    });

    describe('pattern', () => {
      test('should display error message when input value not matching the pattern', () => {
        const pattern = '^[A-Za-z\\s]+$';

        render(
          <ControlledTextInput
            id="pomelo"
            type="text"
            question_text="Label text"
            metadata={{ ...exampleMetadata, pattern }}
          />,
        );
        const sourceInput = getSourceInput();

        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: 'John Doe' },
        });
        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: 'John 3000' },
        });
        expect(getErrorLabel().textContent).not.toBeNull();
      });

      test('should NOT display error message when input value matching the pattern', () => {
        const pattern = '^[A-Za-z\\s]+$';

        render(
          <ControlledTextInput
            id="pomelo"
            type="text"
            question_text="Label text"
            metadata={{ ...exampleMetadata, pattern }}
          />,
        );
        const sourceInput = getSourceInput();

        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: 'John Doe' },
        });
        expect(getErrorLabel()).toHaveTextContent('');

        fireEvent.change(sourceInput, {
          target: { value: 'Anne Smith' },
        });
        expect(getErrorLabel()).toHaveTextContent('');
      });
    });
  });
});
