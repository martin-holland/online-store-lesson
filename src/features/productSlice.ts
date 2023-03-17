import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


const api = "https://fakestoreapi.com/products"

interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number,
    },
    quantity?: number,
}

const initialState = {
    products: [] as Product[],
    cart: [] as Product[]
}

export const fetchProducts = createAsyncThunk(
    'products/products',
    async () => {
        const response = await axios.get<Product[]>(api)
        // const data = await response.data
        // return data;
        return response.data;
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart: (state, action:PayloadAction<Product>) => {
            state.cart = [...state.cart, action.payload]
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        })
    },
})

export const {addToCart} = productsSlice.actions

export default productsSlice.reducer

