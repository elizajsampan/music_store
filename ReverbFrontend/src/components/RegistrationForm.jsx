import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as idGenerator } from "uuid";
import { AuthContext } from "../context/auth/AuthContext";
import logo from "../images/page-logo-glow.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ThemeContext } from "../context/theme/ThemeContext";

const RegistrationForm = ({ initialFormValue }) => {
  const navigate = useNavigate();

  const defaultFormValue = {
    userId: idGenerator(),
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
  };

  const schema = Joi.object({
    username: Joi.string().min(7).required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password"
      )
      .required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "biz", "org", "info", "ca", "me"] },
      })
      .required(),
    phone: Joi.string()
      .max(11)
      .pattern(/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/)
      .required(),
    address: Joi.string().required(),

  });

  const [form, setForm] = useState(initialFormValue ?? defaultFormValue);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useContext(AuthContext);
  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);

  const field = [
    {label: 'First name', name: 'firstName', error: errors.firstName, value: form.firstName},
    {label: 'Last name', name: 'lastName', error: errors.lastName, value: form.lastName},
    {label: 'Email (Ex. juandelacruz@reverb.com)', name: 'email',  error: errors.email, errormsg: "Enter valid email. (Ex. user@reverb.com)", value: form.email},
    {label: 'Phone number (Ex. 09xxxxxxxxx)', name: 'phone', error: errors.phone, errormsg: "Enter valid phone number. (Ex. 09171112233)", value: form.phone},
    {label: 'Address', name: 'address', error: errors.address, errormsg: errors.address, value: form.address},
    {label: 'Username', name: 'username',  error: errors.password, errormsg: "Username must have at least 7 characters.", value: form.username},
  ];

  const isFormInvalid = () => {
    const { id, userId, confirmPassword, role, ...otherFields } = form;
    const { error } = schema.validate(otherFields);

    return !!error;
  };

  const handleChange = ({ target: input }) => {
    try {
      setForm({
        ...form,
        [input.name]: input.value,
      });
    } catch (err) {
      console.log(err);
    }

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
      await signUp(form);
      onShowToastNotification({
        message: "Account created!",
        severity: "success",
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      onShowToastNotification({
        message: "Registration failed",
        severity: "error",
      });
      setTimeout(() => {
        onHideToastNotification();
      }, 6000);
  
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
    <div>
      <Grid
        container
        item
        xs={12}
        md={12}
        alignItems="center"
        direction="column"
        style={{ padding: 10 }}
      >
        <div />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1000",
          }}
        >
          <Grid container xs={12} alignItems="center" sx={{my: 1}}>
            <Grid xs={4}>
              <img src={logo} alt="Logo" height={40} />
            </Grid>
            <Grid textAlign="end" item xs={8} sx={{ my: 1 }}>
                <Typography
                    variant="h7"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                  Create an account.
                </Typography>
            </Grid>
          </Grid>
          
          <Grid
            container
            component="form"
            alignItems="center"
            direction="column"
            onSubmit={handleSubmit}
          >
          {field.map((f) => (
              <>
                <TextField
                    size="small"
                    margin="dense"
                    value={f.value}
                    onChange={handleChange}
                    name={f.name}
                    type="text"
                    error={!!f.error}
                    placeholder={f.label}
                    // helperText={f.errormsg}
                    fullWidth
                    />
                  {/* <FormHelperText>{f.errormsg}</FormHelperText>   */}
              </>
                    ))}
            <TextField
                    size="small"
                    margin="dense"
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                    type={values.showPassword ? "text" : "password"}
                    error={errors.password}
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
              <Typography variant="caption" display="block" gutterBottom>
                Password must be alphanumeric with at least one uppercase letter and one special character.
              </Typography>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isFormInvalid()}
              sx={{ my: 1 }}
            >
              Sign Up
            </Button>
          </Grid>
          <Link
            align="center"
            href="/login"
            color="primary.main"
            sx={{ fontSize: 14 }}
          >
            Already have an account? Sign in.
          </Link>
        </div>
        <div />
      </Grid>
    </div>
  );
};

export default RegistrationForm;
