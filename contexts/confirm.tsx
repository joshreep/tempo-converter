import React, { createContext, FC, useContext, useState } from 'react'

const DEFAULT_MESSAGE = 'Are you sure?'
const DEFAULT_BUTTON_TEXT = 'Yes'

const ConfirmContext = createContext<{
    callback?: () => void
    closeConfirmation: () => void
    confirmButtonText: string
    message: string
    openConfirmation: (message: string, confirmButtonText: string, callback: () => void) => void
    show: boolean
}>({
    closeConfirmation: () => void 0,
    confirmButtonText: DEFAULT_BUTTON_TEXT,
    message: DEFAULT_MESSAGE,
    openConfirmation: () => void 0,
    show: false,
})

export function useConfirmation() {
    return useContext(ConfirmContext)
}

const ConfirmProvider: FC = ({ children }) => {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState(DEFAULT_MESSAGE)
    const [confirmButtonText, setConfirmButtonText] = useState(DEFAULT_BUTTON_TEXT)
    const [callback, setCallback] = useState<() => void>()

    const openConfirmation = (
        message = DEFAULT_MESSAGE,
        confirmButtonText = DEFAULT_BUTTON_TEXT,
        callback: () => void
    ) => {
        setShow(true)
        setMessage(message)
        setConfirmButtonText(confirmButtonText)
        setCallback(() => callback)
    }

    const closeConfirmation = () => {
        setShow(false)
        setMessage(DEFAULT_MESSAGE)
        setConfirmButtonText(DEFAULT_BUTTON_TEXT)
        setCallback(undefined)
    }

    return (
        <ConfirmContext.Provider
            value={{ callback, message, confirmButtonText, show, openConfirmation, closeConfirmation }}
        >
            {children}
        </ConfirmContext.Provider>
    )
}

export default ConfirmProvider
