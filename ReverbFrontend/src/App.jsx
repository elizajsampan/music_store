import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfileForm from "./components/EditProfileForm";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/theme/ThemeContext";
import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import AddSongPage from "./pages/AddSongPage";
import EditSongPage from "./pages/EditSongPage";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SongDetailsPage from "./pages/SongDetailsPage";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/auth/AuthContext";
import PaymentPage from "./pages/PaymentPage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFoundPage from "./pages/NotFoundPage";
import MusicStreamingPage from "./pages/MusicStreamingPage";
import EditPasswordForm from "./components/EditPasswordForm";
import ConfirmPaymentModal from "./components/ConfirmPaymentModal";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ToastNotification from "./components/ToastNotification";

function App() {
  const { theme } = useContext(ThemeContext);
  const { jwt } = useContext(AuthContext);

  return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          sx={{ marginTop: 0 }}
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <ToastNotification />
          </Grid>
      
        </Grid>
        <ConfirmDeleteModal />
        <ConfirmPaymentModal />
        <Routes>

          {!jwt ? (
            <Route path="/" element={<LoginPage />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}

          <Route
            path="/register"
            element={jwt ? <Navigate to="/" /> : <RegistrationPage />}
            />
          <Route
            path="/login"
            element={jwt ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/user" element={<ProfilePage />} />
          <Route path="/user/editprofile" element={<EditProfileForm/>} />
          <Route path="/user/editpassword" element={<EditPasswordForm/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add" element={<AddSongPage />} />
          <Route path="/admin/:songId/edit" element={<EditSongPage />} />

          
          <Route path="/songs/:songId" element={<SongDetailsPage />} />
          <Route path="/musicplayer" element={<MusicStreamingPage />} />

          <Route path="*" element={<NotFoundPage />} />
 

        </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
