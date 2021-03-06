import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useMemo } from 'react'
import * as Regalia from '../../regalia'
import { CalculatorTableRow } from './CalculatorTableRow'

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    cell: {
      padding: '6px 16px 6px 16px',
    },
    table: {
      minWidth: 650,
    },
  })
)

interface CalculatorProps {
  regalias: Regalia.Regalia[]
}

export const CalculatorTable: React.FC<CalculatorProps> = ({ regalias }) => {
  const classes = useStyles()

  const tableHead = useMemo(
    () => (
      <TableHead>
        <TableRow>
          <TableCell className={classes.cell}>タイプ</TableCell>
          <TableCell className={classes.cell}>ランク</TableCell>
          <TableCell className={classes.cell}>レアリティ</TableCell>
          <TableCell className={classes.cell}>進化 (+値)</TableCell>
          <TableCell className={classes.cell}>レベル</TableCell>
          <TableCell className={classes.cell}>能力値</TableCell>
          <TableCell className={classes.cell}></TableCell>
        </TableRow>
      </TableHead>
    ),
    [classes.cell]
  )

  const tableBody = useMemo(
    () => (
      <TableBody>
        {regalias.map((regalia, index) => (
          <CalculatorTableRow key={index} regalia={regalia} />
        ))}
      </TableBody>
    ),
    [regalias]
  )

  return (
    <Table className={classes.table}>
      {tableHead}
      {tableBody}
    </Table>
  )
}
