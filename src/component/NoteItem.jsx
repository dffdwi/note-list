import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { notePropTypes } from "../utils/propTypes";
import useLocale from "../hooks/useLocale";

function NoteItem({
  note,
  deleteNote,
  archiveNote,
  unarchiveNote,
  showFormattedDate,
}) {
  const locale = useLocale();

  const handleDeleteClick = () => {
    deleteNote(note.id);
  };

  const handleArchiveClick = () => {
    archiveNote(note.id);
  };

  const handleUnarchiveClick = () => {
    unarchiveNote(note.id);
  };

  return (
    <div className="note-item">
      <div className="note-item__content">
        <Link to={`/note/${note.id}`}>
          <h2 className="note-item__title">{note.title}</h2>
        </Link>
        <p className="note-item__date">
          {showFormattedDate(note.createdAt, locale)}
        </p>
        <p className="note-item__body">{note.body}</p>
      </div>
      <div className="note-item__action">
        <button
          className="note-item__delete-button"
          onClick={handleDeleteClick}
        >
          {locale === "id" ? "Hapus" : "Delete"}
        </button>
        {!note.archived ? (
          <button
            className="note-item__archive-button"
            onClick={handleArchiveClick}
          >
            {locale === "id" ? "Arsipkan" : "Archive"}
          </button>
        ) : (
          <button
            className="note-item__archive-button"
            onClick={handleUnarchiveClick}
          >
            {locale === "id" ? "Batal Arsip" : "Unarchive"}
          </button>
        )}
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape(notePropTypes).isRequired,
  deleteNote: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired,
  unarchiveNote: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

export default NoteItem;
