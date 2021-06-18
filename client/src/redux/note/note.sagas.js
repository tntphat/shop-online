import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axiosInstance from "../../helpers/axiosInstance";

import { selectCurrentEmployee } from "../user/user.selector";

import NoteActionTypes from "./note.types";

import {
  addNoteFailure,
  addNoteSuccess,
  fetchNotesSuccess,
  fetchNotesFailure,
  editNoteSuccess,
  editNoteFailure,
} from "./note.actions";

export function* addNote({ payload }) {
  try {
    console.log("helo from saga note ADD");
    const curEmployee = yield select(selectCurrentEmployee);
    console.log(payload, curEmployee);
    const { data } = yield axiosInstance.post("/note", payload, {
      headers: {
        Authorization: "Bearer " + curEmployee.token,
      },
    });
    console.log("data: ", data);
    yield put(addNoteSuccess(data));
  } catch (error) {
    yield put(addNoteFailure(error.response.data));
  }
}

export function* editNote({ payload }) {
  const { dataToNote, dataToImportNote, setNotify, setOpenPopup } = payload;
  try {
    const curEmployee = yield select(selectCurrentEmployee);

    const { data } = yield axiosInstance.patch(
      `/note/${payload.id}`,
      {
        dataNote: dataToNote,
        dataImportNote: dataToImportNote,
      },
      {
        headers: {
          Authorization: "Bearer " + curEmployee.token,
        },
      }
    );
    yield setNotify({
      isOpen: true,
      message: "Added import note success",
      type: "success",
    });
    yield setOpenPopup(false);
    yield put(editNoteSuccess(data));
  } catch (e) {
    yield setNotify({
      isOpen: true,
      message: "Sth went wrong",
      type: "error",
    });
    yield put(editNoteFailure(e));
  }
}

export function* fetchNotes() {
  try {
    console.log("helo from saga FETCH NOTELLLS");
    const { data } = yield axiosInstance.get("/note");
    console.log(data);
    yield put(fetchNotesSuccess(data));
  } catch (error) {
    yield put(fetchNotesFailure(error.response.data));
  }
}

export function* onAddNoteStart() {
  yield takeLatest(NoteActionTypes.ADD_NOTE_START, addNote);
}

export function* onEditNoteStart() {
  yield takeLatest(NoteActionTypes.EDIT_NOTE_START, editNote);
}

export function* onFetchNotesStart() {
  yield takeLatest(NoteActionTypes.FETCH_NOTES_START, fetchNotes);
}

export function* noteSagas() {
  yield all([
    call(onAddNoteStart),
    call(onFetchNotesStart),
    call(onEditNoteStart),
  ]);
}
