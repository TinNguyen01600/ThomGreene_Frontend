import { useAppSelector } from "../redux/hooks";

export type WrappedComponentProp = {
	isAdminAuthenticated: boolean;
};

export default function withAdminAuthentication(
	WrappedComponent: React.ComponentType<WrappedComponentProp>
) {
	return function () {
		const user = useAppSelector((state) => state.users.user);
		const isAdminAuthenticated = user !== null && user.role === 0;
		return <WrappedComponent isAdminAuthenticated={isAdminAuthenticated} />;
	};
}
