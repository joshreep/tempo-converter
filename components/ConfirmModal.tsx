import React, { FC } from 'react'
import styled from 'styled-components'
import { useConfirmation } from '../contexts/confirm'
import ActionButtons from './ActionButtons'
import ModalWrapper from './ModalWrapper'
import { Text } from './Themed'

const Message = styled(Text)`
    font-size: 20px;
    padding-bottom: 20px;
`

const ConfirmModal: FC = () => {
    const { show, message, confirmButtonText, callback, closeConfirmation } = useConfirmation()

    const handleConfirm = () => {
        callback?.()
        closeConfirmation()
    }

    return (
        <ModalWrapper visible={show}>
            <Message>{message}</Message>
            <ActionButtons actions={{ [confirmButtonText]: handleConfirm, Cancel: closeConfirmation }} />
        </ModalWrapper>
    )
}

export default ConfirmModal
