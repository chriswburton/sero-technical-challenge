import { FC, MouseEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
    testId: string;
    children: string;
    form?: UseFormReturn<any>;
    onClick: (event: MouseEvent) => void;
}

export const Button: FC<Props> = ({ testId, form, onClick, children }) => {
    return <button
        data-testid={testId}
        type="button"
        className="h-10 rounded-lg border border-orange-500 bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-orange-700 hover:bg-orange-700 focus:ring focus:ring-orange-200 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300"
        onClick={onClick}
        disabled={form && !form.formState.isValid}
    >{children}</button>
};
