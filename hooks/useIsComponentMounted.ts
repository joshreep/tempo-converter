import { useCallback, useEffect, useRef, useState } from 'react'

export default function useIsComponentMounted() {
    const ref = useRef(false)
    const [, setIsMounted] = useState(false)

    useEffect(() => {
        ref.current = true
        setIsMounted(true)

        return () => {
            ref.current = false
        }
    }, [])

    return useCallback(() => ref.current, [])
}
