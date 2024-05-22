import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

import { fetchAllProductsAsync } from "../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ProductType } from "../misc/types";

type Props = {
	isPopupOpen: boolean;
	setIsPopupOpen: (isPopupOpen: boolean) => void;
};

const DeleteProductPopup: React.FC<Props> = ({
	isPopupOpen,
	setIsPopupOpen,
}) => {
	const dispatch = useAppDispatch();
	const deletedProduct = useAppSelector(
		(state) => state.products.singleProduct
	);
	const deleteProduct = (productId: string) => {
		axios
			.delete(`https://api.escuelajs.co/api/v1/products/${productId}`)
			.then((response) => {
				console.log(response);
				if (response.data === true) {
					dispatch(fetchAllProductsAsync());
					setIsPopupOpen(false);
					// window.location.reload();
				}
			})
			.catch((error) => console.log(error));
	};

	/******************************************************************************************** */

	return (
		<Popup
			open={isPopupOpen}
			modal
			nested
			contentStyle={popupStyles}
			onClose={() => setIsPopupOpen(false)}
		>
			<div className="modal">
				<button className="close" onClick={() => setIsPopupOpen(false)}>
					&times;
				</button>
				<div>
					are you sure you want to delete {deletedProduct?.name}
				</div>
				<div className="btn-group">
					<button
						onClick={() => {
							if (deletedProduct)
								deleteProduct(deletedProduct.id);
						}}
					>
						Yes
					</button>
					<button onClick={() => setIsPopupOpen(false)}>
						No, Cancel
					</button>
				</div>
			</div>
		</Popup>
	);
};

const popupStyles = {};

export default DeleteProductPopup;
