import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ProductCreateType } from "../../misc/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type InputType = {
	title: string;
	price: number;
	description: string;
	images: string;
	categoryId: number;
};

const CreateProduct: React.FC = () => {
	const {
		register,
		setValue,
		reset,
		handleSubmit,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm<InputType>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<InputType> = (data) => {
		const newCreatedProduct: ProductCreateType = {
			title: data.title,
			price: data.price,
			description: data.description,
			categoryId: data.categoryId,
			images: [data.images],
		};
		axios
			.post(
				"https://api.escuelajs.co/api/v1/products/",
				newCreatedProduct
			)
			.then((response) => {
				if (response.status === 201) {
					console.log("create success");
					navigate("/");
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({
				title: "",
				price: 0,
				description: "",
				images: "",
				categoryId: 0,
			});
		}
	});

	return (
		<div className="create-product">
			<h1>Create new product</h1>
			<main className="form">
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="title"
						placeholder="title"
						{...register("title")}
						required
					/>
					<input
						type="number"
						placeholder="price"
						{...register("price")}
						required
					/>
					<textarea
						rows={4}
						placeholder="description"
						{...register("description")}
						required
					/>
					<input
						type="number"
						placeholder="categoryId"
						{...register("categoryId")}
						required
					/>
					<input
						type="text"
						placeholder="image"
						{...register("images")}
						required
					/>
					<input
						type="submit"
						className="create-btn"
						value="Create"
					/>
				</form>
			</main>
			<button onClick={() => navigate("/")}>
				<span>Continue shopping</span>
			</button>
		</div>
	);
};

export default CreateProduct;
