import axios from "axios";
import { ChangeEvent, FC, FormEvent, useState } from "react";
// import Input from "./Components/Input";
const state = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttarakhand",
	"Uttar Pradesh",
	"West Bengal",
];

const Temp: FC = () => {
	const [formData, setFormData] = useState({
		city: "",
		state: "",
	});
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response: unknown = await axios.get(
			`http://api.openweathermap.org/geo/1.0/direct?q=${formData.city.trim()},${formData.state.trim()},IN&limit=1&appid=13ff76d747f32405258ae02a2226a29e`
		);
		console.log({ response });
	};

	return (
		<>
			<div
				className='min-h-screen bg-center bg-cover relative'
				style={{ backgroundImage: "url(/bg.jpg)" }}>
				<div className='w-96 p-6 backdrop-blur-md bg-[#fff3] rounded text-white center'>
					<h1 className='text-2xl text-center font-bold'>Weather App</h1>
					<form className='flex flex-col gap-4 mt-10' onSubmit={handleSubmit}>
						<input
							type='text'
							className='border-2 border-slate-400 focus:border-slate-50 rounded bg-transparent p-2 caret-white'
							placeholder='City'
							autoComplete='off'
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormData((prev) => ({ ...prev, city: e.target.value }))
							}
						/>
						<div className='relative'>
							<input
								className='border-2 w-full border-slate-400 focus:border-slate-50 rounded bg-transparent p-2 caret-white'
								placeholder='State'
								autoComplete='off'
								readOnly
							/>
							<div className='absolute left-0 top-12 backdrop-blur-md bg-[#fff3] w-full'>
								<ul className='overflow-y-scroll h-96'>
									{state.map((ele, idx) => (
										<li
											className='px-2 mx-2 py-1 my-1 before:absolute before:backdrop-blur-md  bg-[#fff3] rounded-lg cursor-pointer hover:bg-[#fff6]'
											key={idx}
											onClick={() =>
												setFormData((prev) => ({ ...prev, state: ele }))
											}>
											{ele}
										</li>
									))}
								</ul>
							</div>
						</div>
						{/* <Input
							name='city'
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormData((prev) => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						/>
						<Input
							name='state'
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormData((prev) => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						/> */}
						{/* <input
							type='text'
							className='border-2 border-slate-400 focus:border-slate-50 rounded bg-transparent p-2 caret-white'
							placeholder='country'
						/> */}
						<button className='border-2 p-2 rounded hover:bg-white hover:text-black border-white font-semibold transition-all duration-300 ease-in-out'>
							Get Weather
						</button>
					</form>
					{
						// <img
						// 	src='https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/3-dots-fade-white-36.svg'
						// 	alt='err'
						// 	className='mx-auto my-6'
						// />
					}
				</div>
			</div>
		</>
	);
};

export default Temp;
