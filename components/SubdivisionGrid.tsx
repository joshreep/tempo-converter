import React, { FC } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'

import { useSettings } from '../contexts/settings'
import useTapTempoSubDivision from '../hooks/useTapTempoSubDivision'

const Row = styled(View)`
    flex-flow: row nowrap;
`

const Col = styled(Text)<{ active: boolean }>`
    width: 50%;
    padding: 1px 5px;
    color: ${({ active, theme }) => (active ? theme.primaryDark : theme.textColor)};
`

type Props = Pick<ReturnType<typeof useTapTempoSubDivision>, 'subdivisions'>

const SubdivisionGrid: FC<Props> = ({ subdivisions }) => {
    const { settings } = useSettings()

    return (
        <>
            {subdivisions.map(({ title, value }) => {
                if (settings[title])
                    return (
                        <Row key={title}>
                            <Col active={title === 'Quarter'} style={{ textAlign: 'right' }}>
                                {title}
                            </Col>
                            <Col active={title === 'Quarter'}>{value} ms</Col>
                        </Row>
                    )
            })}
        </>
    )
}

export default SubdivisionGrid
