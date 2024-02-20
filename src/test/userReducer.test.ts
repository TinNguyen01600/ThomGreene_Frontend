import reducer, { UserType, saveUserInfo } from "../redux/user/userSlice";

describe("user reducer", () => {
	// initial state
	const initialState = {
		user: null,
	};

	// mock user
	const mockUser: UserType = {
		name: "name 1",
		email: "test@mail.com",
		password: "changeme",
		avatar: "www.img.com",
		role: "customer",
		id: 1,
	};
	/*********************************************************************** */

	// test initial state
	test("should return initial state", () => {
		const received = reducer(undefined, { type: "" });
		const expected = initialState;
		expect(received).toEqual(expected);
	});

	// test save user
	test("should return user", () => {
		const expected = {
			user: mockUser,
		};
		const received = reducer(initialState, saveUserInfo(mockUser));
		expect(received).toEqual(expected);
	});
});
