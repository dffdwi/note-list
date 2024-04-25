import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import useLocale from "../hooks/useLocale";

function RegisterInput({ register }) {
  const locale = useLocale();
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(
        locale === "id" ? "Password tidak cocok" : "Passwords do not match"
      );
      return;
    }

    register({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      <input
        type="text"
        placeholder={locale === "id" ? "Nama Panggilan" : "Nickname"}
        value={name}
        onChange={onNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder={locale === "id" ? "Sandi" : "Password"}
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
      />
      <input
        type="password"
        placeholder={locale === "id" ? "Konfirmasi Sandi" : "Confirm Password"}
        autoComplete="current-password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <button>{locale === "id" ? "Daftar" : "Register"}</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
