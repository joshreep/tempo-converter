import { SubdivisionName, SUBDIVISIONS } from '../constants/subdivisions'
import useEnabledSubdivisions, { EnabledSubdivisions } from './useEnabledSubdivisions'
import useTapTempo from './useTapTempo'

export const MILLISECONDS_PER_MINUTE = 60 * 1000

export default function useTapTempoSubDivision(dataSetSize = 5) {
    const [milliseconds, handleTap, setMilliseconds] = useTapTempo(dataSetSize)
    const enabledSubDivisions = useEnabledSubdivisions()

    const bpm = MILLISECONDS_PER_MINUTE / milliseconds

    const setBpm = (bpm: number) => {
        setMilliseconds(MILLISECONDS_PER_MINUTE / bpm)
    }

    return {
        handleTap,
        bpm: Math.round(bpm),
        setBpm,
        subdivisions: getSubdivisions(MILLISECONDS_PER_MINUTE / Math.round(bpm), enabledSubDivisions),
    }
}

function round(number: number, decimalPlaces = 1) {
    return Math.round(number * (10 * decimalPlaces)) / (10 * decimalPlaces)
}

function getSubdivisions(milliseconds: number, enabledSubDivisions: EnabledSubdivisions) {
    return (Object.entries(enabledSubDivisions) as [SubdivisionName, number][]).map(([title, multiplier]) => ({
        title,
        value: round(milliseconds * multiplier),
    }))
}

export function getMSValue(bpm: number, subdivision: SubdivisionName) {
    return round((MILLISECONDS_PER_MINUTE / bpm) * SUBDIVISIONS[subdivision])
}

export function getBPMValue(ms: number, subdivision: SubdivisionName) {
    return round(MILLISECONDS_PER_MINUTE / ms / SUBDIVISIONS[subdivision], 0.1)
}
