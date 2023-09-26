import SearchActionTypes from "./searchActionTypes";

const searchReducer = (state, action) => {
    switch(action.type){
        case SearchActionTypes.SEARCH_BY_TITLE_ARTIST:
            return {
                ...state,
                searchedSongs: action.payload,
            }
        case SearchActionTypes.SEARCH_BY_GENRE:
            return {
                ...state,
                searchedSongs: action.payload,
            }
        default:
            return state;
    }

};

export default searchReducer;