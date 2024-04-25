import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import { notePropTypes } from "../utils/propTypes";
import useLocale from "../hooks/useLocale";

function Unarchive({
  unarchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  showFormattedDate,
}) {
  const locale = useLocale();

  return (
    <div>
      <h2>{locale === "id" ? "Catatan Aktif" : "Unarchived Notes"}</h2>
      <div className="notes-list">
        {!unarchivedNotes.length ? (
          <p className="notes-list__empty-message">
            {locale === "id"
              ? "Tidak ditemukan Catatan aktif!"
              : "No unarchived notes found!"}
          </p>
        ) : (
          unarchivedNotes.map((note) => (
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

Unarchive.propTypes = {
  unarchivedNotes: PropTypes.arrayOf(PropTypes.shape(notePropTypes).isRequired)
    .isRequired,
  deleteNote: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired,
  unarchiveNote: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

export default Unarchive;
