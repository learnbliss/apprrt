import {createSelector} from 'reselect';

export const daybookSelector = (state) => state.daybook.entities;
export const daybookLoadingSelector = (state) => state.daybook.loading;
export const daybookLoadedSelector = (state) => state.daybook.loaded;

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

export const backgroundSelector = state => state.newNote.dark
export const editModeNewNoteSelector = state => state.newNote.editMode
export const loadingNewNoteSelector = state => state.newNote.loading
export const loadedNewNoteSelector = state => state.newNote.loaded
export const errorNewNoteSelector = state => state.newNote.error
