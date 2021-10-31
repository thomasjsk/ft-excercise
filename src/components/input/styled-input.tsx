import styled from 'styled-components';

const themeStyle = ({ theme }: { theme: any }) => ({
  border: `2px solid ${theme.secondary_color}`,
  '&.active': {
    color: `${theme.primary_color}`,
    backgroundColor: `${theme.secondary_color}`,
  },
});

export const ThemedTextInput = styled.input(themeStyle);
export const ThemedTextArea = styled.textarea(themeStyle);
export const ThemedBooleanButton = styled.button(themeStyle);
export const ThemedMultiChoiceSelectedItem = styled.div(themeStyle);
