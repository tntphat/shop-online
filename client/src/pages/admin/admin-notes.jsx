import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import Popup from "../../features/popUp";
import Notification from "../../features/Notification";
import NoteFrom from "../../components/Forms/Admin-Note";
import ImportNoteFrom from "../../components/Forms/Admin-import";
import NotesTable from "../../components/admin-data-tables/admin-date-notes";
import { fetchNotesStart } from "../../redux/note/note.actions";
import { fetchProductsStart } from "../../redux/product/product.actions";
const AdminAddproduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotesStart());
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const notes = useSelector((state) => state.note.notes);

  const products = useSelector((state) => state.product.products);

  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleImportNote = (note) => {
    setSelectedNote(note);
    setOpenPopup2(true);
  };
  return (
    <>
      <Button onClick={() => setOpenPopup(true)} variant="contained">
        Add
      </Button>
      <Typography variant="h2">Notes</Typography>
      <NotesTable handleImportNote={handleImportNote} notes={notes} />

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <NoteFrom
          setNotify={setNotify}
          products={products}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Popup
        title="Import Note"
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <ImportNoteFrom
          setNotify={setNotify}
          note={selectedNote}
          setOpenPopup={setOpenPopup2}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </>
  );
};

export default AdminAddproduct;
