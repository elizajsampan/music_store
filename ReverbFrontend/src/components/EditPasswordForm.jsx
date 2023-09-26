import {
  Box,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  Tooltip,
  alpha,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import gradient from "../images/purple-gradient.jpg";
import Joi from "joi";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../context/user/UserContext";

const EditPasswordForm = ({ initialFormValue }) => {
  // const { currentUser, fetchCurrentUser, updatedUser, handleEditUser } = useContext(ProfileContext);

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, [fetchCurrentUser]);

  const { user: currentUser, handleEditPassword } = useContext(UserContext);

  console.log(currentUser);

  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("currentUser", currentUser);
  }, [currentUser]);

  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  const defaultFormValue = {
    password: "",
  };

  const schema = Joi.object({
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password"
      )
      .required(),
  });

  const [form, setForm] = useState(defaultFormValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const field = [
    {
      label: "Password",
      name: "password",
      icon: <KeyRoundedIcon />,
      error: errors.password,
      value: form.password,
    },
  ];

  const isFormInvalid = () => {
    const { id, ...otherFields } = form;
    const { error } = schema.validate(otherFields);

    return !!error;
  };

  const handleChange = ({ target: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      const { details } = error;
      const [firstError] = details;

      setErrors({
        ...errors,
        [input.name]: firstError.message,
      });
    } else {
      const errorsInState = { ...errors };
      delete errorsInState[input.name];

      setErrors(errorsInState);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleEditPassword(form);
    setTimeout(() => {
      navigate("/user");
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/user");
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

      // Password visibility
      const [values, setValues] = useState({
        password: "",
        showPassword: false,
      });
  
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
  
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
  

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
                    Change Password
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
              <br />

              {field.map((f) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {f.icon}
                    <Typography
                      variant="overline"
                      display="block"
                      color="#ffffff"
                      sx={{ mx: 1 }}
                    >
                      {f.label}
                    </Typography>
                  </div>
                  <hr />
                  <TextField
                    size="small"
                    margin="dense"
                    value={f.value}
                    onChange={handleChange}
                    name={f.name}
                    type={values.showPassword ? "text" : "password"}
                    error={!!f.error}
                    placeholder="Enter new password."
                    sx={{ my: 2 }}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ m: 1 }}>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                  Password must be alphanumeric with at least one uppercase letter and one special character.
                  </Typography>
                </>
              ))}

              <div align="center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  disabled={isFormInvalid()}
                  sx={{ m: 1 }}
                >
                  Save
                </Button>
                <Button
                  onClick={() => navigate("/user")}
                  color="secondary"
                  variant="contained"
                  // disabled={isFormInvalid()}
                  sx={{ m: 1 }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
            <Box sx={{ height: 500 }} />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    </>
  );
};

export default EditPasswordForm;
