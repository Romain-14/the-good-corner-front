import {configureStore} from '@reduxjs/toolkit';
//... slices
import productReducer from './slices/product.slice';

const store = configureStore({
    reducer: {
        products: productReducer,
    }
});

export default store;