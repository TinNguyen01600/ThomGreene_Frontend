import { useState } from "react";
import axios from "axios";

type Props = {
	setImageLink: (imageLink: string | null) => void;
	setAvatar: (avatar: string) => void;
};

const ImageUpload: React.FC<Props> = ({ setImageLink, setAvatar }) => {
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		if (event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			setFile(selectedFile);

			const reader = new FileReader();
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string);
			};
			reader.readAsDataURL(selectedFile);
		}
	};

	const handleUploadImage = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append("file", file);

			try {
				const result = await axios.post(
					`https://api.escuelajs.co/api/v1/files/upload`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);

				if (result.data.location) {
					setImageLink(result.data.location);
					setAvatar(result.data.location);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setFile(null);
		setAvatar("");
		setImageLink(null);
		setImagePreview(null);
	};

	/**************************************************************************** */

	return (
		<div className="img-upload">
			<label htmlFor="avatar">
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
				/>
			</label>
			{imagePreview && (
				<img
					src={imagePreview}
					alt="thumbnail preview"
					style={{ maxHeight: 100, maxWidth: 100, marginRight: 10 }}
				/>
			)}
			<div className="btn-group">
				<button onClick={handleUploadImage} className="upload">
					<span>Upload</span>
				</button>
				<button onClick={handleRemove} className="remove">
					<span>Remove Image</span>
				</button>
			</div>
		</div>
	);
};

export default ImageUpload;
