import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import useLocale from "../hooks/useLocale";

function NoteInput({ addNote }) {
  const locale = useLocale();
  const [title, setTitle] = useInput("");
  const [body, setBody] = useInput("");
  const titleCharLimit = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    console.log("New Note:", newNote);

    addNote(newNote);

    setTitle("");
    setBody("");
  };

  return (
    <div className="note-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={locale === "id" ? "Judul" : "Title"}
          value={title}
          onChange={setTitle}
          maxLength={titleCharLimit}
          required
        />
        <span className="note-input__title__char-limit">
          {titleCharLimit - title.length}{" "}
          {locale === "id" ? "karakter tersisa" : "characters left"}
        </span>
        <textarea
          placeholder={locale === "id" ? "Catatan" : "Note"}
          value={body}
          onChange={setBody}
          required
        />
        <button type="submit">
          {locale === "id" ? "Tambah Catatan" : "Add Note"}
        </button>
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
