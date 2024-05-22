import userReducer, { saveUserInfo } from "../redux/slices/userSlice";
import { UserType } from "../misc/types";

describe("user reducer", () => {
	// initial state
	const initialState = {
		user: null,
	};

	// mock user
	const mockUser: UserType = {
		userName: "name 1",
		email: "test@mail.com",
		password: "changeme",
		avatar: "www.img.com",
		role: 1,
		id: "eecf7ef3-4cb4-4a33-abe7-dd995fd78b4e",
	};
	/*********************************************************************** */

	// test initial state
	test("should return initial state", () => {
		const received = userReducer(undefined, { type: "" });
		const expected = initialState;
		expect(received).toEqual(expected);
	});

	// test save user
	test("should return user", () => {
		const expected = {
			user: mockUser,
		};
		const received = userReducer(initialState, saveUserInfo(mockUser));
		expect(received).toEqual(expected);
	});
});
