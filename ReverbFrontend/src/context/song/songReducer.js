import SongActionTypes from "./songActionTypes";
import songActionTypes from "./songActionTypes";

const songReducer = (state, action) => {
  
  switch (action.type) {
    case songActionTypes.SET_SONGS:
      return {
        ...state,
        songs: action.payload,
      };
    case songActionTypes.SET_SONG_BY_ID:
      return {
        ...state,
        songById: action.payload,
      };
    case SongActionTypes.ADD_SONG:
      return {
        ...state,
        song: [...state.songs, action.payload],
      };
    case SongActionTypes.EDIT_SONG:
      return {
        ...state,
        songs: state.songs.map((s) =>
          s.songId === action.payload.songId ? action.payload.updatedSong : s
        ),
      };    
    case SongActionTypes.DELETE_SONG_START:
      return {
        ...state,
        songIdToDelete: action.payload,
        showDeleteConfirmationModal: true,
      };
    case SongActionTypes.DELETE_SONG_FINISH:
      return {
        ...state,
        songs: state.songs.filter((song) => song.songId !== state.songIdToDelete),  // hard delete
        // songs: state.songs.filter((song) => song.deleted !== true),  // soft delete
        songIdToDelete: null,
        showDeleteConfirmationModal: false,
      };
    case SongActionTypes.DELETE_SONG_CANCEL:
      return {
        ...state,
        songIdToDelete: null,
        showDeleteConfirmationModal: false,
      };
    default:
      return state;
  }
};

export default songReducer;
