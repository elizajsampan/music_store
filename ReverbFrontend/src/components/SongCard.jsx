import React, { useEffect } from "react";
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
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../context/song/SongContext";
import { v4 as cartIdGenerator } from "uuid";
import { AuthContext } from "../context/auth/AuthContext";
import { UserContext } from "../context/user/UserContext";

export default function SongCard({ song }) {
  const navigate = useNavigate();
  function refreshPage() {
    window.location.reload(false);
  }

  const {
    cartItems,
    fetchCart,
    handleAddToCart: onAddToCart,
    handleRemoveFromCart: onRemoveFromCart,
    handleResetCart,
  } = useContext(CartItemsContext);

  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSongDetails = async () => {
    await navigate(`/songs/${song.songId}`);
  };

  const getCurrentQuantityInCart = () => {
    const cartItem = cartItems.find(
      (cartItem) => cartItem.songId === song.songId
    );

    if (cartItem) {
      return true;
    }

    if (!cartItem) {
      return false;
    }
  };

  const handleAddToCart = async (song) => {
    await onAddToCart(song);
    // fetchCart();
    await getCurrentQuantityInCart();
  };

  const handleRemoveFromCart = async () => {
    const cartItem = await cartItems.find(
      (cartItem) => cartItem.songId === song.songId
    );
    await onRemoveFromCart(cartItem.cartId);
    fetchCart();
    await getCurrentQuantityInCart();
  };

  // Do not relocate useEffect!
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div>
      <Grid marginTop={2}>
        <Card sx={{ display: "flex", height: 175 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }} />
          <CardMedia
            component="img"
            sx={{ width: 180, height: 175 }}
            alt={song.title}
            src={song.imageUrl}
            onClick={handleSongDetails}
          ></CardMedia>
          <CardContent sx={{ flex: "1 0 center" }}>
            <Typography
              component="div"
              variant="h5"
              marginBottom={-0.5}
              numberOfLines={1}
            >
              <span style={{ fontWeight: "bold" }}>
                {song.title.length < 9
                  ? `${song.title}`
                  : `${song.title.substring(0, 9)}...`}
              </span>
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
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "primary",
                  }}
                >
                  {song.artist.length < 15
                    ? `${song.artist}`
                    : `${song.artist.substring(0, 15)}...`}
                </span>
              }
            </Typography>
            <Typography
              variant="subheader"
              color="text.secondary"
              component="div"
            >
              {
                <span sx={{ marginBottom: -10 }} style={{ fontSize: "13px" }}>
                  {" "}
                  PHP {song.price}
                </span>
              }
            </Typography>
            <br></br>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="add to cart">
                {getCurrentQuantityInCart() === false ? (
                  <Tooltip title="Add to Cart">
                    <IconButton
                      onClick={() =>
                        handleAddToCart({
                          cartId: cartIdGenerator(),
                          songId: song.songId,
                          userId: user.userId,
                        })
                      }
                    >
                      <AddShoppingCartRoundedIcon
                        sx={{ height: 20, width: 20 }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Remove from Cart">
                    <IconButton onClick={handleRemoveFromCart}>
                      <RemoveShoppingCartRoundedIcon
                        sx={{ height: 20, width: 20, color: "#cf2317" }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </IconButton>
              <Button
                sx={{ fontSize: 12 }}
                variant="outlined"
                onClick={() => handleSongDetails()}
                size="small"
              >
                <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                  VIEW SONG
                </span>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
