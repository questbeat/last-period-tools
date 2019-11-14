import { Container } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Calculator from '../calculator/Calculator'
import Chart from '../chart/Chart'
import About from '../static/About'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      maxWidth: '100vw',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
  }),
)

const Main: React.FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.main}>
      <Container maxWidth='md'>
        <Switch>
          <Route exact path='/' component={Calculator} />
          <Route exact path='/about' component={About} />
          <Route exact path='/calc' component={Calculator} />
          <Route exact path='/chart' component={Chart} />
        </Switch>
      </Container>
    </main>
  )
}

export default Main
