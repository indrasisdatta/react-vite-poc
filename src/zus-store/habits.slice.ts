import { StateCreator } from 'zustand';

export type Habit = {
    id: string, 
    title: string, 
    frequency: 'daily' | 'weekly',
    completedDates: string[], 
    createdAt: string
}

export type HabitState = {
    habits: Habit[],
    addHabit: (title: string, frequency: 'daily' | 'weekly') => void
}

export const createHabitsSlice: StateCreator<
    HabitState, 
    [["zustand/persist", unknown]], 
    [], 
    HabitState
> = (set) => ({
    habits: [],
    addHabit: (title, frequency) => set((state) => {
        return {
            habits: [
                ...state.habits,
                {
                    id: Date.now().toString(), 
                    title, 
                    frequency,
                    completedDates: [], 
                    createdAt: new Date().toISOString()
                }
            ]
        }
    })
})