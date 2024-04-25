import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NoteInput from "../component/NoteInput";
import { addNote } from "../utils/api";
import Loading from "../component/Loading";

function AddNotePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = async (newNote) => {
    setIsLoading(true);
    await addNote(newNote);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="App">
      <div className="add-note-page">
        {isLoading ? <Loading /> : <NoteInput addNote={handleAddNote} />}
      </div>
    </div>
  );
}

export default AddNotePage;
