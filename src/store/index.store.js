import {configureStore} from '@reduxjs/toolkit';
//... slices
import productReducer from './slices/product.slice';
import userReducer from './slices/user.slice';

const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        // autre reducer ..
    }
});

export default store;