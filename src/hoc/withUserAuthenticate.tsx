import { useAppSelector } from "../redux/hooks";

export type WrappedComponentProp = {
	isUserAuthenticated: boolean;
};

export default function withUserAuthentication(
	WrappedComponent: React.ComponentType<WrappedComponentProp>
) {
	return function () {
		const user = useAppSelector((state) => state.users.user);
		const isUserAuthenticated = user !== null;
		return <WrappedComponent isUserAuthenticated={isUserAuthenticated} />;
	};
}
