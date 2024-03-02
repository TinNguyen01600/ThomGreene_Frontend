import withUserAuthentication, {
	WrappedComponentProp,
} from "../../hoc/withUserAuthenticate";

function UserUpdate({ isUserAuthenticated }: WrappedComponentProp) {
	return <>
        User Update
    </>;
}

export default withUserAuthentication(UserUpdate);
