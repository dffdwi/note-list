import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../component/RegisterInput";
import { register } from "../utils/api";
import useLocale from "../hooks/useLocale";
import Loading from "../component/Loading";

function RegisterPage() {
  const locale = useLocale();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onRegisterHandler(user) {
    setIsLoading(true);
    const { error } = await register(user);
    setIsLoading(false);

    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>Register</h2>
      {isLoading ? <Loading /> : <RegisterInput register={onRegisterHandler} />}
      <p>
        {locale === "id" ? "Kembali ke " : "Back to "}
        <Link to="/">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
