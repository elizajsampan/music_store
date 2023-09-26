import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { SongContext } from "../context/song/SongContext";

const SongsTable = ({songs}) => {
  const navigate = useNavigate();
  const { handleDeleteSongStart } = useContext(SongContext);

  // useEffect(() => {
  //   fetchSongs();
  // }, [fetchSongs]);

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>mp3</TableCell>
              <TableCell>Song Image</TableCell>
              <TableCell>Settings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((song) => (
                <TableRow key={song.id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <TableCell>P{song.price}</TableCell>
                  <TableCell>{song.mp3Url.length < 50
                              ? `${song.mp3Url}`
                              : `${song.mp3Url.substring(0, 51)}...`}
                  </TableCell>
                  <TableCell><img alt={song.imageUrl} src ={song.imageUrl} height="50"/></TableCell>

                  <TableCell>
                    <Grid container>
                      <Grid item xs={6}>
                        <Tooltip title="Edit song">
                          <IconButton
                            onClick={() => navigate(`/admin/${song.songId}/edit`)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title="Delete Song">
                          <IconButton
                            onClick={() => handleDeleteSongStart(song.songId)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 8, 15]}
        component="div"
        count={songs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SongsTable;
