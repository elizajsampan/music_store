import React, { useContext, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography
} from "@mui/material";
import { SongContext } from "../context/song/SongContext";

const ConfirmDeleteModal = () => {
  const { showDeleteConfirmationModal: open,
    handleHardDelete,
    handleSoftDelete,
    handleCancelDelete,
    songIdToDelete,
    songs,
    fetchSongs } =
    useContext(SongContext);
  
    useEffect(() => {
      fetchSongs();
    }, [fetchSongs]);
   

  let songTitle = songs.map((s) =>
          s.songId === songIdToDelete ? 
          s.title : null);
  
  let songArtist = songs.map((s) =>
          s.songId === songIdToDelete ? 
          s.artist : null);

  return (
    <Dialog open={open} onClose={handleCancelDelete}>
      <DialogTitle>Confirm Song Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>Are you sure you want to delete this song?</p>
          <Typography variant="overline">Title: {songTitle}</Typography><br/>
          <Typography variant="overline">Artist: {songArtist}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>Cancel</Button>
        <Button
          onClick={handleHardDelete}
          variant="contained"
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
