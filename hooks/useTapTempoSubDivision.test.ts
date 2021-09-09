jest.mock('./useTapTempo')

import useTapTempo from './useTapTempo'

function setup() {
    useTapTempo.mockReturnValue(1000)
}

describe('useTapTempoSubDivision', () => {
    it.todo('should return a handleTap function')

    it.todo('should return the bpm')

    it.todo('should return the all subdivisions')
})
