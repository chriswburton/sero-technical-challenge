import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  testId: string;
  type?: 'text' | 'number';
  label: string;
  form: UseFormReturn<any>;
  name: string;
}

export const Input: FC<Props> = ({ testId, type = 'text', label, form, name }) => {
  return (
      <div className={'w-full'}>
        <label
          htmlFor={testId}
          className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
        >
          {label}
        </label>
        <input
          type={type}
          id={testId}
          data-testid={testId}
          className="block p-2 border w-full rounded-md border-orange-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
          {...form.register(name)}
        />
      </div>
  );
};
