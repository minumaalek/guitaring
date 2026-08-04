import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <input ref={ref} {...props} className="rounded-md border p-2" />

        <div className="h-5">
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
