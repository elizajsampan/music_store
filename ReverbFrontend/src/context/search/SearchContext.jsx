import React, { useReducer, createContext, useCallback, useContext } from 'react';
import { useState } from 'react';
import useHttp from "../../hooks/useHttp";
import { AuthContext } from '../auth/AuthContext';
import { searchbyTitleArtist, searchbyGenre } from './searchActions';
import searchReducer from './searchReducer';

export const SearchContext = createContext({
    searchedSongs: [],
    fetchSongsByTitleArtist: () => {},
    fetchSongsByGenre: () => {}

});

export const SearchProvider = ({ children }) => {
    const initialState = {
        searchedSongs: [],
    };

  
    const http = useHttp();

    const { jwt } = useContext(AuthContext);

    const [{searchedSongs}, dispatch] = useReducer(searchReducer, initialState);

    const [searchedSongsNotFound, setSearchedSongsNotFound] = useState(false);
    const [unexpectedError, setUnexpectedError] = useState(false);

    const fetchSongsByTitleArtist = useCallback (async (input) => {
        try {
            const { data: searchedSongs } = await http.get(`/songs/search/${input}`,
            {
                headers: {
                    Authorization: jwt ? `Bearer ${jwt}` : "",
                },
            });
            dispatch(searchbyTitleArtist(searchedSongs));
          } catch (error) {
            const expectedError =
              error.response &&
              error.response.data &&
              error.response.status === 404;
    
            if (expectedError) {
                setSearchedSongsNotFound(true);
            } else {
                setUnexpectedError(true);
            }
        }
    }, [http, jwt]);

    const fetchSongsByGenre = useCallback (async (genre) => {
        try {
            const { data: searchedSongs } = await http.get(`/songs/genre/${genre}`,
            {
                headers: {
                    Authorization: jwt ? `Bearer ${jwt}` : "",
                },
            });
            dispatch(searchbyGenre(searchedSongs));
          } catch (error) {
            const expectedError =
              error.response &&
              error.response.data &&
              error.response.status === 404;
    
            if (expectedError) {
                setSearchedSongsNotFound(true);
            } else {
                setUnexpectedError(true);
            }
        }
    }, [http, jwt]);

    return(
        <SearchContext.Provider
            value ={{ 
                searchedSongs,
                fetchSongsByTitleArtist,
                fetchSongsByGenre }}>
            {children}
        </SearchContext.Provider>
    )
}