import {Select} from "./Select";
import React, {FC} from "react";
import {Input} from "./Input";
import {UseFormReturn} from "react-hook-form";
import {Button} from "./Button";

interface Props {
    form: UseFormReturn<any>;
    ingredients: { _id: string; name: string }[];
}

export const Measurements: FC<Props> = ({
    form,
    ingredients
}) => {
    const measurements = form.getValues('measurements')

    const handleAddNewMeasurement = () => {
        form.setValue('measurements', [
            ...measurements,
            {}
        ])
    }

    return <div className={'flex flex-col space-y-4'}>
        {measurements.map(({ ingredientId, quantity, unit }: any, i: number) => <div
            key={i}
            className={'flex gap-2'}
        >
            <Select
                testId={`createRecipeIngredient${i}`}
                label={'Ingredients'}
                options={ingredients.map(({ _id, name }) => ({
                    label: name,
                    value: _id
                }))}
                form={form}
                name={`measurements.${i}.ingredientId`}
            />
            <Input
                testId={`createRecipeQuantity${i}`}
                type={'number'}
                label={'Quantity'}
                form={form}
                name={`measurements.${i}.quantity`}
            />
            <Input
                testId={`createRecipeUnit${i}`}
                label={'Unit'}
                form={form}
                name={`measurements.${i}.unit`}
            />
        </div>)}
        <Button testId={'addMeasurement'} onClick={() => handleAddNewMeasurement()}>
            Add new
        </Button>
    </div>
}
