import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import logo from "../images/page-logo-glow.png";

const NotFoundPage = () => {

	const navigate = useNavigate();

	return ( 
	<>
		<Box sx={{ height: 150 }}/>
		<div align="center">
			<img src={logo}  height="200" /><br/><br/>
			<Typography variant="h5" gutterBottom component="div">
        		PAGE NOT FOUND
      		</Typography>
			<Typography variant="body1" gutterBottom component="div">
        		Sorry, the page you were looking for doesn't exist.
      		</Typography>
			<Button variant="outlined" onClick={() => navigate("/")} sx={{ my: 3 }}> Take me home </Button>
		</div>
	</>
	);
}
 
export default NotFoundPage;