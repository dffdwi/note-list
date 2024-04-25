import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/api";
import { showFormattedDate } from "../utils/index";
import Search from "../component/Search";
import Unarchive from "../component/Unarchive";
import Loading from "../component/Loading";
import PropTypes from "prop-types";

function NotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const onDeleteHandler = async (id) => {
    try {
      await deleteNote(id);
      const { data } = await getActiveNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onArchiveHandler = async (id) => {
    try {
      await archiveNote(id);
      const { data } = await getActiveNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error archiving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onUnarchiveHandler = async (id) => {
    try {
      await unarchiveNote(id);
      const { data } = await getActiveNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error unarchiving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeywordChangeHandler = (keyword) => {
    setSearchKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="App">
      <div className="note-app__body">
        <Search
          keyword={searchKeyword}
          keywordChange={onKeywordChangeHandler}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Unarchive
            unarchivedNotes={filteredNotes}
            deleteNote={onDeleteHandler}
            archiveNote={onArchiveHandler}
            unarchiveNote={onUnarchiveHandler}
            showFormattedDate={showFormattedDate}
          />
        )}
      </div>
    </div>
  );
}

NotesPage.propTypes = {
  onDeleteHandler: PropTypes.func,
  onArchiveHandler: PropTypes.func,
  onUnarchiveHandler: PropTypes.func,
  onKeywordChangeHandler: PropTypes.func,
};

export default NotesPage;
