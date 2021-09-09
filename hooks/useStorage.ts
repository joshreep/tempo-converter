import { SetStateAction, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useIsComponentMounted from './useIsComponentMounted'

export default function useStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue)
    const isComponentMounted = useIsComponentMounted()

    useEffect(() => {
        async function getValue() {
            const value = await AsyncStorage.getItem(key)

            if (isComponentMounted()) {
                if (value === null) return setStoredValue(initialValue)

                return setStoredValue(JSON.parse(value))
            }
        }
        getValue()
    }, [initialValue, isComponentMounted, key])

    const setValue = (value: SetStateAction<T>) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        AsyncStorage.setItem(key, JSON.stringify(valueToStore))
    }

    return [storedValue, setValue] as const
}
