import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAsyncStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState(initialValue)

    const getValueFromStorage = useCallback(async (): Promise<T> => {
        try {
            const value = await AsyncStorage.getItem(key)

            if (value === null) return initialValue
            return JSON.parse(value)
        } catch (error) {
            console.error(error)
            return initialValue
        }
    }, [initialValue, key])

    const setValueToStorage = useCallback(
        async (newValue: Partial<T>) => {
            const rollBackValue = value
            try {
                setValue((previousValue) => ({ ...previousValue, ...newValue }))
                await AsyncStorage.mergeItem(key, JSON.stringify(newValue))
            } catch (error) {
                console.error(error)
                setValue(rollBackValue)
            }
        },
        [key, value]
    )

    useEffect(() => {
        async function execute() {
            const storedValue = await getValueFromStorage()
            setValue(storedValue)
        }
        execute()
    }, [getValueFromStorage])

    return [value, setValueToStorage] as const
}
