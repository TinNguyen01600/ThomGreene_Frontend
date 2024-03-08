import { useEffect } from "react";
import withAdminAuthentication, {
	WrappedComponentProp,
} from "../../hoc/withAdminAuthenticate";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllProductsAsync } from "../../redux/slices/productSlice";

function ProductListAdmin({ isAdminAuthenticated }: WrappedComponentProp) {
	const allProds = useAppSelector((state) => state.products.allProducts);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, [dispatch]);
	return (
		<>
			{isAdminAuthenticated ? (
				<table className="product-list-admin">
					<tbody>
						<tr>
							<th>Products</th>
						</tr>
						{allProds.map((prod) => (
							<tr key={prod.id}>
								<td>{prod.title}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</>
	);
}

export default withAdminAuthentication(ProductListAdmin);
