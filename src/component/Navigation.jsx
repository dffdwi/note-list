import React from "react";
import { FiHome, FiArchive, FiPlusCircle, FiLogOut } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import ToggleTheme from "./ToggleTheme";
import ToggleLocale from "./ToggleLocale";
import useLocale from "../hooks/useLocale";

function Navigation({ logout, name }) {
  const locale = useLocale();
  return (
    <div className="App">
      <header className="note-app__header">
        <h1>
          {locale === "id"
            ? `Catatan Pribadi ${name}`
            : `${name}'s Personal Notes`}
        </h1>
        <ToggleLocale />
        <ToggleTheme />
        <NavLink className="nav" to="/">
          <FiHome />
        </NavLink>
        <NavLink className="nav" to="/archive">
          <FiArchive />
        </NavLink>
        <NavLink className="nav" to="/add-note">
          <FiPlusCircle />
        </NavLink>
        <Link className="nav-logout" onClick={logout}>
          <FiLogOut />
        </Link>
      </header>
    </div>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
