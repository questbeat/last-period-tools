import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useMemo } from 'react'
import * as Regalia from '../../regalia'
import CalculatorTableRow from './CalculatorTableRow'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      padding: '6px 16px 6px 16px',
    },
    table: {
      minWidth: 650,
    },
  }),
)

type CalculatorProps = {
  regalias: Regalia.Regalia[]
}

const Calculator: React.FC<CalculatorProps> = props => {
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
        {props.regalias.map((regalia, index) => (
          <CalculatorTableRow
            key={index}
            regalia={regalia}
          />
        ))}
      </TableBody>
    ),
    [props.regalias]
  )

  return (
    <Table className={classes.table}>
      {tableHead}
      {tableBody}
    </Table>
  )
}

export default Calculator
