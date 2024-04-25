import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import useLocale from "../hooks/useLocale";

function LoginInput({ login }) {
  const locale = useLocale();
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="login-input">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder={locale === "id" ? "Sandi" : "Password"}
        value={password}
        onChange={onPasswordChange}
      />
      <button>{locale === "id" ? "Masuk" : "Login"}</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
