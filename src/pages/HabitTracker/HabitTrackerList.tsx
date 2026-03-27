import React from 'react'
import { useBoundStore } from '../../zus-store';

const HabitTrackerList = () => {

    const { habits } = useBoundStore();

    return (
        habits.length > 0 ? (
            <div>
                <ul>
                    {habits.map(habit => (
                        <li key={habit.id}>{habit.title}</li>
                    ))}
                </ul>
            </div>
        ) :
            <p>No habits saved</p>
    )
}

export default HabitTrackerList