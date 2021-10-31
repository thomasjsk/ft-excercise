export interface GeneralInputProps {
  id: string;
  format: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  required: boolean;
  placeholder?: string;
  pattern?: string;
  step?: number;
}
