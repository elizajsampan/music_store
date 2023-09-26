import React from "react";
import SongForm from "../components/SongForm";
import {
  Grid,
  Typography,
  Button,
  Box,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { alpha } from "@mui/material";
import gradient from "../images/purple-gradient.jpg";
import { SongContext } from "../context/song/SongContext";
import Navbar from "../components/Navbar";

const EditSongPage = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin");
  };

  const params = useParams();
  const { songs } = useContext(SongContext);
  const initialFormValue = songs.find((song) => song.songId === params.songId);

  const styles = {
    container: {
      backgroundImage: `url(${gradient})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    },
  };

  return (
    <>
    <Navbar />
    <Box sx={{ height: 20}}/>
      <div style={styles.container}>
        <Box sx={{ height: 100 }} />
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <Card
              sx={{
                bgcolor: alpha("#000000", 0.4),
                color: "#ffffff",
                px: 10,
                py: 5,
              }}
            >
              <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
                <Grid container justifyContent="flex-start">
                  <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    color="#b750d4"
                  >
                    Edit Song
                  </Typography>
                </Grid>
                <br />
                <Grid container justifyContent="flex-end">
                  <Tooltip title="Cancel">
                    <Button onClick={handleCancel}>
                      <CancelIcon />
                    </Button>
                  </Tooltip>
                </Grid>
                <br />
              </Box>
              <CardContent>
                <SongForm initialFormValue={initialFormValue} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ height: 45 }} />
      </div>
    </>
  );
};

export default EditSongPage;
