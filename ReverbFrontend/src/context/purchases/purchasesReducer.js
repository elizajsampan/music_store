import PurchasesActionTypes from "./purchasesActionTypes";

const purchasesReducer = (state, action) => {
    switch(action.type){
        case PurchasesActionTypes.GET_PURCHASES:
            return {
                ...state,
                purchases: action.payload,
            }
        case PurchasesActionTypes.ADD_PURCHASES_START:
            return {
                ...state,
            //  purchases: [...state.purchases, action.payload],
                songsToPurchase: action.payload,
                showConfirmPaymentModal: true
            }
        case PurchasesActionTypes.ADD_PURCHASES_FINISH:
            return {
                ...state,
                purchases: [...state.purchases, state.songsToPurchase],
                songsToPurchase: null,
                showConfirmPaymentModal: false
            }
        case PurchasesActionTypes.ADD_PURCHASES_CANCEL:
            return {
                ...state,
                songsToPurchase: null,
                showConfirmPaymentModal: false,
            };
        default:
            return state;
    }

};

export default purchasesReducer;