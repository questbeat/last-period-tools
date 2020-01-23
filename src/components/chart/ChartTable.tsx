import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import * as Regalia from '../../regalia'

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    cell: {
      padding: '6px 6px 6px 6px',
    },
    table: {
      minWidth: 650,
    },
  })
)

interface ChartTableProps {
  ability: Regalia.Ability
  rank: Regalia.Rank
}

export const ChartTable: React.FC<ChartTableProps> = ({ ability, rank }) => {
  const classes = useStyles()

  const rows: React.ReactElement[] = []
  Regalia.rarities.forEach(rarity => {
    const upgrades = rarity < 4 ? [rarity - 1] : [3, 4, 5, 6, 7, 8, 9, 10]
    upgrades.forEach(upgrade => {
      let cells = [
        <TableCell key={0} align="center" className={classes.cell}>
          {rarity}
        </TableCell>,
        <TableCell key={1} align="center" className={classes.cell}>
          {upgrade}
        </TableCell>,
      ]

      cells = cells.concat(
        Regalia.levels.map((level, index) => {
          const value = Regalia.computeValue({
            ability: ability,
            rank: rank,
            rarity,
            upgrade: upgrade as Regalia.Upgrade,
            level,
          })
          const displayValue = Regalia.getDisplayValue(value, true)
          return (
            <TableCell key={index + 2} align="center" className={classes.cell}>
              {displayValue}
            </TableCell>
          )
        })
      )

      rows.push(<TableRow key={rows.length}>{cells}</TableRow>)
    })
  })

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell key={0} align="center" className={classes.cell}>
            レアリティ
          </TableCell>
          <TableCell key={1} align="center" className={classes.cell}>
            進化 (+値)
          </TableCell>
          {Regalia.levels.map((level, index) => (
            <TableCell
              key={index + 2}
              align="center"
              className={classes.cell}
            >{`Lv.${level}`}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  )
}
