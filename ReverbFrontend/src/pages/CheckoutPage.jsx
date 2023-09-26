import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  TablePagination,
  Typography,
  Box,
  Grid,
  Checkbox,
  Button,
  IconButton,
  Tooltip
} from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useNavigate } from "react-router-dom";
import { SongContext } from "../context/song/SongContext";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import NotFoundPage from "./NotFoundPage";



const CheckoutPage = () => {

  const { checkoutItems: cartItems, handleResetCheckout } = useContext(CartItemsContext);
  const navigate = useNavigate();

  // Go back to cart
  function refreshPage() {
    window.location.reload(false);
  }

  const handleGoBack = () => {
    handleResetCheckout();
    navigate('/cart');
    refreshPage();
  }
  
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

  // Total Price
  const getTotalPriceOfAllCartItems = () => {
    return cartItems[0].reduce((accumulator, cartItem) => {
      return (accumulator + cartItem.price);
    }, 0);
  };

  if (cartItems.length === 0){
    return <NotFoundPage/>;
}

  return (
      <>

    <Navbar />  
    <Box sx={{ height: 120 }}/>

        <Grid>
        <Typography
          textAlign="center"
          marginTop={2}
          marginBottom={1.5}
          variant="h5"
        >
          CHECK-OUT SUMMARY
        </Typography>
      </Grid>

    <Grid container spacing={2}>
    <Grid item xs={3}/>
    <Grid item xs={6}>

    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: '#3b174f' }}>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems[0]
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((cartItem) => (
          <TableRow>
            <TableCell>{cartItem.title}</TableCell>
            <TableCell>{cartItem.artist}</TableCell>
            <TableCell align="right">P{cartItem.price}</TableCell>
          </TableRow>
          ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="2" />
              <TableCell align="right">
                <Typography variant="h5" sx={{ my: 1 }}>
                Total:
                  P {parseFloat(getTotalPriceOfAllCartItems()).toFixed(2)}
                </Typography>
                <Button sx={{ my: 1 }} onClick={handleGoBack}>Back to Cart</Button>
                <Button variant="contained" sx={{ my: 1 }} onClick={()=>navigate("/payment")}>Confirm Order</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        
      </Table>
    </TableContainer>

    <TablePagination
      rowsPerPageOptions={[4, 8, 15]}
      component="div"
      count={cartItems[0].length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Grid><br/>
    <Grid item xs={3}/>
    </Grid>
    </>
  );
};

export default CheckoutPage;
