import styled from 'styled-components/native'
import { Text, View } from './Themed'

type ColProps = {
    $active: boolean
}

export const Row = styled(View)`
    flex-flow: row nowrap;
`

export const Col = styled(Text)<ColProps>`
    width: 50%;
    padding: 1px 5px;
    color: ${({ $active, theme }) => ($active ? theme.primaryText : theme.textColor)};
`
