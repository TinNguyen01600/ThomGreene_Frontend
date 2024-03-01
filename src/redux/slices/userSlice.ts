import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { UserType } from "../../misc/types";

interface UserState {
	user: UserType | null;
}


//************************************************************ */

const initialState: UserState = {
	user: null,
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		saveUserInfo: (state, action: PayloadAction<UserType | null>) => {
			state.user = action.payload;
		},
	},
});

export const { saveUserInfo } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users.user;

const userReducer = userSlice.reducer

export default userReducer;
