import { Box, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../modules'
import { setDefinition, setRank } from '../../modules/chart'
import * as Regalia from '../../regalia'
import ChartTable from './ChartTable'
import ChartToolbar from './ChartToolbar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      marginTop: theme.spacing(2),
      overflowX: 'auto',
    },
    title: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }),
)

const Chart = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const definition = useSelector((state: State) => state.chart.definition)
  const rank = useSelector((state: State) => state.chart.rank)

  const handleDefinitionChange = useCallback(
    (definition: Regalia.Definition) => dispatch(setDefinition(definition)),
    [dispatch]
  )

  const handleRankChange = useCallback(
    (rank: Regalia.Rank) => dispatch(setRank(rank)),
    [dispatch]
  )

  return (
    <Paper className={classes.paper}>
      <ChartToolbar
        definition={definition}
        rank={rank}
        onDefinitionChange={handleDefinitionChange}
        onRankChange={handleRankChange}
      />
      {definition.abilities.map((ability, index) => {
        return (
          <Box mb={(index < definition.abilities.length - 1) ? 2 : 0}>
            <Typography className={classes.title} variant='subtitle1' gutterBottom>
              {definition.abilities[index].name}
            </Typography>
            <ChartTable ability={ability} rank={rank} />
          </Box>
        )
      })}
    </Paper>
  )
}

export default Chart
