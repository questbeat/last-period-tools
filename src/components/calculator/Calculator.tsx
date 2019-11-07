import { Paper } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CalculatorContext, CalculatorContextProps } from '../../contexts/calculator'
import { State } from '../../modules'
import { addRegalia, removeRegalia, setRegaliaDefinition, setRegaliaLevel, setRegaliaRank, setRegaliaRarity, setRegalias, setRegaliaUpgrade } from '../../modules/calculator'
import * as Regalia from '../../regalia'
import CalculatorTable from './CalculatorTable'
import CalculatorToolbar from './CalculatorToolbar'

const useStyles = makeStyles((theme: Theme) =>
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
  }),
)

const Calculator = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const regalias = useSelector((state: State) => state.calculator.regalias)
  const allRegalias = useMemo(
    () => regalias.allIds.map(id => regalias.byId[id]),
    [regalias]
  )

  const context: CalculatorContextProps = {
    removeRegalia: id => { dispatch(removeRegalia(id)) },
    setRegaliaDefinition: (id, definition) => { dispatch(setRegaliaDefinition(id, definition)) },
    setRegaliaLevel: (id, level) => { dispatch(setRegaliaLevel(id, level)) },
    setRegaliaRank: (id, rank) => { dispatch(setRegaliaRank(id, rank)) },
    setRegaliaRarity: (id, rarity) => { dispatch(setRegaliaRarity(id, rarity)) },
    setRegaliaUpgrade: (id, upgrade) => { dispatch(setRegaliaUpgrade(id, upgrade)) },
  }

  const handleAdd = useCallback(
    () => dispatch(addRegalia()),
    [dispatch]
  )

  const handleImport = useCallback(
    (regalias: Regalia.Regalia[]) => dispatch(setRegalias(regalias)),
    [dispatch]
  )

  return (
    <CalculatorContext.Provider value={context}>
      <Paper className={classes.paper}>
        <CalculatorToolbar
          regalias={allRegalias}
          onAdd={handleAdd}
          onImport={handleImport}
        />
        <CalculatorTable regalias={allRegalias} />
      </Paper>
    </CalculatorContext.Provider>
  )
}

export default Calculator
