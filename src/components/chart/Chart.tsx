import { Box, Paper, Typography } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import { useChartContext, withChartContext } from './ChartContext'
import { setDefinition, setRank } from '../../modules/chart'
import * as Regalia from '../../regalia'
import { ChartTable } from './ChartTable'
import { ChartToolbar } from './ChartToolbar'

const useStyles = makeStyles<Theme>((theme) =>
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
  const { dispatch, state } = useChartContext()
  const { definition, rank } = state

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

export const Chart = withChartContext(InnerChart)
