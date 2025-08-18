"use client";

import {
  PASSWORD_INPUT_NAME,
  PHONE_NUMBER_INP_NAME,
} from "@/lib/utils/loginFormSchema";
import { ChangeEvent, useActionState, useState } from "react";
import { FailedLoginResult, LoginResult } from "@/lib/utils/authPageUtils";
import { NUMBER_ONLY_REGEX } from "@/lib/utils/globalUtils";
import { Login } from "@/lib/auth/actions";

import InputFormControl from "@/components/InputFormControl";
import TextInput from "@/components/textInput";
import styles from "./login.module.scss";
import Form from "next/form";

const phoneNumberInpID = "login-phone-num-inp";
const passwordInpID = "login-password-inp";

const initialState: LoginResult = {
  success: false,
  errors: { formErrors: [], fieldErrors: {} },
};

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [authState, loginAction, pending] = useActionState(
    (prevState: any, formData: FormData) => Login(formData),
    initialState
  );

  const phoneNumInpErrors = (
    authState as FailedLoginResult
  )?.errors?.fieldErrors?.[PHONE_NUMBER_INP_NAME]?.join(" | ");

  const passwordInpErrors = (
    authState as FailedLoginResult
  )?.errors?.fieldErrors[PASSWORD_INPUT_NAME]?.join(" | ");

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: Programmatically prevent falsy values from being set
    const value = e.target.value;
    const isValid = NUMBER_ONLY_REGEX.test(value);

    isValid && setPhoneNumber(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: Programmatically prevent falsy values from being set
    setPassword(e.target.value);
  };

  return (
    <Form action={loginAction} className={styles["login-form-wrapper"]}>
      <header>Login Page</header>

      <div className={styles["inputs-wrapper"]}>
        <InputFormControl
          id={phoneNumberInpID}
          labels={{ tl: "Phone Number" }}
          error={phoneNumInpErrors}
        >
          <TextInput
            id={phoneNumberInpID}
            placeholder="eg: 09123456789"
            name={PHONE_NUMBER_INP_NAME}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            type="tel"
          />
        </InputFormControl>

        <InputFormControl
          id={passwordInpID}
          labels={{ tl: "Password" }}
          error={passwordInpErrors}
        >
          <TextInput
            id={passwordInpID}
            placeholder="Password"
            name={PASSWORD_INPUT_NAME}
            value={password}
            onChange={handlePasswordChange}
            type="text"
          />
        </InputFormControl>

        <button>Login</button>

        {!authState.success &&
          authState.errors &&
          authState.errors.formErrors.length > 0 && (
            <div>{authState.errors.formErrors[0]}</div>
          )}
      </div>
    </Form>
  );
}
