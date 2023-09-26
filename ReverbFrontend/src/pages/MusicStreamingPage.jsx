import Player from "../components/Player";
import { useEffect } from "react";
import { useContext } from "react";
import { SongContext } from "../context/song/SongContext";
import { Box, Card, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import StreamPageBanner from "../images/StreamPageBanner.png";
import { PurchasesContext } from "../context/purchases/PurchasesContext";

const MusicStreamingPage = () => {
  const { purchases , fetchPurchases } = useContext(PurchasesContext);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  if ( purchases.length === 0){
    return(
      <div>
        <Navbar />
        <Box
        sx={{
          height: 100,
        }}
      />
      <Box
        m={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        textAlign="left-end"
      >
        <Card
          sx={{
            maxWidth: 600,
            maxHeight: 120,
            alignContent: "center",
          }}
        >
          <img src={StreamPageBanner} width="100%" alt="StreamPageBanner" />
        </Card>
      <Typography sx={{ my: 3}}>You haven't purchased any song yet.</Typography>
      </Box>
      </div>
    )

  }

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          height: 100,
        }}
      />
      <Box
        m={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        textAlign="left-end"
      >
        <Card
          sx={{
            maxWidth: 600,
            maxHeight: 120,
            alignContent: "center",
          }}
        >
          <img src={StreamPageBanner} width="100%" alt="StreamPageBanner" />
        </Card>
      </Box>

      {purchases.map((song) => (
        <Grid item xs={3.5} key={song.id} alignItems={"center"}>
          <Player song={song} currentSong={song} />
        </Grid>
      ))}
      <Box
        sx={{
          height: 10,
        }}
      />
    </div>
  );
};

export default MusicStreamingPage;
