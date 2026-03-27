import React, { useState } from 'react'
import { useBoundStore } from '../../zus-store'
import { Habit } from '../../zus-store/habits.slice';

const defaultHabit: Pick<Habit, "title" | "frequency"> = { title: '', frequency: 'daily' };

const AddHabit = () => {

    const [habitState, setHabitState] = useState<Pick<Habit, "title" | "frequency">>(defaultHabit);

    const { addHabit } = useBoundStore();

    const hasError = (field: string) => {
        return false;
    }

    const getInputClass = (field: string) => {
        let commonClasses = `w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus-within:rounded-md focus-within:ring-1 focus-within:ring-inset focus-visible:outline-none `;
        // if (hasError(field)) {
        //     commonClasses += `focus-within:ring-red-800`;
        // } else {
        commonClasses += `focus-within:ring-blue-800 dark:focus-within:ring-blue-400`;
        // }
        return commonClasses;
    };

    const getInputDivClass = (field: string) => {
        let classes = `rounded-md shadow-sm ring-1 ring-inset focus:outline-0 `;

        switch (field) {
            case "title":
                classes += `flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-sm `;
                break;
            case "frequency":
                classes = `flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-sm `;
                break;
        }
        // if (hasError(field)) {
        //     classes += "ring-red-600";
        // } else {
        classes += "ring-gray-300";
        // }
        return classes;
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        setHabitState(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addHabit(habitState.title, habitState.frequency);
        setHabitState(defaultHabit);
    }


    return (
        <form
            data-testid="productForm"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="md:flex">
                <div className="w-full md:w-1/2 ">
                    <label
                        htmlFor="title"
                        className={`block text-sm font-medium leading-6 ${hasError("title")
                            ? "text-red-600"
                            : "text-gray-900 dark:text-gray-200"
                            }`}
                    >
                        Title
                    </label>
                    <div className="mt-1">
                        <div className={getInputDivClass("title")}>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={habitState.title}
                                className={getInputClass("title")}
                                onChange={handleInput}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/12">
                    <label
                        htmlFor="frequency"
                        className={`block text-sm font-medium leading-6 ${hasError("frequency")
                            ? "text-red-600"
                            : "text-gray-900 dark:text-gray-200"
                            }`}
                    >
                        Frequency
                    </label>
                    <div className="mt-1">
                        <div className={getInputDivClass("frequency")}>
                            <select
                                id="price"
                                className={getInputClass("frequency")}
                                name="frequency"
                                onChange={handleInput}
                                value={habitState.frequency}
                            >
                                <option value="">Select</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/12 flex justify-end items-end">
                    <button
                        type="submit"
                        disabled={!habitState.title || !habitState.frequency}
                        className="rounded-md block bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200"
                    >
                        Save
                    </button>
                </div>
            </div>

        </form>
    )
}

export default AddHabit