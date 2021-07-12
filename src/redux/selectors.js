import {createSelector} from 'reselect';

export const daybookSelector = (state) => state.daybook.entities;
export const daybookLoadingSelector = (state) => state.daybook.loading;
export const daybookLoadedSelector = (state) => state.daybook.loaded;
export const errorLoadedSelector = (state) => state.daybook.error;

export const daybookDateTimeSelector = createSelector(
    daybookSelector,
    (note) => {
        return (
            note.slice().sort((a, b) => {
                a = new Date(`${a.date}T${a.time}`);
                b = new Date(`${b.date}T${b.time}`);
                return a > b ? -1 : a < b ? 1 : 0;
            })
        )
    }
)

export const newNoteBackgroundSelector = state => state.newNote.dark
export const editModeNewNoteSelector = state => state.newNote.editMode
export const loadingNewNoteSelector = state => state.newNote.loading
export const loadedNewNoteSelector = state => state.newNote.loaded
export const errorNewNoteSelector = state => state.newNote.error

export const delNoteBackgroundSelector = state => state.delNote.dark
export const editModeDelNoteSelector = state => state.delNote.confirmMode
export const loadingDelNoteSelector = state => state.delNote.loading
export const loadedDelNoteSelector = state => state.delNote.loaded
export const errorDelNoteSelector = state => state.delNote.error

