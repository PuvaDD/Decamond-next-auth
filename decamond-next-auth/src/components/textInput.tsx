import type { FC, InputHTMLAttributes } from "react";

import InputFormControl, { InputFormControlProps } from "./InputFormControl";

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  id: string;
  error?: string;
};

export const TextInputWithLabels: FC<
  TextInputProps & InputFormControlProps
> = ({ id, error, labels, ...rest }) => {
  return (
    <InputFormControl {...{ id, error, labels }}>
      <TextInput {...{ ...rest, error, id }} />
    </InputFormControl>
  );
};

const TextInput: FC<TextInputProps> = ({ id, error, ...rest }) => {
  return <input autoComplete="off" id={id} {...rest} />;
};

export default TextInput;
