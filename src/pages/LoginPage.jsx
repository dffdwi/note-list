import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../component/LoginInput";
import { login } from "../utils/api";
import useLocale from "../hooks/useLocale";
import Loading from "../component/Loading";

function LoginPage({ loginSuccess }) {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin({ email, password }) {
    setIsLoading(true);
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }

    setIsLoading(false);
  }

  return (
    <section className="login-page">
      <h2>{locale === "id" ? "Masuk" : "Login"}</h2>
      <LoginInput login={onLogin} />
      {isLoading && <Loading />}
      <p>
        {locale === "id" ? "Belum punya akun" : "No account"}?{" "}
        <Link to="/register">
          {locale === "id" ? "Daftar di sini" : "Register here"}
        </Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
