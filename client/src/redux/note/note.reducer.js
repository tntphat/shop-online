import NoteActionTypes from "./note.types";

const INITIAL_STATE = {
  notes: [],
  error: null,
};

const noteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NoteActionTypes.ADD_NOTE_SUCCESS:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        error: null,
      };

    case NoteActionTypes.ADD_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case NoteActionTypes.EDIT_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
        error: null,
      };

    case NoteActionTypes.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        error: null,
      };
    case NoteActionTypes.FETCH_NOTES_FAILURE:
    case NoteActionTypes.EDIT_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default noteReducer;
