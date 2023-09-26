import {
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";
import PaymentForm from "../components/PaymentForm";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@emotion/styled";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const PaymentPage = () => {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const { checkoutItems } = useContext(CartItemsContext);

  const getTotalPriceOfAllCartItems = () => {
    return checkoutItems[0].reduce((accumulator, cartItem) => {
      return accumulator + cartItem.price;
    }, 0);
  };


  return (
    <>
      <Navbar />
      <Box sx={{ height: 120 }} />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={6}>
          <Card
            sx={{
              px: 5,
              py: 5,
            }}
          >
            <ExpandMore expand={expanded} onClick={handleExpandClick}>
              {expanded ? (
                <Grid container>
                  <ShoppingCartIcon />
                  <Typography
                    variant="overline"
                    display="block"
                    color="#b750d4"
                    textAlign="left"
                    sx={{
                      px: 2,
                    }}
                  >
                    Hide Order Summary <KeyboardArrowUpIcon fontSize="small" />
                  </Typography>
                  <Typography
                    variant="overline"
                    display="block"
                    color="#b750d4"
                    textAlign="right"
                    sx={{
                      px: 14,
                    }}
                  >
                    Total: P
                    {parseFloat(getTotalPriceOfAllCartItems()).toFixed(2)}
                  </Typography>
                </Grid>
              ) : (
                <Grid container>
                  <ShoppingCartIcon />
                  <Typography
                    variant="overline"
                    display="block"
                    color="#b750d4"
                    textAlign="left"
                    sx={{
                      px: 2,
                    }}
                  >
                    Show Order Summary{" "}
                    <KeyboardArrowDownIcon fontSize="small" />
                  </Typography>
                  <Typography
                    variant="overline"
                    display="block"
                    color="#b750d4"
                    textAlign="right"
                    sx={{
                      px: 13,
                    }}
                  >
                    Total: P
                    {parseFloat(getTotalPriceOfAllCartItems()).toFixed(2)}
                  </Typography>
                </Grid>
              )}
            </ExpandMore>

            <Collapse in={expanded} unmountOnExit>
              <OrderSummary />
            </Collapse>
          </Card>
          <Card
            sx={{
              px: 5,
              py: 2,
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
                  Your Billing Information
                </Typography>
              </Grid>
              <br />
            </Box>
            <CardContent>
              <PaymentForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentPage;
