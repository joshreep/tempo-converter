import React, { FC } from 'react'
import { KeyboardAvoidingView, Modal, ModalProps, Platform } from 'react-native'
import styled from 'styled-components'
import DismissKeyboard from './DismissKeyboard'
import { View } from './Themed'

const CenteredView = styled(KeyboardAvoidingView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`

const ModalView = styled(View)`
    margin: 20px;
    border-radius: 15px;
    padding: 35px;
    shadow-color: #000;
    shadow-offset: 0 4px;
    shadow-opacity: 0.2;
    shadow-radius: 8px;
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
