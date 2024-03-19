import React from "react";
import {
	RegistrationPageContainer,
	RelativeContainer,
} from "./styledComponents";
import Heading from "../../Components/Heading";
import FirstStep from "./FirstStep";
import { RegistrationFormValues } from "../../Utils/Interfaces";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

export default function Registration() {
	const [step, setStep] = React.useState(1);
	const [values, setValues] = React.useState<RegistrationFormValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		profilePicture: "",
		country: "",
		address: "",
		phone: "",
	});
	const [imageUploading, setImageUploading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

	const validate = () => {
		switch (step) {
			case 1:
				if (
					!values.name.trim() ||
					!values.email.trim() ||
					!values.email.includes("@" || ".") ||
					!values.profilePicture.trim()
				) {
					setError("Please fill in all fields");
					return false;
				}
				return true;
			case 2:
				if (
					!values.password ||
					values.password.length < 8 ||
					!values.confirmPassword ||
					values.password !== values.confirmPassword
				) {
					setError("Fill the Passwords or they do not match");
					return false;
				}
				return true;
			case 3:
				if (!values.country.trim() || !values.address.trim()) {
					setError("Please fill in all fields");
					return false;
				}
				return true;
			case 4:
				if (!values.phone.trim()) {
					setError("Please fill in all fields");
					return false;
				}
				return true;
			default:
				return true;
		}
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (validate()) {
			if (step < 3) {
				setStep((pre) => pre + 1);
			} else {
				console.log(values);
			}
		}
	};

	const changeImage = async (file: File) => {
		setImageUploading(true);
		if (file === null) {
			return;
		} else if (
			file.type === "image/jpeg" ||
			"image/jpg" ||
			"image/png" ||
			"image.svg" ||
			"image/gfif"
		) {
			const imgData = new FormData();
			imgData.append("file", file);
			imgData.append("upload_preset", "save_qa");
			imgData.append("cloud_name", "dakda5ni3");
			await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
				method: "POST",
				body: imgData,
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					setValues({ ...values, profilePicture: data.url });
					setImageUploading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return;
		}
	};

	return (
		<React.Fragment>
			<RegistrationPageContainer>
				<RelativeContainer>
					<Heading
						heading="Registration"
						description="Already have an account ? Then Please"
						linkText="Login"
						link="/login"
					/>
					<form
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
						onSubmit={handleSubmit}>
						{step === 1 && (
							<FirstStep
								values={values}
								setValues={setValues}
								changeImage={changeImage}
								error={error}
								imageUploading={imageUploading}
							/>
						)}
						{step === 2 && (
							<SecondStep
								values={values}
								setValues={setValues}
								showPassword={showPassword}
								showConfirmPassword={showConfirmPassword}
								setShowPassword={setShowPassword}
								setShowConfirmPassword={setShowConfirmPassword}
								error={error}
							/>
						)}
						{step === 3 && (
							<ThirdStep values={values} setValues={setValues} error={error} />
						)}
					</form>
				</RelativeContainer>
			</RegistrationPageContainer>
		</React.Fragment>
	);
}
