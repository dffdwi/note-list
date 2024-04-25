import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const useLocale = () => {
  const { locale } = useContext(LocaleContext);
  return locale;
};

export default useLocale;
