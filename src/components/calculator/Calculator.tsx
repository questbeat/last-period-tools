import { Paper } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useContext, useMemo } from 'react'
import {
  CalculatorContext,
  CalculatorContextProvider,
} from '../../contexts/calculator'
import { addRegalia, setRegalias } from '../../modules/calculator'
import * as Regalia from '../../regalia'
import { CalculatorTable } from './CalculatorTable'
import { CalculatorToolbar } from './CalculatorToolbar'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    cell: {
      padding: '6px 16px 6px 16px',
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(2),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  })
)

const InnerCalculator: React.FC = () => {
  const classes = useStyles()
  const { dispatch, state } = useContext(CalculatorContext)
  const regalias = state.regalias

  const allRegalias = useMemo(
    () => regalias.allIds.map(id => regalias.byId[id]),
    [regalias]
  )

  const handleAdd = useCallback(() => dispatch && dispatch(addRegalia()), [
    dispatch,
  ])

  const handleImport = useCallback(
    (regalias: Regalia.Regalia[]) =>
      dispatch && dispatch(setRegalias(regalias)),
    [dispatch]
  )

  return (
    <Paper className={classes.paper}>
      <CalculatorToolbar
        regalias={allRegalias}
        onAdd={handleAdd}
        onImport={handleImport}
      />
      <CalculatorTable regalias={allRegalias} />
    </Paper>
  )
}

export const Calculator: React.FC = () => {
  return (
    <CalculatorContextProvider>
      <InnerCalculator />
    </CalculatorContextProvider>
  )
}
