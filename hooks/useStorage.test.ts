import AsyncStorage from '@react-native-async-storage/async-storage'
import { renderHook } from '@testing-library/react-hooks'
import useStorage from './useStorage'

interface SetupProps<T> {
    getItemValue?: string | null
    initialValue?: T
}

function setup<T>({ getItemValue = null, initialValue }: SetupProps<T> = {}) {
    const getValueSpy = jest.spyOn(AsyncStorage, 'getItem').mockReturnValueOnce(Promise.resolve(getItemValue))
    const setValueSpy = jest.spyOn(AsyncStorage, 'setItem').mockResolvedValueOnce()
    const utils = renderHook(() => useStorage<T | undefined>('@testKey', initialValue))

    return { getValueSpy, setValueSpy, ...utils }
}

describe('useStorage', () => {
    it('should try to get the item on component mount', async () => {
        const { getValueSpy, result, waitFor } = setup({ getItemValue: '{"foo":"bar"}' })

        expect(getValueSpy).toHaveBeenCalledTimes(1)
        waitFor(() => expect(result.current[0]).toEqual(expect.objectContaining({ foo: 'bar' })))
    })

    it('should return the initial value if there is no value saved', () => {
        const { result } = setup({ initialValue: { bar: 'baz' } })

        expect(result.current[0]).toEqual(expect.objectContaining({ bar: 'baz' }))
    })

    it('should set the value', () => {
        const { result, setValueSpy } = setup({ initialValue: 0 })

        result.current[1](5)

        expect(setValueSpy).toHaveBeenCalledTimes(1)
        expect(result.current[0]).toEqual(5)
    })
})
