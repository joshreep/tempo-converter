import 'styled-components/native'
import { Theme } from './theme/getThemeValues'

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {}
}
