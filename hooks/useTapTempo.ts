import { useState, useRef } from 'react'
import { GestureResponderEvent } from 'react-native'

export default function useTapTempo(dataSetSize = 5) {
    const [, setTimeStamps] = useState<number[]>([])
    const [milliseconds, setMilliseconds] = useState(1000)

    const resetTimeStampsTimeout = useRef<NodeJS.Timeout>()

    function handleTap(event: GestureResponderEvent) {
        // If it's been more than the configured time since the last tap,
        // then clear out all of the timestamps so we don't end up with a
        // few really long ones during the time before the old values are
        // flushed.
        resetTimeStampsTimeout.current && clearTimeout(resetTimeStampsTimeout.current)
        resetTimeStampsTimeout.current = setTimeout(() => {
            setTimeStamps([])
        }, 2000)

        setTimeStamps((previousTimeStamps) => {
            const newTimeStamps = [event.timeStamp, ...previousTimeStamps.slice(0, dataSetSize)]
            if (newTimeStamps.length < 2) return newTimeStamps

            const durations: number[] = []

            newTimeStamps.forEach((timeStamp, index) => {
                if (index === 0) return

                durations.push(Math.abs(timeStamp - newTimeStamps[index - 1]))
            })

            const averageMilliseconds =
                durations.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / durations.length

            setMilliseconds(averageMilliseconds)

            return newTimeStamps
        })
    }

    return [milliseconds, handleTap, setMilliseconds] as const
}
