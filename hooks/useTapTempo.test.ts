/* eslint-disable @typescript-eslint/no-empty-function */
import { renderHook, act } from '@testing-library/react-hooks'
import { GestureResponderEvent } from 'react-native'
import useTapTempo from './useTapTempo'

interface SetupProps {
    dataSetSize?: number
}

const dummyEvent: GestureResponderEvent = {
    bubbles: false,
    cancelable: false,
    currentTarget: 0,
    defaultPrevented: false,
    eventPhase: 0,
    isDefaultPrevented: () => false,
    isPropagationStopped: () => false,
    isTrusted: true,
    nativeEvent: {
        changedTouches: [],
        identifier: '',
        locationX: 0,
        locationY: 0,
        pageX: 0,
        pageY: 0,
        target: '',
        timestamp: 0,
        touches: [],
    },
    persist: () => {},
    preventDefault: () => {},
    stopPropagation: () => {},
    target: 0,
    timeStamp: 0,
    type: '',
}

function setup({ dataSetSize }: SetupProps = {}) {
    const utils = renderHook(({ dataSetSize }) => useTapTempo(dataSetSize), { initialProps: { dataSetSize } })
    return { ...utils }
}

describe('useTapTempo', () => {
    it('should take an average of all tap durations and return the millisecond value', () => {
        const { result } = setup()

        act(() => {
            result.current[1]({ ...dummyEvent, timeStamp: 100 })
        })
        expect(result.current[0]).toBe(0)

        act(() => {
            result.current[1]({ ...dummyEvent, timeStamp: 110 })
        })
        expect(result.current[0]).toBe(10)

        act(() => {
            result.current[1]({ ...dummyEvent, timeStamp: 130 })
        })
        expect(result.current[0]).toBe(15)

        act(() => {
            result.current[1]({ ...dummyEvent, timeStamp: 160 })
        })
        expect(result.current[0]).toBe(20)

        act(() => {
            result.current[1]({ ...dummyEvent, timeStamp: 170 })
        })
        expect(result.current[0]).toBe(17.5)
    })

    it('should return 0 when only tapped once', () => {
        const { result } = setup()

        act(() => {
            result.current[1]({ ...dummyEvent, timeStamp: 100 })
        })

        expect(result.current[0]).toBe(0)
    })
})
