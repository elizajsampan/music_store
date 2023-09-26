import React, { useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const Player = ({ currentSong, songs, song }) => {
  const [isplaying, setisplaying] = useState(false);

  const audioElem = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  return (
    <div>
      <Box
        m={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        textAlign="left-end"
      >
        <Grid alignContent={"center"}>
          <Box sx={{ display: "flex", flexDirection: "column" }} />
          <Card sx={{ display: "flex", height: 90, minWidth: 600 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <div className="row" style={{ size: "10x", marginBottom: 10 }}>
                  <audio src={currentSong.mp3Url} ref={audioElem} />
                  {isplaying ? (
                    <PauseCircleFilledIcon
                      onClick={PlayPause}
                      style={{ marginTop: 15, fontSize: 30 }}
                    />
                  ) : (
                    <PlayCircleIcon
                      onClick={PlayPause}
                      style={{ marginTop: 15, fontSize: 30 }}
                    />
                  )}
                </div>
              </Box>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 91, height: 90, marginLeft: 1 }}
              alt={song.title}
              src={song.imageUrl}
            ></CardMedia>
            <CardContent sx={{ flex: "1 0 center" }}>
              <Typography component="div" variant="h5" marginBottom={-0.5}>
                {
                  <span style={{ fontWeight: "bold" }}>
                    {currentSong.title}
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
                      fontSize: "15px",
                      color: "primary",
                    }}
                  >
                    {currentSong.artist}
                  </span>
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </div>
  );
};

export default Player;
