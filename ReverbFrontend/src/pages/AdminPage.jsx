import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Grid, Button, Box, Paper, InputBase, IconButton } from "@mui/material";
import SongsTable from "../components/SongsTable";
import { SongContext } from "../context/song/SongContext";
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "../components/Navbar";
import { useState } from "react";
import { SearchContext } from "../context/search/SearchContext";
import { UserContext } from "../context/user/UserContext";
import NotFoundPage from "./NotFoundPage";


const AdminPage = () => {
      const navigate = useNavigate();

      // Search songs by title or artist
      const { searchedSongs, fetchSongsByTitleArtist} = useContext(SearchContext);
      const { songs, fetchSongs } = useContext(SongContext);
      const [ form, setForm ] = useState("");

      function refreshPage() {
        window.location.reload(false);
      }

      useEffect(() => {
        fetchSongs();
        fetchSongsByTitleArtist();
      }, [fetchSongs, fetchSongsByTitleArtist]);

      const handleSubmit = async (event) => {
          event.preventDefault();
          await fetchSongsByTitleArtist(form);
          setForm("");  
      }

      // Authorization
      const { user, fetchUser } = useContext(UserContext);

      useEffect(() => {
        fetchUser();
      }, [fetchUser]);

      if (user.role === "user"){
        return (<NotFoundPage />)
      };

  return (

    <Grid>
      <Navbar />  
      <Box sx={{ height: 90 }}/>
      <Grid container sx={{ maxWidth: 1495 }}>
        <Grid textAlign="end" item xs={8} sx={{ my: 3 }}>
          <Paper
              component="form"
              sx={{ p: '2px 4px', mx: 1, display: 'flex', alignItems: 'center', width: 600, backgroundColor: "#ffffff" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: '#000000' }}
              placeholder="Song title or artist"
              inputProps={{ 'aria-label': 'search songs' }}
              onChange={(event) => setForm(event.target.value)}
              />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
                    <SearchIcon sx={{ color: '#000000' }} />
                </IconButton>
          </Paper>
        </Grid>
        <Grid textAlign="end" item xs={4} sx={{ my: 3 }}>
        <Button variant="outlined" onClick={() => {refreshPage()}}> All songs </Button>
        <Button variant="contained" onClick={() => {navigate("/admin/add")}} sx={{ mx: 2 }}>Add Song</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <SongsTable songs={searchedSongs.length === 0 ? songs : searchedSongs}/>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
