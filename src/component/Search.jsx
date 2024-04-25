import React from "react";
import PropTypes from "prop-types";
import useLocale from "../hooks/useLocale";

function Search({ keyword, keywordChange }) {
  const locale = useLocale();

  const handleKeywordChange = (e) => {
    keywordChange(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={locale === "id" ? "Pencarian..." : "Search..."}
        value={keyword}
        onChange={handleKeywordChange}
      />
    </div>
  );
}

Search.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default Search;
