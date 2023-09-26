import {
    Box,
    Typography,
    Grid,
    Card,
    TextField,
    Button,
    Tooltip,
    alpha,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import Navbar from "../components/Navbar";
  import CancelIcon from "@mui/icons-material/Cancel";
  import FaceIcon from "@mui/icons-material/Face";
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import EmailIcon from "@mui/icons-material/Email";
  import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
  import HomeIcon from "@mui/icons-material/Home";
  import CreditCardIcon from "@mui/icons-material/CreditCard";
  import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
  import gradient from "../images/purple-gradient.jpg";
  import Joi from "joi";
  import { useContext } from "react";
  import { useEffect } from "react";
  import { UserContext } from "../context/user/UserContext";
import { FourMp } from "@mui/icons-material";
  
  const EditProfileForm = () => {
  
    const { user: currentUser, handleEditUser, fetchUser } = useContext(UserContext);
  
    const defaultFormValue = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    };
  
    const schema = Joi.object({
      firstName: Joi.string().max(50).required(),
      lastName: Joi.string().max(50).required(),
      username: Joi.string().min(7).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "biz", "org", "info", "ca", "me"] },
        })
        .required(),
      phone: Joi.string().max(11).required(),
      address: Joi.string().required(),
      password: Joi.string()
        .min(7)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "password"
        )
        .required()
    });
  
    const [form, setForm] = useState(currentUser);
  
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    const field = [
      {
        id: 1,
        label: "First name",
        name: "firstName",
        icon: <FaceIcon />,
        error: errors.firstName,
        value: form.firstName,
      },
      {
        id: 2,
        label: "Last name",
        name: "lastName",
        icon: <FaceIcon />,
        error: errors.lastName,
        value: form.lastName,
      },
      {
        id: 3,
        label: "Username",
        name: "username",
        icon: <AccountCircleIcon />,
        error: errors.username,
        value: form.username,
        disabled: true
      },
      {
        id: 4,
        label: "Email",
        name: "email",
        icon: <EmailIcon />,
        error: errors.email,
        value: form.email,
      },
      {
        id: 5,
        label: "Phone Number",
        name: "phone",
        icon: <PhoneAndroidIcon />,
        error: errors.phone,
        value: form.phone,
      },
      {
        id: 6,
        label: "Address",
        name: "address",
        icon: <HomeIcon />,
        error: errors.address,
        value: form.address,
      }
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

    const handleSubmit = (event) => {
      event.preventDefault();
      handleEditUser(form);
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

    useEffect(() => {
      fetchUser();
    }, [fetchUser]);
  
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
                      Edit Profile
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
  
                <Grid key={field.id}>
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

                      {f.disabled ? (
                      <TextField
                        size="small"
                        margin="dense"
                        value={f.value}
                        onChange={handleChange}
                        name={f.name}
                        type="text"
                        error={!!f.error}
                        placeholder={f.value}
                        sx={{ my: 2 }}
                        fullWidth
                        disabled
                      />
                      ) : (
                        <TextField
                        size="small"
                        margin="dense"
                        value={f.value}
                        onChange={handleChange}
                        name={f.name}
                        type="text"
                        error={!!f.error}
                        placeholder={f.value}
                        sx={{ my: 2 }}
                        fullWidth
                      />
                      )}
                    </>
                  ))}
                </Grid>
  
                <div align="center">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    // disabled={isFormInvalid()}
                    sx={{ mx: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => navigate("/user")}
                    color="secondary"
                    variant="contained"
                    // disabled={isFormInvalid()}
                    sx={{ mx: 1 }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Box sx={{ height: 45 }} />
        </div>
      </>
    );
  };
  
  export default EditProfileForm;
  