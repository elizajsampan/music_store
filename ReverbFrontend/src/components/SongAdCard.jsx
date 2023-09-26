import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import { Button, CardActions, Grid, Tooltip } from "@mui/material";
import { useContext } from "react";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../context/song/SongContext";

export default function SongAdCard({ song }) {
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSongDetails = async () => {
    await navigate(`/songs/${song.songId}`);
    // refreshPage();
  };

  return (
    <div>
      <Box m={1} display="flex" alignItems="center" flexDirection="column">
        <Card
          sx={{
            maxWidth: 180,
            height: 350,
            background: "#212121",
            marginLeft: -0.75,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 180, height: 190 }}
            alt={song.title}
            src={song.imageUrl}
            onClick={handleSongDetails}
          ></CardMedia>
          <CardContent>
            <Typography component="div" variant="h5" marginBottom={-1}>
              {
                <span style={{ fontWeight: "bold", fontSize: 22 }}>
                  {song.title.length < 10
                    ? `${song.title}`
                    : `${song.title.substring(0, 10)}...`}
                </span>
              }
            </Typography>
            <Typography
              variant="h7"
              color="text.secondary"
              component="div"
              marginBottom={-0.05}
            >
              {
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    color: "primary",
                  }}
                >
                  {song.artist.length < 15
                    ? `${song.artist}`
                    : `${song.artist.substring(0, 15)}...`}
                </span>
              }
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
