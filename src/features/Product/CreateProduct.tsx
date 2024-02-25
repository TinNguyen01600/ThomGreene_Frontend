import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ProductCreateType } from "../../app/types";
import { error } from "console";
import { stringify } from "querystring";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type InputType = {
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
				}
			})
			.catch((error) => console.log(error));
	};

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                title: '',
                price: 0,
                description: '',
                images: '',
                categoryId: 0
            })
        }
    })

    const navigate = useNavigate()

	return (
		<>
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
					<input type="submit" />
				</form>
			</main>
            <button onClick={() => navigate('/')}>Continue shopping</button>
		</>
	);
};

export default CreateProduct;
