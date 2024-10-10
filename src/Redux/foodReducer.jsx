import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching food data
export const foodFetch = createAsyncThunk(
    'food/fetchFood',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://dummyjson.com/recipes');

            if (!response.status === 200) {  // Checking for successful response
                throw new Error('Server Error');
            }

            return response.data;  // Return the data directly
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);  // Handle the error using rejectWithValue
        }
    }
);

// Slice for handling food state
const foodSlice = createSlice({
    name: 'food',
    initialState: { cart: [], food: [], status: 'idle', error: null },
    reducers: {
        addToCart: (state, action) => {
            console.log('action', action.payload);
            
            const existingfood = state.cart.find(el => el.id === action.payload.id);
            if (existingfood) {
                console.log('exist');
                
                state.cart = state.cart.map(el => el.id === action.payload.id ? action.payload : el);
            } else {
                state.cart.push(action.payload);
            }
            console.log('newcart', state.cart);
            
        },

        removeFromCart : (state, action) => {
            state.cart = state.cart.filter(el => el.id !== action.payload)
        },

        increment : (state , action) => {
            state.cart = state.cart.map(el => el.id === action.payload ? {...el , quantity : el.quantity + 1} : el)
        },
        decrement : (state , action) => {
            state.cart = state.cart.map(el => el.id === action.payload && el.quantity > 0 ? {...el , quantity : el.quantity - 1} : el)
            state.cart = state.cart.filter(el => el.quantity > 0)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(foodFetch.pending, (state) => {
                state.status = 'loading';  // Set status to loading
            })
            .addCase(foodFetch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.food = action.payload;  // Store the fetched data in the food array
            })
            .addCase(foodFetch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { addToCart , removeFromCart , increment , decrement} = foodSlice.actions;
export default foodSlice.reducer;
