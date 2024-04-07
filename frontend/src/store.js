import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import teamSliceReducer from './slices/teamSlice';

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        team: teamSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});


export default store;