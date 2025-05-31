import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const auctionSlice = createSlice({
    name: "auction",
    initialState: {
        loading: false,
        itemDetail: {},
        auctionDetail: {},
        auctionBidders: {},
        myAuctions: [],
        allAuctions: [],
    },
    reducers: {
        getAllAuctionItemRequest(state, action) {
            state.loading = true;
        },
        getAllAuctionItemSuccess(state, action) {
            state.loading = false;
            state.allAuctions = action.payload;
            
        },
        getAllAuctionItemFailed(state, action) {
            state.loading = false;
        },
        resetSlice(state, action) {
            state.loading = false;
            state.auctionDetail = state.auctionDetail;
            state.itemDetail = state.itemDetail;
            state.myAuctions = state.myAuctions;
            state.allAuctions = state.allAuctions;
        },
    }
})


export const getAllAuctionItems = () => async (dispatch) => {
    dispatch(auctionSlice.actions.getAllAuctionItemRequest());
    try {
        const response = await axios.get(
            "http://localhost:5000/api/v1/auctionitem/allitems",
            { withCredentials: true }
        );
        dispatch(
            auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
        );
        dispatch(auctionSlice.actions.resetSlice());
    } 
    catch (error) {
        dispatch(auctionSlice.actions.getAllAuctionItemFailed());
        console.error(error);
        dispatch(auctionSlice.actions.resetSlice());
    }
};


export default auctionSlice.reducer;