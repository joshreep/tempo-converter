import React, { FC } from 'react'
import { Keyboard, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native'

const DismissKeyboard: FC<TouchableWithoutFeedbackProps> = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
)

export default DismissKeyboard
