import { SUBDIVISIONS } from '../constants/subdivisions'
import useTapTempo from './useTapTempo'

const MILLISECONDS_PER_MINUTE = 60 * 1000

export default function useTapTempoSubDivision(dataSetSize = 5) {
    const [milliseconds, handleTap, setMilliseconds] = useTapTempo(dataSetSize)

    const bpm = MILLISECONDS_PER_MINUTE / milliseconds

    const setBpm = (bpm: number) => {
        setMilliseconds(MILLISECONDS_PER_MINUTE / bpm)
    }

    return {
        handleTap,
        bpm: Math.round(bpm),
        setBpm,
        subdivisions: getSubdivisions(milliseconds),
    }
}

function round(number: number, decimalPlaces = 1) {
    return Math.round(number * (10 * decimalPlaces)) / (10 * decimalPlaces)
}

function getSubdivisions(milliseconds: number) {
    return Object.entries(SUBDIVISIONS).map(([title, multiplier]) => ({
        title,
        value: round(milliseconds * multiplier),
    }))
}
