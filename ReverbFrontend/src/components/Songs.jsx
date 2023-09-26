import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { SearchContext } from "../context/search/SearchContext";
import SongCard from "./SongCard";

const Songs = ({songs}) => {
    
  return (
 
    <Grid container spacing={3} justifyContent="center">
      {songs.map((song) => (
        <Grid key={song.id} item xs={3.5}>
          <SongCard song={song} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Songs;