import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type CheckboxProps = {
  id: string,
  label: string,
  checked?: boolean,
  register: UseFormRegisterReturn,
  className?: string
}

export default function Checkbox({ id, checked = false, register, label, value, className }: CheckboxProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      htmlFor={id}
      className={twMerge('flex flex-row items-center gap-2.5 text-sm sm:text-base dark:text-white light:text-black', className)}
    >
      <input
        id={id}
        type="checkbox"
        className="peer hidden"
        // checked={checked}
        value={value}
        {...register}
      />
      <div className="min-h-5 min-w-5 flex items-center justify-center rounded-[2px] border border-[#a2a1a851] light:bg-[#e8e8e8] dark:bg-[#2C2C2C] peer-checked:bg-[#6750A4] transition cursor-pointer">
        {checked && <FaCheck className="text-white h-3.5 w-3.5" />}
      </div>
      {label}
    </label>
  );
}
