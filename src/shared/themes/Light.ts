import { createTheme } from '@mui/material'
import { cyan, green } from '@mui/material/colors'
export const LightTheme = createTheme({
  palette: {
    primary: {
      main: green[800],
      dark: green[900],
      light: green[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#F1F1F1',
      default: '#faffff',
    }
  }
})
