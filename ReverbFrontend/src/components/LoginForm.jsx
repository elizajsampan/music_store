import {
    Button,
    FormHelperText,
    Grid,
    TextField,
    Typography,
    Link,
    InputAdornment,
    IconButton,
  } from "@mui/material";
import Joi from "joi";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { ThemeContext } from "../context/theme/ThemeContext";
import logo from "../images/page-logo-glow.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
  
  const LoginForm = () => {
    const navigate = useNavigate();
  
    const defaultFormValue = {
      username: "",
      password: "",
    };
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string()
        .required(),
    });
  
    const [form, setForm] = useState(defaultFormValue);
    const [errors, setErrors] = useState({});
    const { signIn } = useContext(AuthContext);
    const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);

  
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
      try {
        await signIn(form);
        onShowToastNotification({
          message: "Logged in successfully",
          severity: "success",
        });  
        navigate("/home");
      } catch (err) {
        console.log(err);
      onShowToastNotification({
        message: "Invalid Username or Password",
        severity: "error",
      });
    }
      setTimeout(() => {
        onHideToastNotification();
      }, 6000);
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
      <Grid
        container
        xs={12}
        sm={6}
        alignItems="center"
        direction="column"
        style={{ padding: 10 }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: "400" }}
        >
          <Grid item justify="center" xs={12}>
            <img src={logo} alt="Logo" width={200}/>
          </Grid>
          <Typography
            align="center"
            variant="h7"
            sx={{ fontWeight: 700,  mb: 1 }}>
              Log in
          </Typography>
          <Grid
            container
            component="form"
            alignItems="center"
            direction="column"
            onSubmit={handleSubmit}
          >
            <TextField
              size="small"
              margin="dense"
              value={form.username}
              onChange={handleChange}
              name="username"
              type="text"
              error={!!errors.username}
              placeholder="Username"
              fullWidth
            />
            <FormHelperText>{errors.username}</FormHelperText>
            <TextField
              size="small"
              margin="dense"
              value={form.password}
              onChange={handleChange}
              name="password"
              type={values.showPassword ? "text" : "password"}
              error={!!errors.password}
              placeholder="Password"
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
            <FormHelperText>{errors.password}</FormHelperText>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isFormInvalid()}
              sx={{ my: 2 }}
            >
              Sign in
            </Button>
          </Grid>
          <Typography align="center" sx={{ fontSize: 12, mt: 5 }}>
            New to Reverb?
          </Typography>
          <Link
            align="center"
            href="/register"
            color="primary"
            sx={{ fontSize: 14 }}
          >
            Create an account.
          </Link>
        </div>
        <div />
      </Grid>
    );
  };
  
  export default LoginForm;
  