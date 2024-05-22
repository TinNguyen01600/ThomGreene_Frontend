import { useState } from "react";
import NavBar from "../components/NavBar";
import withAdminAuthentication, {
	WrappedComponentProp,
} from "../hoc/withAdminAuthenticate";
import { ProductCreateType, ProductType, ProductUpdateType } from "../misc/types";
import { useAppSelector } from "../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { InputType } from "../components/Product/CreateProduct";
import Footer from "../components/Footer";
import SelectCategoryId from "../components/Category/SelectCategoryId";

function UpdateProductPage({ isAdminAuthenticated }: WrappedComponentProp) {
	const product = useAppSelector((state) => state.products.singleProduct);
	const [title, setTitle] = useState<string | undefined>(product?.name);
	const [price, setPrice] = useState<number | undefined>(product?.price);
	const [description, setDescription] = useState<string | undefined>(
		product?.description
	);
	const [image, setImage] = useState<string | undefined>(product?.images[0].url);
	const [categoryId, setCategoryId] = useState<string>("");

	/******************************************************************************* */
	const { productId } = useParams();
	const navigate = useNavigate();

	/******************************************************************************* */
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<InputType>();

	const onSubmit: SubmitHandler<InputType> = (data) => {
        const stringToArray = (input: string): string[] => {
            var result = [];
            result.push(input);
            return result;
        };
		const updatedProduct: ProductUpdateType = {
			// id: product?.id ? product.id : "",
			name: data.name,
			price: data.price,
			description: data.description,
			images: stringToArray(data.images),
			category: {
				id: categoryId,
				name: product?.category.name ? product.category.name : "",
				image: product?.category.image ? product.category.image : "",
			},
		};
		axios
			.put(
				`https://api.escuelajs.co/api/v1/products/${productId}`,
				updatedProduct
			)
			.then((response) => {
				if (response.status === 200) {
					console.log("update success");
					navigate(`/product/${productId}`);
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="update-product-page">
			<div className="navbar">
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
								{...register("name")}
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
								rows={10}
								placeholder="description"
								{...register("description")}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<SelectCategoryId
								categoryId={categoryId}
								setCategoryId={setCategoryId}
							/>
							<input
								type="text"
								placeholder="image"
								{...register("images")}
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
							<input
								type="submit"
								value="Update"
								className="update-btn"
							/>
						</form>
					</div>
				) : (
					<h3>You are not authenticated to update product</h3>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default withAdminAuthentication(UpdateProductPage);
