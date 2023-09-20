import { ChangeEvent, FC, FocusEvent } from "react";

type InputPropsType = {
	name: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputPropsType> = ({ name, onChange }: InputPropsType) => {
	const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
		const element = e.target.parentElement;
		element?.classList.add("border-slate-50");
		element?.children[1].classList.add(
			"-translate-y-7",
			"text-sm",
			"bg-[#334142]",
      "px-1",
      "text-slate-50"
      );
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
      const element = e.target.parentElement;
      element?.classList.remove("border-slate-50");
      element?.children[1].classList.remove(
        "-translate-y-7",
        "text-sm",
        "bg-[#334142]",
        "px-1",
        "text-slate-50"
        );
    };
	return (
    <>
			<div className='container border-2 border-slate-400 focus:border-slate-50 rounded bg-transparent p-2 relative transition-all duration-300 ease-in-out'>
				<input
					type='text'
					{...{ name, onChange }}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className='bg-transparent border-0 w-full z-20'
				/>
				<span className='select-none z-10 absolute bottom-1 text-slate-400 left-2 text-xl transition-all duration-150 ease-in-out capitalize'>
					{name}
				</span>
			</div>
		</>
	);
};

export default Input;
