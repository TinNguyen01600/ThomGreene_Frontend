import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import withAdminAuthentication, {
	WrappedComponentProp,
} from "../hoc/withAdminAuthenticate";
import { ProductCreateType } from "../misc/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProductAsync } from "../redux/slices/productSlice";
import { InputType } from "../components/Product/CreateProduct";

function UpdateProductPage({ isAdminAuthenticated }: WrappedComponentProp) {
	const product = useAppSelector((state) => state.products.singleProduct);
	const [title, setTitle] = useState<string | undefined>(product?.title);
	const [price, setPrice] = useState<number | undefined>(product?.price);
	const [description, setDescription] = useState<string | undefined>(
		product?.description
	);
	const [categoryId, setCategoryId] = useState<number | undefined>(
		product?.category.id
	);
	const [image, setImage] = useState<string | undefined>(product?.images[0]);

	/******************************************************************************* */
	const { productId } = useParams();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productId) dispatch(fetchSingleProductAsync(parseInt(productId)));
	});
    const navigate = useNavigate()

	/******************************************************************************* */
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<InputType>();

	const onSubmit: SubmitHandler<InputType> = (data) => {
		console.log(data);
		const updatedProduct: ProductCreateType = {
			title: data.title,
			price: data.price,
			description: data.description,
			categoryId: data.categoryId,
			images: [data.images],
		};
		axios
			.put(
				`https://api.escuelajs.co/api/v1/products/${productId}`,
				updatedProduct
			)
			.then((response) => {
                if (response.status === 200) {
                    console.log("update success")
                    navigate(`/product/${productId}`)
                }
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="update-product-page">
			<div className="nav">
				<NavBar />
			</div>
			<div className="main">
				{isAdminAuthenticated ? (
					<div className="form">
						<h3>Update product</h3>
						<form action="" onSubmit={handleSubmit(onSubmit)}>
							<input
								type="title"
								placeholder="title"
								{...register("title")}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<input
								type="number"
								placeholder="price"
								{...register("price")}
								value={price}
								onChange={(e) =>
									setPrice(parseInt(e.target.value))
								}
							/>
							<textarea
								rows={4}
								placeholder="description"
								{...register("description")}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<input
								type="number"
								placeholder="categoryId"
								{...register("categoryId")}
								value={categoryId}
								onChange={(e) =>
									setCategoryId(parseInt(e.target.value))
								}
							/>
							<input
								type="text"
								placeholder="image"
								{...register("images")}
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
							<input type="submit" value="Update" />
						</form>
					</div>
				) : (
					<h3>You are not authenticated to update product</h3>
				)}
			</div>
		</div>
	);
}

export default withAdminAuthentication(UpdateProductPage);
