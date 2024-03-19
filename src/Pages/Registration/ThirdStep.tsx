import React from "react";
import {
	Button,
	ErrorMessage,
	GlassEffect,
	InputContainer,
	Label,
	TextArea,
} from "./styledComponents";
import { RegistrationFormValues } from "../../Utils/Interfaces";
import PhoneInput from "react-phone-input-2";
import { Country } from "country-state-city";
import Dropdown from "../../Components/Dropdown";

type ThirdStepProps = {
	values: RegistrationFormValues;
	setValues: any;
	error: string;
};
const ThirdStep = (props: ThirdStepProps) => {
	const { values, setValues, error } = props;

	const data = Country.getAllCountries().map((country) => ({
		value: country.name,
		displayValue: `${country.name} - ${country.isoCode}`,
	}));

	return (
		<React.Fragment>
			<ErrorMessage>{error}</ErrorMessage>
			<GlassEffect width="80%">
				<InputContainer width="45%">
					<Label>Country</Label>
					<Dropdown options={data} />
				</InputContainer>
				<InputContainer width="45%">
					<PhoneInput
						country="in"
						value={values.phone}
						onChange={(phone) => setValues({ ...values, phone: phone })}
					/>
				</InputContainer>
				<InputContainer width="100%">
					<Label>Address</Label>
					<TextArea
						rows={6}
						name="address"
						value={values.address}
						onChange={(event: any) =>
							setValues({ ...values, address: event?.target.value })
						}
						placeholder="Enter your Address..."
					/>
				</InputContainer>
				<InputContainer width="45%">
					<Button type="submit">Register</Button>
				</InputContainer>
			</GlassEffect>
		</React.Fragment>
	);
};

export default ThirdStep;
