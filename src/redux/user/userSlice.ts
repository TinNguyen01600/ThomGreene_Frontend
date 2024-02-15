import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type UserRegister = {
	name: string;
	email: string;
	password: string;
	avatar: string;
};

export type UserType = UserRegister & {
	role: "customer" | "admin";
	id: number;
};

interface UserState {
	user: UserType | null;
}

//************************************************ */

let initialUser: UserType | null = null;
const data = localStorage.getItem("userInfo");
if (data) {
	initialUser = JSON.parse(data);
}

const initialState: UserState = {
	user: initialUser,
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		saveUserInfo: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload;
		},
	},
});

export const { saveUserInfo } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users.user

export default userSlice.reducer;
