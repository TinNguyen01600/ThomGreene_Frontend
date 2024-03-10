import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import withAdminAuthentication, {
	WrappedComponentProp,
} from "../../hoc/withAdminAuthenticate";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	fetchAllProductsAsync,
	fetchSingleProductAsync,
} from "../../redux/slices/productSlice";
import { ProductType } from "../../misc/types";
import DeleteProductPopup from "../DeleteProductPopup";

function ProductListAdmin({ isAdminAuthenticated }: WrappedComponentProp) {
	const allProds = useAppSelector((state) => state.products.allProducts);
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, [dispatch]);

	/******************************************************************************************* */

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		textTransform: "uppercase",
		fontSize: 12,
		padding: "1vh 2vw",
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: "#525252",
			color: "#fff",
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		height: "1vh",
		"&:nth-of-type(odd)": {
			backgroundColor: "#F2F3F3",
		},
		// hide last border
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	}));

	function createData(product: ProductType) {
		return { product };
	}

	const rows = allProds.map((prod) => createData(prod));

	/******************************************************************************************* */
	return (
		<div className="ctn" style={{ margin: "4vh 4vw" }}>
			{isAdminAuthenticated && (
				<>
					<TableContainer component={Paper}>
						<Table aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Product</StyledTableCell>
									<StyledTableCell align="right">
										Price
									</StyledTableCell>
									<StyledTableCell align="right">
										Category
									</StyledTableCell>
									<StyledTableCell align="right">
										Edit
									</StyledTableCell>
									<StyledTableCell align="right">
										Delete
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<StyledTableRow key={row.product.id}>
										<StyledTableCell
											component="th"
											scope="row"
										>
											<Link
												to={`/product/${row.product.id}`}
												style={{
													color: "black",
													textDecoration: "none",
												}}
											>
												{row.product.title}
											</Link>
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.product.price} €
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.product.category.name}
										</StyledTableCell>
										<StyledTableCell align="right">
											<div
												onClick={async () => {
													await dispatch(
														fetchSingleProductAsync(
															row.product.id
														)
													);
													navigate(
														`/product/${row.product.id}/update-product`
													);
												}}
												style={{ cursor: "pointer" }}
											>
												<BorderColorIcon />
											</div>
										</StyledTableCell>
										<StyledTableCell align="right">
											<div
												onClick={async () => {
													await dispatch(
														fetchSingleProductAsync(
															row.product.id
														)
													);
													setIsPopupOpen(true);
												}}
												style={{ cursor: "pointer" }}
											>
												<DeleteForeverIcon />
											</div>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<DeleteProductPopup
						isPopupOpen={isPopupOpen}
						setIsPopupOpen={setIsPopupOpen}
					/>
				</>
			)}
		</div>
	);
}

export default withAdminAuthentication(ProductListAdmin);
