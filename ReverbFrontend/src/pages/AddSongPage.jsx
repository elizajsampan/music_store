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
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material";
import gradient from "../images/purple-gradient.jpg";
import Navbar from "../components/Navbar";

const AddSongPage = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin");
  };

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
                    Add Song
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
                <SongForm />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ height: 45 }} />
      </div>
    </>
  );
};

export default AddSongPage;
