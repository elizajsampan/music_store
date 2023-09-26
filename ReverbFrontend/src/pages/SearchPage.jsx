import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button, Card, CardActions, CardContent, Chip, Divider, Grid, IconButton, InputBase, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import gradient from "../images/purple-gradient.jpg";
import light from "../images/light-bg.jpg";
import Songs from '../components/Songs';
import { SearchContext } from '../context/search/SearchContext';
import { SongContext } from '../context/song/SongContext';



const SearchPage = ( { initialFormValue }) => {

    const genres = [
        {type: 'Pop', bgcolor: '#e6dd43'},
        {type: 'Rock', bgcolor: '#c97180'},
        {type: 'Hip-hop', bgcolor: '#59a8a0'},
        {type: 'Country', bgcolor: '#6fd166'},
        {type: 'K-Pop', bgcolor: '#c97180'},
        {type: 'J-Pop', bgcolor: '#59a8a0'},
        {type: 'Alternative', bgcolor: '#e6dd43'},
    ];

    const styles = {
        paperContainer: {
            backgroundImage: `url(${gradient})`
        }
    };

    function refreshPage() {
        window.location.reload(false);
      }

    const { searchedSongs, fetchSongsByTitleArtist, fetchSongsByGenre} = useContext(SearchContext);
    const { songs, fetchSongs } = useContext(SongContext);
    const [form, setForm] = useState("");

    useEffect(() => {
        fetchSongs();
        fetchSongsByTitleArtist();
      }, [fetchSongs, fetchSongsByTitleArtist]);

    // Search songs by title or artist
    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchSongsByTitleArtist(form);
        setForm("");
    }

    // Get songs by genre
    const handleGenre = async (value) => {
        await fetchSongsByGenre(value);
    }


    return (
        <>
        <Navbar />

        <Box style={styles.paperContainer}>
            <Box
            sx={{
                height: 350,
                backgroundImage: {gradient},
                opacity: 0.9,
            }}
            >
                <Box sx={{ height: 150}}/>
                <div align="center">
                <Paper
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center', width: 600, backgroundColor: "#ffffff" }}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1, color: '#000000' }}
                        placeholder="Song title or artist"
                        inputProps={{ 'aria-label': 'search songs' }}
                        onChange={(event) => setForm(event.target.value)}
                    />
                    <IconButton type="submit" sx={{ p: '8px' }} aria-label="search" onClick={handleSubmit}>
                        <SearchIcon sx={{ color: '#000000' }} />
                    </IconButton> 
                    <Button variant='contained' onClick={() => {refreshPage()}}>
                        <Typography variant="overline" display="block">
                            ALL SONGS
                        </Typography>
                    </Button>
                </Paper>
                <Box sx={{ height: 25}}/>
                <Typography variant="overline" display="block" gutterBottom sx={{ color: '#ffffff' }}>Genres</Typography>
                <Box sx={{ height: 10}}/>

                {genres.map((genre) => (
                <Chip label={genre.type} value={genre.type} onClick={event => handleGenre(genre.type)} sx={{ color: '#000000', backgroundColor: genre.bgcolor, mx: 0.3}}/>
                ))} 

            </div>   
            </Box>
        </Box>

        <Box sx={{ height: 20}}/>

        <Songs songs={searchedSongs.length === 0 ? songs : searchedSongs} />
        <Box sx={{ height: 45 }} />
        </>
        
    );
};
export default SearchPage;
