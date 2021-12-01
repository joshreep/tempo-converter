import { useSettings } from '../contexts/settings'
import { SubdivisionName, SUBDIVISIONS } from '../constants/subdivisions'

export type EnabledSubdivisions = Partial<typeof SUBDIVISIONS>

export default function useEnabledSubdivisions() {
    const { settings } = useSettings()

    const enabledSubDivisions: EnabledSubdivisions = {}

    const subKeys = Object.keys(SUBDIVISIONS) as SubdivisionName[]
    subKeys.forEach((title) => {
        if (settings[title]) enabledSubDivisions[title] = SUBDIVISIONS[title]
    })

    return enabledSubDivisions
}
