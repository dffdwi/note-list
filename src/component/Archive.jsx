import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import { notePropTypes } from "../utils/propTypes";
import useLocale from "../hooks/useLocale";

function Archive({
  archivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  showFormattedDate,
}) {
  const locale = useLocale();

  return (
    <div>
      <h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
      <div className="notes-list">
        {!archivedNotes.length ? (
          <p className="notes-list__empty-message">
            {locale === "id"
              ? "Tidak ditemukan Catatan arsip!"
              : "No archived notes found!"}
          </p>
        ) : (
          archivedNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              unarchiveNote={unarchiveNote}
              showFormattedDate={showFormattedDate}
            />
          ))
        )}
      </div>
    </div>
  );
}

Archive.propTypes = {
  archivedNotes: PropTypes.arrayOf(PropTypes.shape(notePropTypes).isRequired)
    .isRequired,
  deleteNote: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired,
  unarchiveNote: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

export default Archive;
