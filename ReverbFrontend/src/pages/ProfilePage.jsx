import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  Icon,
  Button,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FaceIcon from "@mui/icons-material/Face";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import gradient from "../images/purple-gradient.jpg";
import { alpha } from "@mui/material";
import { AuthContext } from "../context/auth/AuthContext";
import { UserContext } from "../context/user/UserContext";

const ProfilePage = () => {

  const { fetchUser, user: currentUser, loading } = useContext(UserContext);

  const navigate = useNavigate();

  console.log(currentUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleEditProfile = () => {
    navigate("/user/editprofile");
  };

  const handleEditPassword = () => {
    navigate("/user/editpassword");
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

  const info = [
    { label: "First name", icon: <FaceIcon />, value: currentUser.firstName },
    { label: "Last name", icon: <FaceIcon />, value: currentUser.lastName },
    {
      label: "Username",
      icon: <AccountCircleIcon />,
      value: currentUser.username,
    },
    { label: "Email", icon: <EmailIcon />, value: currentUser.email },
    {
      label: "Phone Number",
      icon: <PhoneAndroidIcon />,
      value: currentUser.phone,
    },
    { label: "Address", icon: <HomeIcon />, value: currentUser.address },
  ];

  //   if (isLoadingUser === true) {
  //     return <Navbar />;
  //   }

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <Box sx={{ height: 120 }} />
        <Grid container spacing={2}>
          <Grid item xs={2} />
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
                    Profile
                  </Typography>
                </Grid>
                <br />
                <Grid
                  container
                  component="form"
                  sx={{ justifyContent: "right" }}
                >
                  <Tooltip title="Edit">
                    <Button onClick={handleEditProfile}>
                      <EditIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              </Box>

              {info.map((i) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {i.icon}
                    <Typography
                      variant="overline"
                      display="block"
                      color="#ffffff"
                      sx={{ mx: 1 }}
                    >
                      {i.label}
                    </Typography>
                  </div>
                  <hr />
                  <Typography variant="h5">&emsp;&emsp;{i.value}</Typography>
                  <br />
                </>
              ))}
              <Tooltip title="Edit Password" alignItems="right-end">
                <Button
                  onClick={handleEditPassword}
                  color="primary"
                  variant="contained"
                >
                  Change Password
                </Button>
              </Tooltip>
            </Card>
          </Grid>

          <Grid item xs={2} />
        </Grid>
        <Box sx={{ height: 45 }} />
      </div>
    </>
  );
};

export default ProfilePage;
