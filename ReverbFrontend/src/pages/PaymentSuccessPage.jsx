import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useContext } from "react";
import { CartItemsContext } from "../context/cartItems/CartItemsContext";
import NotFoundPage from "./NotFoundPage";
import Navbar from "../components/Navbar";

const PaymentSuccessPage = () => {

	const navigate = useNavigate();
    const { checkoutItems } = useContext(CartItemsContext);

    if (checkoutItems.length === 0){
        return <NotFoundPage/>;
    }

	return ( 
	<>
        <Navbar/>
		<Box sx={{ height: 150 }}/>
		<div align="center">
			<Typography variant="h5" gutterBottom component="div">
        		<CheckCircleRoundedIcon/> SUCCESS!
      		</Typography>
			<Typography variant="body1" gutterBottom component="div">
        		Payment was made successfully.
      		</Typography>
			<Button variant="outlined" onClick={() => navigate("/")} sx={{ my: 3 }}> Take me home </Button>
		</div>
	</>
	);
}
 
export default PaymentSuccessPage;