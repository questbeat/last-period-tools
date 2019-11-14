import { Box, FormControl, IconButton, MenuItem, Select, TableCell, TableRow } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useCallback, useContext, useMemo } from 'react'
import { CalculatorContext } from '../../contexts/calculator'
import { removeRegalia, setRegaliaDefinition, setRegaliaLevel, setRegaliaRank, setRegaliaRarity, setRegaliaUpgrade } from '../../modules/calculator'
import * as Regalia from '../../regalia'

const regaliaLevelLabels: { [key in Regalia.Level]: string } = {
  1: 'Lv.1',
  2: 'Lv.2',
  3: 'Lv.3',
  4: 'Lv.4',
  5: 'Lv.5',
  6: 'Lv.6',
  7: 'Lv.7',
  8: 'Lv.8',
  9: 'Lv.9',
  10: 'Lv.10',
}

const regaliaRarityLabels: { [key in Regalia.Rarity]: string } = {
  1: '★1',
  2: '★2',
  3: '★3',
  4: '★4',
}

const regaliaUpgradeLabels: { [key in Regalia.Upgrade]: string } = {
  0: '+0',
  1: '+1',
  2: '+2',
  3: '+3',
  4: '+4',
  5: '+5',
  6: '+6',
  7: '+7',
  8: '+8',
  9: '+9',
  10: '+10',
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      padding: '6px 16px 6px 16px',
    },
  }),
)

type CalculatorTableRowProps = {
  regalia: Regalia.Regalia
}

const CalculatorTableRow: React.FC<CalculatorTableRowProps> = props => {
  const classes = useStyles()
  const { dispatch } = useContext(CalculatorContext)

  const handleTypeChange = useCallback(
    (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
      const name = event.target.value as string
      const definition = Regalia.definitions.find(d => d.name === name)
      if (dispatch && definition) {
        dispatch(setRegaliaDefinition(props.regalia.id, definition))
      }
    },
    [dispatch, props.regalia.id]
  )

  const handleRankChange = useCallback(
    (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
      if (dispatch) {
        dispatch(setRegaliaRank(props.regalia.id, event.target.value as Regalia.Rank))
      }
    },
    [dispatch, props.regalia.id]
  )

  const handleRarityChange = useCallback(
    (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
      if (dispatch) {
        dispatch(setRegaliaRarity(props.regalia.id, event.target.value as Regalia.Rarity))
      }
    },
    [dispatch, props.regalia.id]
  )

  const handleUpgradeChange = useCallback(
    (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
      if (dispatch) {
        dispatch(setRegaliaUpgrade(props.regalia.id, event.target.value as Regalia.Upgrade))
      }
    },
    [dispatch, props.regalia.id]
  )

  const handleLevelChange = useCallback(
    (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
      if (dispatch) {
        dispatch(setRegaliaLevel(props.regalia.id, event.target.value as Regalia.Level))
      }
    },
    [dispatch, props.regalia.id]
  )

  const handleDelete = useCallback(
    () => dispatch && dispatch(removeRegalia(props.regalia.id)),
    [dispatch, props.regalia.id]
  )

  const typeCell = useMemo(
    () => (
      <TableCell className={classes.cell}>
        <FormControl>
          <Select
            value={props.regalia.definition.name}
            onChange={handleTypeChange}
            inputProps={{
              name: 'type',
              id: 'type',
            }}
          >
            {Regalia.definitions.map((definition, index) => (
              <MenuItem key={index} value={definition.name}>
                {definition.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    ),
    [classes.cell, handleTypeChange, props.regalia.definition]
  )

  const rankCell = useMemo(
    () => (
      <TableCell className={classes.cell}>
        <FormControl>
          <Select
            value={props.regalia.rank}
            onChange={handleRankChange}
            inputProps={{
              name: 'rank',
              id: 'rank',
            }}
          >
            {Regalia.ranks.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    ),
    [classes.cell, handleRankChange, props.regalia.rank]
  )

  const rarityCell = useMemo(
    () => (
      <TableCell className={classes.cell}>
        <FormControl>
          <Select
            value={props.regalia.rarity}
            onChange={handleRarityChange}
            inputProps={{
              name: 'rarity',
              id: 'rarity',
            }}
          >
            {Regalia.rarities.map((value, index) => (
              <MenuItem key={index} value={value}>
                {regaliaRarityLabels[value]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    ),
    [classes.cell, handleRarityChange, props.regalia.rarity]
  )

  const upgradeCell = useMemo(
    () => (
      <TableCell className={classes.cell}>
        <FormControl>
          <Select
            value={props.regalia.upgrade}
            onChange={handleUpgradeChange}
            inputProps={{
              name: 'plus',
              id: 'plus',
            }}
          >
            {Regalia.upgrades.map((value, index) => (
              <MenuItem key={index} value={value}>
                {regaliaUpgradeLabels[value]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    ),
    [classes.cell, handleUpgradeChange, props.regalia.upgrade]
  )

  const levelCell = useMemo(
    () => (
      <TableCell className={classes.cell}>
        <FormControl>
          <Select
            value={props.regalia.level}
            onChange={handleLevelChange}
            inputProps={{
              name: 'level',
              id: 'level',
            }}
          >
            {Regalia.levels.map((level, index) => (
              <MenuItem key={index} value={level}>
                {regaliaLevelLabels[level]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    ),
    [classes.cell, handleLevelChange, props.regalia.level]
  )

  const displayValueCell = useMemo(
    () => {
      const values = Regalia.computeValues(props.regalia)
      const displayValues = values.map(value => Regalia.getDisplayValue(value))

      return (
        <TableCell className={classes.cell}>
          <Box display='flex' flexDirection='column'>
            {displayValues.map((displayValue, index) => (
              <Box key={index}>{displayValue}</Box>
            ))}
          </Box>
        </TableCell>
      )
    },
    [classes.cell, props.regalia]
  )

  const actionCell = useMemo(
    () => (
      <TableCell className={classes.cell} align='right'>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    ),
    [classes.cell, handleDelete]
  )

  return (
    <TableRow>
      {typeCell}
      {rankCell}
      {rarityCell}
      {upgradeCell}
      {levelCell}
      {displayValueCell}
      {actionCell}
    </TableRow>
  )
}

export default CalculatorTableRow
