import { Box, Card, Grid, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import gradient from "../images/purple-gradient.jpg";
import searchbanner from "../images/search-songs-banner.png";
import billiebanner from "../images/billie-banner.png";
import LastHopeSongAd from "../images/LastHopeSongAd.png";
import MirrorBallSongAd from "../images/MirrorBallSongAd.png";
import MarigoldSongAd from "../images/MarigoldSongAd.png";
import ReverbBanner from "../images/ReverbBanner.png";
import SongAdCard from "../components/SongAdCard";

import { SongContext } from "../context/song/SongContext";

const HomePage = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  const navigate = useNavigate();
  const { songs, fetchSongs } = useContext(SongContext);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <>
      <Navbar />

      <Box sx={{ height: 110 }} />

      <Card
        sx={{
          maxWidth: 1495,
          maxHeight: 190,
          marginLeft: 2,
          marginRight: 2,
          marginBottom: 2,
        }}
      >
        <img src={ReverbBanner} width="100%" alt="ReverbBanner" />
      </Card>
      <Grid>
        <Typography
          marginLeft={2.5}
          textAlign="left-end"
          marginBottom={-1.5}
          variant="h5"
        >
          {
            <span style={{ fontWeight: "bold", fontSize: 25 }}>
              New Releases
            </span>
          }
        </Typography>
      </Grid>
      <Card
        sx={{
          maxWidth: 1495,
          minHeight: 320,
          marginLeft: 0.5,
          marginRight: 2,
          marginBottom: 2,
          background: "#141414",
        }}
      >
        <Box
          m={1}
          display="flex"
          alignItems="center"
          flexDirection="row"
          width={1000}
        >
          &nbsp;
          {songs.slice(0, 7).map((song) => (
            <Grid key={song.id} sx={{ height: 100, width: 375 }}>
              <SongAdCard song={song} />
            </Grid>
          ))}
        </Box>
      </Card>

      {/* <Box
        sx={{
          height: 210,
        }}
      /> */}
      <Grid>
        <Typography
          marginLeft={2.5}
          textAlign="left-end"
          marginTop={1.0}
          marginBottom={1.0}
        >
          {
            <span style={{ fontWeight: "bold", fontSize: 25 }}>
              Upcoming Releases
            </span>
          }
        </Typography>
      </Grid>
      <Box>
        <Card
          sx={{
            maxWidth: 1495,
            maxHeight: 190,
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 2,
          }}
        >
          <img
            src={LastHopeSongAd}
            width="100%"
            onClick={() => navigate("/search")}
            alt="LastHopeSongAd"
          />
        </Card>
        <Card
          sx={{
            maxWidth: 1495,
            maxHeight: 190,
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 2,
          }}
        >
          <img
            src={MirrorBallSongAd}
            width="100%"
            onClick={() => navigate("/search")}
            alt="MirrorBallSongAd"
          />
        </Card>
        <Card
          sx={{
            maxWidth: 1495,
            maxHeight: 190,
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 2,
          }}
        >
          <img
            src={MarigoldSongAd}
            width="100%"
            onClick={() => navigate("/search")}
            alt="MarigoldSongAd"
          />
        </Card>
        {/* <img
          src={MirrorBallSongAd}
          width="100%"
          alt="MirrorBallSongAd"
          onClick={() => navigate("/search")}
        />
        <img
          src={MarigoldSongAd}
          width="100%"
          alt="MarigoldSongAd"
          onClick={() => navigate("/search")}
        /> */}
        <Card
          sx={{
            maxWidth: 1495,
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 2,
          }}
        >
          <img
            alt="check out songs"
            src={searchbanner}
            width="100%"
            onClick={() => navigate("/search")}
          />
        </Card>
      </Box>
    </>
  );
};

export default HomePage;
