import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/api";
import { showFormattedDate } from "../utils/index";
import Archive from "../component/Archive";
import Search from "../component/Search";
import Loading from "../component/Loading";
import PropTypes from "prop-types";

function ArchivePage() {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const fetchArchivedNotes = async () => {
    try {
      const { data } = await getArchivedNotes();
      setArchivedNotes(data);
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    setKeyword(keyword);
  }, [searchParams]);

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  const onDeleteHandler = async (id) => {
    try {
      await deleteNote(id);
      fetchArchivedNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const onArchiveHandler = async (id) => {
    try {
      await archiveNote(id);
      fetchArchivedNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const onUnarchiveHandler = async (id) => {
    try {
      await unarchiveNote(id);
      fetchArchivedNotes();
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    changeSearchParams(keyword);
  };

  const filteredArchivedNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="App">
      <div className="note-app__body">
        <Search keyword={keyword} keywordChange={onKeywordChangeHandler} />
        {loading ? (
          <Loading />
        ) : (
          <Archive
            archivedNotes={filteredArchivedNotes}
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

ArchivePage.propTypes = {
  onDeleteHandler: PropTypes.func,
  onArchiveHandler: PropTypes.func,
  onUnarchiveHandler: PropTypes.func,
  onKeywordChangeHandler: PropTypes.func,
};

export default ArchivePage;
