import {ChangeEvent, FC} from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  testId: string;
  label: string;
  options: { label: string; value: string }[];
  form?: UseFormReturn<any>;
  name?: string;
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
}

export const Select: FC<Props> = ({
  testId,
  label,
  options,
  form,
  name,
  onChange,
  multiple = false,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={testId}
        className="mb-1 block text-sm font-medium text-gray-700 after:text-red-500 after:content-['*']"
      >
        {label}
      </label>
      <select
        id={testId}
        data-testid={testId}
        className="block p-2 border border-orange-300 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
        multiple={multiple}
        onChange={(event: ChangeEvent) => {
            const value = Array.from((event.target as HTMLSelectElement).selectedOptions, option => option.value);
            onChange?.(value)
        }}
        {...(form && name && form.register(name))}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
