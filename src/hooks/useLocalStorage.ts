import { useSyncExternalStore } from "react";

export function useLocalStorage<T = string>(
    key: string,
    defaultValue?: T,
    parser?: (value: string | null) => T
) {

    const getSnapshot = () => {
        const raw = localStorage.getItem(key);
        if (parser) return parser(raw);
        return (raw ?? defaultValue) as T;
    }

    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', callback);
        window.addEventListener('local-storage', callback);
        return () => {
            window.removeEventListener('storage', callback);
            window.removeEventListener('local-storage', callback);
        }
    }

    const value = useSyncExternalStore(subscribe, getSnapshot);

    const setValue = (val: T) => {
        localStorage.setItem(key, String(val));
        window.dispatchEvent(new Event('local-storage'));
    }

    return [ value, setValue ] as const;
}
