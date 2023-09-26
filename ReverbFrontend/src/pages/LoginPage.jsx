import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import LoginForm from "../components/LoginForm";
import coverPhoto from "../images/cover-photo.jpg";

const LoginPage = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <img src={coverPhoto} height="100%" width="95%" alt="brand" />
        </Grid>
        <Grid item xs={6}>
          <div align="center">
            <Box sx={{ height: 110 }} />
            <LoginForm />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
