import React from 'react'
import { useBoundStore } from '../../zus-store'
import HabitTrackerList from './HabitTrackerList';
import AddHabit from './AddHabit';

const HabitTrackerContainer = () => {

    const store = useBoundStore();

    console.log('Zustand store: ', store)

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4 flex">
                Habit Tracker
            </h1>
            <div className="bg-neutral-primary-soft block w-full p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium mb-4">
                <AddHabit />
            </div>
            <div className="bg-neutral-primary-soft block w-full p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
                <HabitTrackerList />
            </div>
        </div>
    )
}

export default HabitTrackerContainer