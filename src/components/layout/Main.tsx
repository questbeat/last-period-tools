import React from 'react'
import { Container } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import { About } from '../static/About'
import { Calculator } from '../calculator/Calculator'
import { Chart } from '../chart/Chart'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    main: {
      flexGrow: 1,
      maxWidth: '100vw',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
  })
)

export const Main: React.FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.main}>
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Calculator} />
          <Route exact path="/about" component={About} />
          <Route exact path="/calc" component={Calculator} />
          <Route exact path="/chart" component={Chart} />
        </Switch>
      </Container>
    </main>
  )
}
