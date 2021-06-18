import NoteActionTypes from "./note.types";

export const addNoteStart = (Note) => ({
  type: NoteActionTypes.ADD_NOTE_START,
  payload: Note,
});

export const addNoteSuccess = (Note) => ({
  type: NoteActionTypes.ADD_NOTE_SUCCESS,
  payload: Note,
});

export const addNoteFailure = (error) => ({
  type: NoteActionTypes.ADD_NOTE_FAILURE,
  payload: error,
});

export const editNoteStart = (Note) => ({
  type: NoteActionTypes.EDIT_NOTE_START,
  payload: Note,
});

export const editNoteSuccess = (Note) => ({
  type: NoteActionTypes.EDIT_NOTE_SUCCESS,
  payload: Note,
});

export const editNoteFailure = (error) => ({
  type: NoteActionTypes.EDIT_NOTE_FAILURE,
  payload: error,
});

export const fetchNotesStart = () => ({
  type: NoteActionTypes.FETCH_NOTES_START,
});

export const fetchNotesSuccess = (Notes) => ({
  type: NoteActionTypes.FETCH_NOTES_SUCCESS,
  payload: Notes,
});

export const fetchNotesFailure = (error) => ({
  type: NoteActionTypes.FETCH_NOTES_FAILURE,
  payload: error,
});
