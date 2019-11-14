import indigo from '@material-ui/core/colors/indigo'
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Main from './layout/Main'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
  typography: {
    fontSize: 13,
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  })
)

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <ThemeProvider theme={theme}>
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App
