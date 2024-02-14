import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}


export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        loadmovie: (state, acion) => {
            state.info = acion.payload;
        },
        removemovie: (state) => {
            state.info = null;
        }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { loadmovie, removemovie } = movieSlice.actions
  
  export default movieSlice.reducer