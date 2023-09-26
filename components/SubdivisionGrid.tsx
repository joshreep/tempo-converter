import React, { FC } from 'react'
import useTapTempoSubDivision from '../hooks/useTapTempoSubDivision'
import { Col, Row } from './SubdivisionGrid.styles'

type Props = Pick<ReturnType<typeof useTapTempoSubDivision>, 'subdivisions'>

const SubdivisionGrid: FC<Props> = ({ subdivisions }) => {
    return subdivisions.map(({ title, value }) => (
        <Row key={title}>
            <Col $active={title === 'Quarter'} style={{ textAlign: 'right' }}>
                {title}
            </Col>
            <Col $active={title === 'Quarter'}>{value} ms</Col>
        </Row>
    ))
}

export default SubdivisionGrid
