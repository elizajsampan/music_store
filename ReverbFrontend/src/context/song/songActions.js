import SongActionTypes from "./songActionTypes";

export const setSongs = (songs) => ({
  type: SongActionTypes.SET_SONGS,
  payload: songs,
});

export const setSongbyId = (songById) => ({
  type: SongActionTypes.SET_SONG_BY_ID,
  payload: songById,
});

export const addSong = (song) => {
  return {
    type: SongActionTypes.ADD_SONG,
    payload: song,
  };
};

export const editSong = (songId, updatedSong) => {
  return {
    type: SongActionTypes.EDIT_SONG,
    payload: {songId, updatedSong}
  };
};

export const deleteSongStart = (songIdToDelete) => {
    return {
      type: SongActionTypes.DELETE_SONG_START,
      payload: songIdToDelete,
    };
};
  
export const deleteSongFinish = (songIdToDelete) => ({
  type: SongActionTypes.DELETE_SONG_FINISH,
  // payload: songIdToDelete
});

export const deleteSongCancel = (songIdToDelete) => ({
  type: SongActionTypes.DELETE_SONG_CANCEL,
});
