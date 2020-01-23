import { Box, Paper, Typography } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useContext } from 'react'
import { ChartContext, ChartContextProvider } from './ChartContextProvider'
import { setDefinition, setRank } from '../../modules/chart'
import * as Regalia from '../../regalia'
import { ChartTable } from './ChartTable'
import { ChartToolbar } from './ChartToolbar'

const useStyles = makeStyles<Theme>(theme =>
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
  })
)

const InnerChart: React.FC = () => {
  const classes = useStyles()
  const { dispatch, state } = useContext(ChartContext)
  const { definition, rank } = state

  const handleDefinitionChange = useCallback(
    (definition: Regalia.Definition) =>
      dispatch && dispatch(setDefinition(definition)),
    [dispatch]
  )

  const handleRankChange = useCallback(
    (rank: Regalia.Rank) => dispatch && dispatch(setRank(rank)),
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
          <Box mb={index < definition.abilities.length - 1 ? 2 : 0}>
            <Typography
              className={classes.title}
              variant="subtitle1"
              gutterBottom
            >
              {definition.abilities[index].name}
            </Typography>
            <ChartTable ability={ability} rank={rank} />
          </Box>
        )
      })}
    </Paper>
  )
}

export const Chart: React.FC = () => {
  return (
    <ChartContextProvider>
      <InnerChart />
    </ChartContextProvider>
  )
}
