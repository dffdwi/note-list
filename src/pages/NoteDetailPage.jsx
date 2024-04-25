import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/api";
import { showFormattedDate } from "../utils/index";
import NotFoundPage from "./NotFoundPage";
import Loading from "../component/Loading";

function NoteDetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await getNote(id);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!note) {
    return <NotFoundPage />;
  }

  const formattedDate = new Date(note.createdAt).toISOString();

  return (
    <div className="App">
      <div className="note-detail">
        <h1>{note.title}</h1>
        <p>Date: {showFormattedDate(formattedDate)}</p>
        <p>{note.body}</p>
      </div>
    </div>
  );
}

export default NoteDetailPage;
