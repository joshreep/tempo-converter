import styled from 'styled-components/native'
import Button from './Button'
import { Text } from './Themed'

export const StyledButton = styled(Button)`
    margin: 20px;
    padding: 35px;
    border-radius: 50000px;
    min-height: 130px;
    min-width: 130px;
`
export const ButtonText = styled(Text)<{ $inverted: boolean }>`
    font-size: 24px;
    color: ${({ theme, $inverted }) => ($inverted ? theme.primaryText : theme.textColorDark)};
`
