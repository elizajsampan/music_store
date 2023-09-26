import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../auth/AuthContext";
import { getPurchases, addPurchaseStart, addPurchaseFinish, addPurchaseCancel } from "./purchasesActions";
import purchasesReducer from "./purchasesReducer";

export const PurchasesContext = createContext({
  purchases: [],
  songsToPurchase: [],
  fetchPurchases: () => {},
  handleAddPurchasesStart: () => {},
  // handlePaymentConfirmationModalClose: () => {},
  handlePaymentConfirmation: () => {},
  handlePaymentCancel: () => {},
  showConfirmPaymentModal: false,

});

export const PurchasesProvider = ({ children }) => {

  const initialState = {
    purchases: [],
    songsToPurchase: [],
    showConfirmPaymentModal: false,
  };

  const [{purchases, songsToPurchase, showConfirmPaymentModal}, dispatch] = useReducer(purchasesReducer, initialState);
  const { jwt } = useContext(AuthContext);
  const http = useHttp("http://localhost:8080/reverb");

  const fetchPurchases = useCallback(async () => {
    const response = await http.get("/purchaseItems", 
    {
        headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
        },
    });
    dispatch(getPurchases(response.data));
  },[http, jwt]);

  const handleAddPurchasesStart = (purchase) => {
    dispatch(addPurchaseStart(purchase));
  };

  // const handlePaymentConfirmationModalClose = useCallback(async (toContinuePayment) => {
  //   if (toContinuePayment) {
  //       await http.post("/purchaseItems",
  //       {
  //         headers:  {
  //                   Authorization: jwt ? `Bearer ${jwt}` : "",
  //                   },
  //       });
  //       dispatch(addPurchaseFinish());
         
  //   } else {
  //     dispatch(addPurchaseCancel());
  //   }
  // }, [http, jwt]);

  const handlePaymentConfirmation = useCallback(async (songToPurchase) => {
        await http.post("/purchaseItems", {...songToPurchase},
        {
          headers:  {
                    Authorization: jwt ? `Bearer ${jwt}` : "", 
                    },
        });
        dispatch(addPurchaseFinish());
  }, [http, jwt]);

  const handlePaymentCancel = (() => {
    dispatch(addPurchaseCancel());
  });

  return (
    <PurchasesContext.Provider
      value={{
        purchases,
        songsToPurchase,
        fetchPurchases,
        handleAddPurchasesStart,
        showConfirmPaymentModal,
        handlePaymentCancel,
        handlePaymentConfirmation
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};
