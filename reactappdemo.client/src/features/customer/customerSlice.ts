import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { CustomerModel } from "../../Types/Models"

export type CustomerSliceState = {
    customer: CustomerModel

    showCustomerInput: boolean
    showImageInput: boolean
    searchCustomer: boolean
    searchImage: boolean
}

const initialState: CustomerSliceState = {
    customer: {id:0,firstName:"",lastName:""},
    showCustomerInput: false,
    showImageInput: false,
    searchCustomer: false,
    searchImage: false
}

export const customerSlice = createAppSlice({
    name: "customer",
    initialState,
    reducers: create => ({
        showImage: create.reducer(state => {
            state.showImageInput = true
        }),
        hideImage: create.reducer(state => {
            state.showImageInput = false
        }),
        showCustomerInput: create.reducer(state => {
            state.showCustomerInput = true
        }),
        hideCustomerInput: create.reducer(state => {
            state.showCustomerInput = false
        }),
        setCustomer: create.reducer(
            (state, action: PayloadAction<CustomerModel>) => {
                state.customer = action.payload
            },
        ),
        setSearchCustomer: create.reducer(
            (state, action: PayloadAction<boolean>) => {
                state.searchCustomer = action.payload
            },
        ),
        setSearchImage: create.reducer(
            (state, action: PayloadAction<boolean>) => {
                state.searchImage = action.payload
            },
        ),
    }),
    selectors: {
        selectShowImageInput: customer => customer.showImageInput,
        selectShowCustomerInput: customer => customer.showCustomerInput,
        selectCustomer: customer => customer.customer,
        selectSearchCustomer: customer => customer.searchCustomer,
        selectSearchImage: customer => customer.searchImage,
    },
})

export const { showImage, hideImage, showCustomerInput, hideCustomerInput, setCustomer, setSearchCustomer, setSearchImage } = customerSlice.actions

export const { selectShowImageInput, selectCustomer, selectShowCustomerInput, selectSearchCustomer, selectSearchImage } = customerSlice.selectors