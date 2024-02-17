import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

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

//************************************************************ */

export const getUserFromToken = async (dispatch: any) => {
	const token1 = localStorage.getItem("token");
	if (token1) {
		const user = await axios(
			"https://api.escuelajs.co/api/v1/auth/profile",
			{
				headers: {
					Authorization: `Bearer ${token1}`,
				},
			}
		);
		dispatch(saveUserInfo(user.data));
	}
};

//************************************************************ */

const initialState: UserState = {
	user: null,
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

export const selectUsers = (state: RootState) => state.users.user;

export default userSlice.reducer;
