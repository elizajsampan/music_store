import SearchActionTypes from "./searchActionTypes";


export const searchbyTitleArtist = (searchedSongs) => ({
  type: SearchActionTypes.SEARCH_BY_TITLE_ARTIST,
  payload: searchedSongs,
});

export const searchbyGenre = (searchedSongs) => ({
  type: SearchActionTypes.SEARCH_BY_GENRE,
  payload: searchedSongs,
});
