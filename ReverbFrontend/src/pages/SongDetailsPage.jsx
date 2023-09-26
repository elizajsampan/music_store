import React, {useCallback} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import { Button, Grid, Tooltip } from "@mui/material";
import { useContext } from "react";
import { SongContext } from "../context/song/SongContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import { UserContext } from "../context/user/UserContext";
import { v4 as cartIdGenerator } from "uuid";

const SongDetailsPage = () => {
  
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  // Song details
  const { fetchSongById, songById} = useContext(SongContext);
  const { user, fetchUser } = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    fetchSongById(params.songId);
  }, [fetchSongById, params]);

  // Used for adding songs to cart (userId)
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Add/remove from cart
  const {
    cartItems,
    fetchCart,
    handleAddToCart: onAddToCart,
    handleRemoveFromCart: onRemoveFromCart,
  } = useContext(CartItemsContext);

  const handleAddToCart = async (song) => {
    await onAddToCart(song);
    fetchCart();
    await getCurrentQuantityInCart();
  }

  const handleRemoveFromCart = async () => {
    const cartItem = await cartItems.find((cartItem) => cartItem.songId === songById.songId);
    await onRemoveFromCart(cartItem.cartId);
    fetchCart();
    await getCurrentQuantityInCart();
    refreshPage();
  }

  useEffect(() => { // Do not relocate!
    fetchCart();
  }, [fetchCart]);

  const getCurrentQuantityInCart = () => {
    const cartItem = cartItems.find((cartItem) => cartItem.songId === songById.songId);

    if (cartItem) {
      return true;
    }

    if (!cartItem) {
      return false;
    }
  };


  if (!songById) {
    return null;
  }

  

  return (
    <div>
      <Navbar />
      <Box sx={{ height: 120 }} />
      {Object.keys(songById).length ? (
        <Card
          sx={{
            display: "flex",
            height: 300,
            width: 800,
            margin: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }} />
          <CardMedia
            component="img"
            sx={{ width: 300, height: 300 }}
            alt={songById.title}
            src={songById.imageUrl}
          ></CardMedia>
          <CardContent sx={{ flex: "1 0 center" }}>
            <Typography
              component="div"
              variant="h5"
              marginBottom={1}
              marginTop={5}
            >
              {
                <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                  {songById.title}
                </span>
              }
            </Typography>
            <Typography
              variant="h7"
              color="text.secondary"
              component="div"
              marginBottom={-0.05}
            >
              {
                <span
                  style={{
                    fontSize: "15px",
                    color: "primary",
                  }}
                >
                  ARTIST : {songById.artist.toUpperCase()}
                </span>
              }
            </Typography>
            <Typography
              variant="h7"
              color="text.secondary"
              component="div"
              marginBottom={-0.05}
            >
              {
                <span
                  style={{
                    fontSize: "15px",
                    color: "primary",
                  }}
                >
                  GENRE : {songById.genre.toUpperCase()}
                </span>
              }
            </Typography>
            <Typography
              variant="h7"
              color="text.secondary"
              component="div"
              marginBottom={-0.05}
            >
              {
                <span
                  style={{
                    fontSize: "15px",
                    color: "primary",
                  }}
                >
                  PRICE : PHP {songById.price}
                </span>
              }
            </Typography>

              {getCurrentQuantityInCart() === false ? (
                      <Button variant ="contained" sx={{ my: 3}}
                        onClick={() => handleAddToCart({
                                  cartId: cartIdGenerator(),
                                  songId: songById.songId, 
                                  userId: user.userId})}>
                        ADD TO CART
                      </Button>
                  ) : (
                      <Button variant="outlined" sx={{ my: 3}} onClick={handleRemoveFromCart}>
                        REMOVE FROM CART
                      </Button>
                  )}

          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default SongDetailsPage;
