import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { OrderType } from "../../misc/types";

interface OrderState {
	allOrders: OrderType[];
	loading: boolean;
	error: string | null;
}

const initialState: OrderState = {
	allOrders: [],
	loading: false,
	error: null,
};

const url = `${process.env.REACT_APP_API_URL}orders`;

export const fetchAllOrdersOfUserAsync = createAsyncThunk(
	"fetchAllOrdersAsync",
	async (_, { rejectWithValue }) => {
		try {
			const token1 = localStorage.getItem("token");
            const res = await axios.get<OrderType[]>(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token1}`,
                    },
                }
            );
			return res.data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchAllOrdersOfUserAsync.fulfilled,
			(state, action) => {
				state.allOrders = action.payload;
				state.loading = false;
			}
		);
		builder.addCase(fetchAllOrdersOfUserAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAllOrdersOfUserAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message ?? "error";
		});
	},
});

export const {} = orderSlice.actions;

const orderReducer = orderSlice.reducer;

export default orderReducer;
