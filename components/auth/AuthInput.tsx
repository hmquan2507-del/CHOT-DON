import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: LucideIcon;
  rightIcon?: LucideIcon;
};

export default function AuthInput({
  label,
  icon: Icon,
  rightIcon: RightIcon,
  id,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  ...props
}: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block text-[15px] font-extrabold text-[#111B2F]"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8DA0B8]"
          strokeWidth={2}
        />

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="h-14 w-full cursor-text rounded-2xl border-[1.5px] border-[#DDE6EC] bg-white pl-[58px] pr-12 text-[16px] font-semibold text-[#081226] outline-none transition placeholder:font-medium placeholder:text-[#A2AFC3] hover:border-[#BFD8CE] focus:border-[#0EA968] focus:ring-4 focus:ring-[rgba(14,169,104,0.10)]"
          {...props}
        />

        {RightIcon ? (
          <RightIcon
            className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8DA0B8]"
            strokeWidth={2}
          />
        ) : null}
      </div>
    </div>
  );
}