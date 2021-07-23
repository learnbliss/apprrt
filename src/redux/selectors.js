import {createSelector} from 'reselect';
import {normalizeTime} from '../utils/utils';

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

export const newNoteBackgroundSelector = state => state.newNote.dark;
export const editModeNewNoteSelector = state => state.newNote.editMode;
export const loadingNewNoteSelector = state => state.newNote.loading;
export const loadedNewNoteSelector = state => state.newNote.loaded;
export const errorNewNoteSelector = state => state.newNote.error;

export const delNoteBackgroundSelector = state => state.delNote.dark;
export const confirmDelNoteModeSelector = state => state.delNote.confirmMode;
export const noteIdDelNoteModeSelector = state => state.delNote.noteId;
export const loadingDelNoteSelector = state => state.delNote.loading;
export const loadedDelNoteSelector = state => state.delNote.loaded;
export const errorDelNoteSelector = state => state.delNote.error;

export const errorWeatherSelector = state => state.weather.error;
export const latitudeSelector = state => state.weather.latitude;
export const longitudeSelector = state => state.weather.longitude;
export const dataWeatherSelector = state => state.weather.data;

export const sunriseTimeSelector = createSelector(
    dataWeatherSelector,
    (data) => normalizeTime(data?.sys.sunrise, data?.timezone)
)

export const sunsetTimeSelector = createSelector(
    dataWeatherSelector,
    (data) => normalizeTime(data?.sys.sunset, data?.timezone)
)
