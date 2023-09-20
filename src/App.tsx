import axios from "axios";
import moment from "moment";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { GoSearch, GoChevronDown, GoChevronUp } from "react-icons/go";

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

const App: FC = () => {
	const [formData, setFormData] = useState({
		city: "",
		state: "Madhya Pradesh",
	});
	const [searchRes, setSearchRes] = useState("Welcome to Weather app");
	const [data, setData] = useState<any>({});
	const [first, setFirst] = useState(false);
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [error, setError] = useState(false)
	const fetchData = async () => {
		setFirst(true);
		try {
			setData({});
			setSearchRes("");
			setLoading(true);
			setError(false)
			if (formData.city === "") return;
			const response = await axios.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${formData.city.trim()},${formData.state.trim()},IN&limit=1&appid=13ff76d747f32405258ae02a2226a29e`
			);
			const { lat, lon } = response.data[0];

			const weather = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=13ff76d747f32405258ae02a2226a29e`
			);
			console.log(
				"🚀 ~ file: App.tsx:50 ~ fetchData ~ weatherData:",
				weather.data
			);
			setLoading(false);
			setData(weather.data);
		} catch {
			setError(true)
			setLoading(false);
			setSearchRes(`Invalid data`);
		}
	};

	const degreeToDirection = (num: number) => {
		const val = Math.floor(num / 22.5 + 0.5);
		const directions = [
			"N",
			"NNE",
			"NE",
			"ENE",
			"E",
			"ESE",
			"SE",
			"SSE",
			"S",
			"SSW",
			"SW",
			"WSW",
			"W",
			"WNW",
			"NW",
			"NNW",
		];
		return directions[val % 16];
	};

	return (
		<>
			<div className='h-16 bg-slate-950 flex justify-center'>
				<div className='container lg:w-[1024px] flex justify-between items-center'>
					<div className='flex items-end'>
						<img src='/logo.svg' alt='err' className='w-10' />
						<h1 className='text-white text-2xl font-bold ml-3'>Weather App</h1>
					</div>
					<div className=''>
						<div className='bg-slate-100 p-2 rounded-full flex gap-2'>
							<GoSearch className='self-center ml-1' />
							<input
								type='text'
								name='city'
								autoComplete='off'
								className='bg-transparent self-end'
								placeholder='Search City'
								value={formData.city}
								onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
									if (e.key === "Enter") fetchData();
								}}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setFormData((prev) => ({
										...prev,
										city: e.target.value,
									}));
								}}
							/>
							<div className='relative w-48 bg-white rounded-full shadow-xl flex'>
								<input
									type='text'
									name='state'
									className='bg-transparent pl-2 pt-1 w-full'
									readOnly
									value={formData.state}
									onClick={() => setShow((prev) => !prev)}
								/>
								<div
									className='flex items-center pr-2'
									onClick={() => setShow((prev) => !prev)}>
									{!show ? <GoChevronDown /> : <GoChevronUp />}
								</div>
								<div
									className={`absolute left-0 top-8 rounded-lg bg-white shadow-xl w-full border ${
										!show ? "hidden" : ""
									}`}>
									<ul className='max-h-72 overflow-y-scroll p-2 scroll-py-2'>
										{state.map((ele) => (
											<li
												className='px-2 py-1 my-1 before:absolute before:backdrop-blur-md cursor-pointer hover:bg-[#0002] transition-all duration-75 ease-in-out shadow'
												key={ele.split(" ")[0]}
												onClick={() => {
													setShow(false);
													setFormData((prev) => ({ ...prev, state: ele }));
												}}>
												{ele}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='container lg:w-[1024px] flex justify-between items-center m-auto'>
				{(!first || error) && (
					<h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-slate-400'>
						{searchRes}
					</h1>
				)}
				{first && (
					<div className='bg-white border rounded-lg mt-10 shadow-lg w-full p-5 h-96	'>
						{loading && (
							<div
								role='status'
								className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center'>
								<div className='flex items-center justify-center h-72 bg-gray-300 rounded w-96 dark:bg-gray-700'>
									<svg
										className='w-10 h-10 text-gray-200 dark:text-gray-600'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 20 18'>
										<path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
									</svg>
								</div>
								<div className='w-full'>
									<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
									<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
								</div>
								<span className='sr-only'>Loading...</span>
							</div>
						)}
						{!!Object.keys(data).length && (
							<>
								<div className='flex justify-between'>
									<h1 className='text-cl'>{data.name}</h1>
									<h1 className='text-base'>{moment().format("LLLL")}</h1>
								</div>
								<div className='grid grid-cols-12'>
									<div className='col-span-4 flex items-center flex-col'>
										<img
											src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
											className='w-24 drop-shadow-lg h-24'
											alt='err'
										/>
										<h2 className='text-base -mt-4'>{data?.weather[0].main}</h2>
										<h2 className='text-sm text-slate-500'>
											{data?.weather[0].description}
										</h2>
										<h2 className='text-4xl'>
											{Math.floor(data.main.temp - 273.15)}&deg;C
										</h2>
										<h2 className='text-sm'>
											Feels Like {Math.floor(data.main.feels_like - 273.15)}
											&deg;C
										</h2>

										<div className='grid grid-cols-2 gap-8'>
											<div className='col-span-1'>
												<h2>
													Min - {Math.floor(data.main.temp_min - 273.15)}&deg;C
												</h2>
												<h2>
													Sunrise - {moment.unix(data.sys.sunrise).format("LT")}
												</h2>
											</div>
											<div className='col-span-1'>
												<h2>
													Max - {Math.floor(data.main.temp_max - 273.15)}&deg;C
												</h2>
												<h2>
													Sunset - {moment.unix(data.sys.sunset).format("LT")}
												</h2>
											</div>
										</div>
									</div>
									<div className='col-start-6 col-span-7'>
										<table className='w-full'>
											<tbody>
												<tr>
													<td colSpan={2}>
														<h2 className='text-lg'>Wind</h2>
														<hr />
													</td>
												</tr>
												<tr>
													<td>
														<h3>Wind speed</h3>
													</td>
													<td>
														<h3>{data.wind.speed} m/s</h3>
													</td>
												</tr>
												<tr>
													<td>
														<h3>Wind direction</h3>
													</td>
													<td>
														<h3>{degreeToDirection(data.wind.deg)} </h3>
													</td>
												</tr>
												<tr>
													<td colSpan={2}>
														<h2 className='text-lg'>Pressure & Humidity</h2>
														<hr />
													</td>
												</tr>
												<tr>
													<td>
														<h3>Pressure</h3>
													</td>
													<td>
														<h3>{data.main.pressure} hPa</h3>
													</td>
												</tr>
												<tr>
													<td>
														<h3>Humidity</h3>
													</td>
													<td>
														<h3>{data.main.humidity}%</h3>
													</td>
												</tr>
												<tr>
													<td colSpan={2}>
														<h2 className='text-lg'>Visibility</h2>
														<hr />
													</td>
												</tr>
												<tr>
													<td>
														<h3>Visibility</h3>
													</td>
													<td>
														<h3>{data.visibility} km</h3>
													</td>
												</tr>
												<tr>
													<td colSpan={2}>
														<h2 className='text-lg'>Cloudiness</h2>
														<hr />
													</td>
												</tr>
												<tr>
													<td>
														<h3>Cloudiness</h3>
													</td>
													<td>
														<h3>{data.clouds.all}%</h3>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default App;
