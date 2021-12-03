import React, { FC } from 'react'
import { KeyboardAvoidingView, Modal, ModalProps, Platform } from 'react-native'
import styled from 'styled-components'
import DismissKeyboard from './DismissKeyboard'
import { View } from './Themed'

const CenteredView = styled(KeyboardAvoidingView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    /* margin-top: 22px; */
`

const ModalView = styled(View)`
    flex: 1;
    width: 100%;
    padding: 35px;
`

const ModalWrapper: FC<ModalProps> = ({ children, ...props }) => {
    return (
        <Modal {...props}>
            <DismissKeyboard>
                <CenteredView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ModalView>{children}</ModalView>
                </CenteredView>
            </DismissKeyboard>
        </Modal>
    )
}

export default ModalWrapper
