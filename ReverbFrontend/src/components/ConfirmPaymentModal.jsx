import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography
} from "@mui/material";
import { PurchasesContext } from "../context/purchases/PurchasesContext";
import { useNavigate } from "react-router-dom";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import { UserContext } from "../context/user/UserContext";

const ConfirmPaymentModal = () => {
  
  const navigate = useNavigate();
  const { showConfirmPaymentModal: open,
    handlePaymentConfirmation,
    handlePaymentCancel,
    songsToPurchase} = useContext(PurchasesContext);
  const { cartItems, handleRemoveFromCart } = useContext(CartItemsContext);

  const handlePay = () => {
    try{
         songsToPurchase.map(async (song) => {
          await handlePaymentConfirmation({title: song.title, 
            artist: song.artist,
            mp3Url: song.mp3Url,
            imageUrl: song.imageUrl,
            genre: song.genre,
            price: song.price,
            songId: song.songId,
            purchaseId: song.purchaseId,
            // accNum: song.accNum,
            cardType: song.cardType

          });
          console.log(song.accNum);
          const item = cartItems.find((cartItem) => cartItem.songId === song.songId);  
          handleRemoveFromCart(item.cartId); 
      }) 
    } catch (error){
        console.log(error);
    }
      navigate("/payment/success");
  };

  return (
    <Dialog open={open} onClose={handlePaymentCancel}>
      <DialogTitle>CONFIRM PAYMENT</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>Proceed to payment?</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePaymentCancel}>CANCEL</Button>
        <Button
          onClick={handlePay}
          variant="contained"
          color="primary"
        >
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPaymentModal;
