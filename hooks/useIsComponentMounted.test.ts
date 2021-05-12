import { renderHook } from '@testing-library/react-hooks'

import useIsComponentMounted from './useIsComponentMounted'

function setup() {
    const utils = renderHook(() => useIsComponentMounted())

    return { ...utils }
}

describe('useIsComponentMounted', () => {
    it('should return true if component is currently mounted', () => {
        const { result } = setup()

        expect(result.current()).toBe(true)
    })

    it('should return false if component is not currently mounted', () => {
        const { result, unmount } = setup()

        unmount()

        expect(result.current()).toBe(false)
    })
})
