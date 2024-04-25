import { LocaleConsumer } from "../contexts/LocaleContext";

function ToggleLocale() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <button className="nav toggle-button" onClick={toggleLocale}>
            {locale === "id" ? "en" : "id"}
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

export default ToggleLocale;
