import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";

const OrderSummary = () => {
  const { checkoutItems } = useContext(CartItemsContext);

  // Total Price
  const getTotalPriceOfAllCartItems = () => {
    return checkoutItems[0].reduce((accumulator, cartItem) => {
      return accumulator + cartItem.price;
    }, 0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#3b174f" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkoutItems[0].map((cartItem) => (
              <TableRow key={cartItem.songId}>
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
                  Total: P{" "}
                  {parseFloat(getTotalPriceOfAllCartItems()).toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderSummary;
