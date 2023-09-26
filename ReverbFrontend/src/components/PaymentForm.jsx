import {
  Grid,
  TextField,
  InputLabel,
  Button,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import { PurchasesContext } from "../context/purchases/PurchasesContext";
import { UserContext } from "../context/user/UserContext";
import { v4 as idGenerator, v4 } from "uuid";
import Joi from "joi";

const PaymentForm = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    checkoutItems,
    handleResetCheckout,
    fetchCart,
    handleRemoveFromCart,
  } = useContext(CartItemsContext);
  const { purchases, handleAddPurchasesStart, fetchPurchases } =
    useContext(PurchasesContext);
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const initialFormValue = {
    cardType: "",
    accNum: "",
    accName: "",
  };

  const schema = Joi.object({
    cardType: Joi.required(),
    accNum: Joi.number().required(),
    accName: Joi.string().min(1).required(),
  });

  const [form, setForm] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);

  const isFormInvalid = () => {
    const { cardType, ...otherFields } = form;
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

  // Go back to cart

  function refreshPage() {
    window.location.reload(false);
  }

  const handleGoBack = () => {
    handleResetCheckout();
    navigate("/cart");
    refreshPage();
  };

  // Pay
  const handleSubmit = async () => {
    await checkoutItems[0].map(
      async (checkoutItem) =>
        await setItems((items) => [
          ...items,
          {
            purchaseId: idGenerator(),
            songId: checkoutItem.songId,
            title: checkoutItem.title,
            artist: checkoutItem.artist,
            genre: checkoutItem.genre,
            price: checkoutItem.price,
            imageUrl: checkoutItem.imageUrl,
            mp3Url: checkoutItem.mp3Url,
            cardType: form.cardType,
            accNum: form.accNum,
            // accName: form.accName,
            // datePurchased: Date.now(),
            // userId: user.userId
          },
        ])
    );
    await handleAddPurchasesStart(items);
  };

  // Do not relocate!
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <Grid>
      <Grid container spacing={1}>
        {/* component ="form" onSubmit={handleSubmit} */}
        <Grid xs={12}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="cardType">Payment method</InputLabel>
            <Select
              labelId="label-payment"
              id="select-payment"
              value={form.cardType}
              onChange={handleChange}
              label="Payment method"
              inputProps={{
                name: "cardType",
              }}
            >
              <MenuItem value="">
                <em>Select payment method</em>
              </MenuItem>
              <MenuItem value="visa">Visa</MenuItem>
              <MenuItem value="debit card">Debit Card</MenuItem>
              <MenuItem value="credit card">Credit Card</MenuItem>
              <MenuItem value="g-cash">G-Cash</MenuItem>
              <MenuItem value="paymaya">Paymaya</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="standard"
            fullWidth
            type="text"
            name="accNum"
            label="Account number"
            onChange={handleChange}
            error={!!errors.accNum}
          />
        </Grid>
        <Grid Grid xs={12}>
          <TextField
            variant="standard"
            fullWidth
            type="text"
            name="accName"
            label="Account name"
            onChange={handleChange}
            error={!!errors.accName}
          />
        </Grid>

        <Grid xs={8} />
        <Grid xs={4} sx={{ py: 2 }} textAlign="end">
          <Button sx={{ my: 1 }} onClick={handleGoBack}>
            Back to Cart
          </Button>

          <Button
            variant="contained"
            sx={{ my: 1 }}
            onClick={handleSubmit}
            type="submit"
            // disabled={isFormInvalid()}
          >
            Pay
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
