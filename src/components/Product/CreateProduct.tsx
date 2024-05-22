import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ProductCreateType } from "../../misc/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategoryId from "../Category/SelectCategoryId";

export type InputType = {
	name: string;
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
	const [categoryId, setCategoryId] = useState<string>("");

	const onSubmit: SubmitHandler<InputType> = (data) => {
        const stringToArray = (input: string): string[] => {
            var result = [];
            result.push(input);
            return result;
        };
		const newCreatedProduct: ProductCreateType = {
			name: data.name,
			price: data.price,
			description: data.description,
			categoryId: categoryId,
			images: stringToArray(data.images),
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
				name: "",
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
						type="name"
						placeholder="name"
						{...register("name")}
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
					<SelectCategoryId
						setCategoryId={setCategoryId}
						categoryId={categoryId}
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
