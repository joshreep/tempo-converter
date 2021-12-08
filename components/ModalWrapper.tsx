import React, { FC } from 'react'
import { Modal, ModalProps, Platform } from 'react-native'
import styled from 'styled-components'
import Colors from '../constants/Colors'
import DismissKeyboard from './DismissKeyboard'
import { View, KeyboardAvoidingView } from './Themed'

const CenteredView = styled(KeyboardAvoidingView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`

const ModalView = styled(View)`
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-radius: 4px;
`

const ModalWrapper: FC<ModalProps> = ({ children, ...props }) => {
    return (
        <Modal {...props}>
            <DismissKeyboard>
                <CenteredView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    opacity={30}
                    darkColor={Colors.dark.modalBackground}
                    lightColor={Colors.light.modalBackground}
                >
                    <ModalView>{children}</ModalView>
                </CenteredView>
            </DismissKeyboard>
        </Modal>
    )
}

export default ModalWrapper
