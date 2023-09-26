import { Box, Grid } from "@mui/material";
import RegistrationForm from "../components/RegistrationForm";
import cover from "../images/cover.png";

const RegistrationPage = () => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={cover}
        style={{
          width: "15%",
          objectFit: "cover",
          position: "absolute",
          top: "60%",
          left: "20%",
          transform: "translateX(-50%)",
        }}
        alt="brand"
      />
      <img
        src={cover}
        style={{
          width: "12%",
          objectFit: "cover",
          position: "absolute",
          top: "50%",
          left: "40%",
          transform: "translateX(-50%)",
        }}
        alt="brand"
      />
      <img
        src={cover}
        style={{
          width: "9%",
          objectFit: "cover",
          position: "absolute",
          top: "40%",
          left: "55%",
          transform: "translateX(-50%)",
        }}
        alt="brand"
      />
      <img
        src={cover}
        style={{
          width: "6%",
          objectFit: "cover",
          position: "absolute",
          top: "35%",
          left: "70%",
          transform: "translateX(-50%)",
        }}
        alt="brand"
      />
      <Grid container style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Grid item xs={12}>
          <Box sx={{ height: 50 }} />
          <RegistrationForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrationPage;
