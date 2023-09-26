import React from "react";
import {
  Grid,
  TextField,
  Button,
  Input,
  NativeSelect,
  InputLabel,
  alpha,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Joi from "joi";
import { SongContext } from "../context/song/SongContext";
import { v4 as idGenerator, v4 } from "uuid";
import { ThemeContext } from "../context/theme/ThemeContext";

const defaultFormValue = {
  songId: idGenerator(),
  id: "",
  title: "",
  artist: "",
  genre: "",
  price: "",
  mp3Url: "",
  imageUrl: "",
};

const schema = Joi.object({
  // songId: Joi.number().min(1).required(),
  title: Joi.string().min(1).required(),
  artist: Joi.string().min(1).required(),
  genre: Joi.string().min(1).required(),
  price: Joi.number().min(1).required(),
  mp3: Joi.string().uri().allow(""),
  songImage: Joi.string().allow(""),
});

const SongForm = ({ initialFormValue }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialFormValue ?? defaultFormValue);
  const [errors, setErrors] = useState({});

  const { handleAddSong, handleEditSong } = useContext(SongContext);
  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);

  function refreshPage() {
    window.location.reload(false);
  }

  const isFormInvalid = () => {
    const { songId, ...otherFields } = form;
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
      setErrors({ ...errors, [input.name]: error.details[0].message });
      console.log(error);
    } else {
      const errorsInState = { ...errors };
      delete errorsInState[input.name];
      setErrors(errorsInState);
    }
  };

  // Pre-load all songs before returning to admin page. No need to force refresh.
  const { fetchSongs } = useContext(SongContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (initialFormValue) {
      //edit song
      try {
        handleEditSong(form.songId, form);
        fetchSongs();
        onShowToastNotification({
          message: "Song has been Successfully Edited",
          severity: "success",
        });
        setTimeout(() => {
          onHideToastNotification();
        }, 3000);
        navigate("/admin");
      } catch (error) {
        const expectedError =
          error.response &&
          error.response.data &&
          (error.response.status === 400 || error.response.status === 404);

        if (expectedError && error.response.status === 404) {
          onShowToastNotification({
            message: "Song not found. Song may have already been deleted.",
            severity: "error",
          });
          setTimeout(() => {
            onHideToastNotification();
          }, 6000);
        } else if (expectedError && error.response.status === 400) {
          onShowToastNotification({
            message: error.response.data.message[0],
            severity: "error",
          });
          setTimeout(() => {
            onHideToastNotification();
          }, 6000);
        } else {
          onShowToastNotification({
            message: "An unexpected error occurred",
            severity: "error",
          });
          setTimeout(() => {
            onHideToastNotification();
          }, 6000);
        }
      }
    } else {
      //Add song
      try {
        handleAddSong(form);
        fetchSongs();
        onShowToastNotification({
          message: "Successfully added song",
          severity: "success",
        });
        setTimeout(() => {
          onHideToastNotification();
        }, 3000);
        navigate("/admin");
      } catch (error) {
        const expectedError =
          error.response &&
          error.response.data &&
          (error.response.status === 400 || error.response.status === 404);

        if (expectedError && error.response.status === 400) {
          onShowToastNotification({
            message: error.response.data.message[0],
            severity: "error",
          });
          setTimeout(() => {
            onHideToastNotification();
          }, 3000);
        } else {
          onShowToastNotification({
            message: "An unexpected error occurred",
            severity: "error",
          });
          setTimeout(() => {
            onHideToastNotification();
          }, 6000);
        }
      }
    }
  };

  return (
    <Grid container component="form" spacing={2} onSubmit={handleSubmit}>
      {!initialFormValue ? (
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            variant="standard"
            id="outlined-disabled"
            label="Song ID"
            name="songId"
            onChange={handleChange}
            defaultValue={form.songId}
          />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            variant="standard"
            id="outlined-disabled"
            label="Song ID"
            name="songId"
            onChange={handleChange}
            defaultValue={form.songId}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <TextField
          variant="standard"
          fullWidth
          type="text"
          name="title"
          label="Title"
          onChange={handleChange}
          value={form.title}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant="standard"
          fullWidth
          type="text"
          name="artist"
          label="Artist"
          onChange={handleChange}
          value={form.artist}
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="genre">Genre</InputLabel>
          <Select
            labelId="label-genre"
            id="select-genre"
            value={form.genre}
            onChange={handleChange}
            label="Genre"
            inputProps={{
              name: "genre",
            }}
          >
            <MenuItem value="">
              <em>Select genre</em>
            </MenuItem>
            <MenuItem value="Pop">Pop</MenuItem>
            <MenuItem value="Rock">Rock</MenuItem>
            <MenuItem value="Hip-hop">Hip-hop</MenuItem>
            <MenuItem value="Country">Country</MenuItem>
            <MenuItem value="K-Pop">K-Pop</MenuItem>
            <MenuItem value="J-Pop">J-Pop</MenuItem>
            <MenuItem value="Alternative">Alternative</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          variant="standard"
          fullWidth
          type="text"
          name="price"
          label="Price"
          onChange={handleChange}
          value={form.price}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant="standard"
          fullWidth
          type="text"
          name="mp3Url"
          label="MP3 File"
          onChange={handleChange}
          value={form.mp3Url}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant="standard"
          fullWidth
          type="text"
          name="imageUrl"
          label="Image URL"
          onChange={handleChange}
          value={form.imageUrl}
        />
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default SongForm;
