import { useState } from 'react'
import { GestureResponderEvent } from 'react-native'

export default function useTapTempo(dataSetSize = 5): [number, (event: GestureResponderEvent) => void] {
    const [, setTimeStamps] = useState<number[]>([])
    const [milliseconds, setMilliseconds] = useState(0)

    function handleTap(event: GestureResponderEvent) {
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

    return [milliseconds, handleTap]
}
