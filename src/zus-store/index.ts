import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createHabitsSlice, HabitState } from "./habits.slice";

// For multiple slices use --> & OtherSlice
export type Store = HabitState;

export const useBoundStore = create(
    persist<HabitState>(    
        (...a) => ({
            ...createHabitsSlice(...a)
        }),
        {name: "habits-storage"}
    )
)