import * as React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`inline-block cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`absolute z-10 mt-1 rounded border border-gray-300 bg-white shadow-lg ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <li
      className={`cursor-pointer px-3 py-2 hover:bg-indigo-600 hover:text-white ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </li>
  );
};

export const SelectValue: React.FC<{ placeholder?: string }> = ({
  placeholder,
}) => {
  return <span className="text-gray-500">{placeholder}</span>;
};
