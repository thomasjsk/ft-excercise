import React, { useMemo } from 'react';
import formInstructions from '../data/form_instructions.json';
import { Section } from './section';
import { elementFactory } from './input/factory';
import { FormProvider, useForm } from 'react-hook-form';
import styled, { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  const job = formInstructions as Frontier.Job;
  const methods = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

  const onSubmit = (data: any) => console.log(data);

  const theme: Frontier.Theme = useMemo(() => job.theme, []);

  const SubmitWrapper = styled.div``;
  const Submit = styled.input`
    background-color: ${({ theme }) => theme.secondary_color};
    ${SubmitWrapper}:hover & {
      background-color: ${({ theme }) => theme.primary_color};
      color: ${({ theme }) => theme.secondary_color};
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <div
        className="container mx-auto"
        style={{
          backgroundColor: theme.background_color,
          color: theme.text_color,
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <>
              {job.sections.map(({ id, title, content }) => (
                <Section key={`section-${id}`} id={id} title={title}>
                  {content.map(element => elementFactory(element))}
                </Section>
              ))}
              <div className="flex flex-col mx-8 p-2">
                <div className="my-4">
                  <SubmitWrapper>
                    <Submit type="submit" className="ft-input ft-submit" />
                  </SubmitWrapper>
                </div>
              </div>
            </>
          </form>
        </FormProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
