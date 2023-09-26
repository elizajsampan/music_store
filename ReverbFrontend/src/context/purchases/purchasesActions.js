import PurchasesActionTypes from "./purchasesActionTypes";

export const getPurchases = (purchases) => ({
  type: PurchasesActionTypes.GET_PURCHASES,
  payload: purchases,
});

export const addPurchaseStart = (songsToPurchase) => ({
  type: PurchasesActionTypes.ADD_PURCHASES_START,
  payload: songsToPurchase,
});

export const addPurchaseFinish = () => ({
  type: PurchasesActionTypes.ADD_PURCHASES_FINISH,
  // payload: purchase,
});

export const addPurchaseCancel = () => ({
  type: PurchasesActionTypes.ADD_PURCHASES_CANCEL
});




