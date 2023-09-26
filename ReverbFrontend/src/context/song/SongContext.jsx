import { createContext, useCallback, useContext, useReducer } from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../auth/AuthContext";
import {
  setSongs,
  setSongbyId,
  addSong,
  editSong,
  deleteSongFinish,
  deleteSongStart,
  deleteSongCancel,
} from "./songActions";
import songReducer from "./songReducer";

export const SongContext = createContext({
  songs: [],
  songById: null,
  song: null,
  showDeleteConfirmationModal: false,
  songIdToDelete: null,
  fetchSongs: () => {},
  fetchSongById: () => {},
  handleAddSong: () => {},
  handleEditSong: () => {},
  handleDeleteSongStart: () => {},
  handleHardDelete: () => {},
  handleSoftDelete: () => {},
  handleCancelDelete: () => {},
});

export const SongProvider = ({ children }) => {
  const initialState = {
    songs: [],
    songById: null,
    song: null,
    songIdToDelete: null,
    showDeleteConfirmationModal: false,
  };

  const [
    { songs, songById, song, showDeleteConfirmationModal, songIdToDelete },
    dispatch,
  ] = useReducer(songReducer, initialState);
  const { jwt } = useContext(AuthContext);
  const http = useHttp("http://localhost:8080/reverb");

  const fetchSongs = useCallback(async () => {
    const response = await http.get("/songs", {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    });
    dispatch(setSongs(response.data));
  }, [http, jwt]);

  const fetchSongById = useCallback(
    async (songId) => {
      const { data: songById } = await http.get(`/songs/${songId}`, {
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : "",
        },
      });
      dispatch(setSongbyId(songById));
    },
    [http, jwt]
  );

  const handleAddSong = useCallback(
    async (song) => {
      const { data: addedSong } = await http.post(
        "/songs/new",
        { ...song },
        {
          headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
          },
        }
      );
      dispatch(addSong(addedSong));
    },
    [http, jwt]
  );

  function refreshPage() {
    window.location.reload(false);
  }

  const handleEditSong = useCallback(
    async (songId, { songId: _songId, ...updatedSong }) => {
      const { updatedSongInDb } = await http.put(
        `/songs/${songId}`,
        { ...updatedSong },
        {
          headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
          },
        }
      );
      dispatch(editSong(songId, updatedSongInDb));
      refreshPage();
    },
    [http, jwt]
  );

  const handleDeleteSongStart = (songId) => {
    dispatch(deleteSongStart(songId));
  };

  const handleHardDelete = async () => {
    await http.delete(`/songs/delete/${songIdToDelete}`, {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    });
    dispatch(deleteSongFinish(songIdToDelete));
  };

  const handleSoftDelete = async () => {
    await http.put(`/songs/remove/${songIdToDelete}`, {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    });
    dispatch(deleteSongFinish());
  };

  const handleCancelDelete = () => {
    dispatch(deleteSongCancel());
  };

  return (
    <SongContext.Provider
      value={{
        fetchSongs,
        fetchSongById,
        handleAddSong,
        handleEditSong,
        handleDeleteSongStart,
        showDeleteConfirmationModal,
        handleHardDelete,
        handleSoftDelete,
        handleCancelDelete,
        songIdToDelete,
        songs,
        songById,
        song,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
