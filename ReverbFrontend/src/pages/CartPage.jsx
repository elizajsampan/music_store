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
    Tooltip,
    IconButton
  } from "@mui/material";
import React, { useContext, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../context/song/SongContext";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const ModifiedCheckbox = ({ id, type, name, handleClick, isChecked, price }) => {
    return (
      <Checkbox
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
        value={price}
      />
    );
};
  
const CartPage = () => {

    function refreshPage() {
      window.location.reload(false);
    }

    const { cartItems, fetchCart, handleAddToCheckout, handleRemoveFromCart: onRemoveFromCart, handleResetCart: onResetCart } = useContext(CartItemsContext);

    // Checkbox
    const [isCheckAll, setIsCheckAll] = React.useState(false);
    const [isCheck, setIsCheck] = React.useState([]);
    const [list, setList] = React.useState([]);

    const handleCheckAll = (e) => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(cartItems.map(cartItem => cartItem.songId));
      setList(cartItems.map(cartItem => cartItem.price));
      if (isCheckAll) {
        setIsCheck([]);
        setList([]);
      }
    };

    const handleCheck = (e) => {
      const  { id, value, checked } = e.target; // refer to ModifiedCheckBox params for values
      setIsCheck([...isCheck, id]);
      setList([...list, parseFloat(value)])
      if (!checked) {
         setIsCheck(isCheck.filter(item => item !== id));
         setList(list.filter((item => firstOccurence => firstOccurence !== parseFloat(value) || --item)(1)));
       }
    };

    // Deletion
    const handleRemoveFromCart = async (cartId) => {
      await onRemoveFromCart(cartId);
      fetchCart();
      refreshPage();
    }

    const handleResetCart = async (cartId) => {
        await onResetCart(cartId);
        fetchCart();
        refreshPage();
    }

    // Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    // Total Price
    const getTotalPriceOfAllCartItems = () => {
      return list.reduce((accumulator, cartItem) => {
        return (accumulator + cartItem);
      }, 0);
    };

    // Check out
    const navigate = useNavigate();

    const handleCheckOut = async () => {
      const checkoutItems = await isCheck.map((checked) => {
        const item = cartItems.find((cartItem) => cartItem.songId === checked);
        return {
          id: checked,
          songId: item.songId,
          price: item.price,
          title: item.title,
          artist: item.artist,
          genre: item.genre,
          imageUrl: item.imageUrl,
          mp3Url: item.mp3Url
        };
      });
      await handleAddToCheckout(checkoutItems);
      navigate('/checkout');
    }

    // Do not relocate!
    useEffect(() => {
      fetchCart();
    }, [fetchCart]);

    if (cartItems.length === 0) {
      return (
        <>
          <Navbar />
          <Box sx={{ height: 120 }} />
  
          <Grid>
            <Typography
              textAlign="center"
              marginTop={2}
              marginBottom={1.5}
              variant="h5"
            >
              Your cart is empty.
            </Typography>
          </Grid>
        </>
      );
    }
  
    return (
        <>

      <Navbar />  
      <Box sx={{ height: 120 }}/>
      <Grid container spacing={2}>
      <Grid item xs={2}/>
      <Grid item xs={8}>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: 50  }}>
                <ModifiedCheckbox
                  color="primary"
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleCheckAll}
                  isChecked={isCheckAll}
                  inputProps={{
                    'aria-label': 'select all songs',
                  }}
                />
              </TableCell>
              <TableCell>
                <Tooltip title="Remove all">
                    <IconButton onClick={handleResetCart}>
                      <DeleteRoundedIcon />
                    </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((cartItem) => (
              <TableRow key={cartItem.id}>
                <TableCell sx={{ maxWidth: 50 }}>
                <ModifiedCheckbox
                  color="primary"
                  key={cartItem.id}
                  type="checkbox"
                  name={cartItem.title}
                  id={cartItem.songId}
                  price={cartItem.price}
                  handleClick={handleCheck}
                  isChecked={isCheck.includes(cartItem.songId)}
                  inputProps={{
                    'aria-label': 'select all songs',
                  }}
                />
              </TableCell>
              <TableCell>
                <Tooltip title="Remove">
                  <IconButton>
                    <DeleteOutlineRoundedIcon onClick={() => handleRemoveFromCart(cartItem.cartId)} />
                  </IconButton>
                </Tooltip>
                </TableCell>
                <TableCell>{cartItem.title}</TableCell>
                <TableCell>{cartItem.artist}</TableCell>
                <TableCell align="right">P{cartItem.price}</TableCell>
            </TableRow>
            ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="4" />
                <TableCell align="right">
                  <Typography variant="h5">
                    Total:
                    P {parseFloat(getTotalPriceOfAllCartItems()).toFixed(2)}
                  </Typography>
                  {isCheck.length === 0 ? null :
                    <Button onClick={handleCheckOut}>Check out</Button>
                  } 
                </TableCell>
              </TableRow>
            </TableFooter>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 8, 15]}
        component="div"
        count={cartItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Grid><br/>
      <Grid item xs={2}/>
      </Grid>

      
      </>
    );
  };
  
  export default CartPage;
  