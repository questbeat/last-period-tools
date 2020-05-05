import { Paper } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useCalculatorContext,
  withCalculatorContext,
} from './CalculatorContext'
import { addRegalia, setRegalias } from '../../modules/calculator'
import { CalculatorTable } from './CalculatorTable'
import { CalculatorToolbar } from './CalculatorToolbar'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { decodeRegalias, encodeRegalias } from '../../serialization'
import copyToClipboard from 'clipboard-copy'
import { Notification } from './Notification'

const useStyles = makeStyles<Theme>((theme) =>
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

const InnerCalculator: React.FC<RouteComponentProps> = ({ location }) => {
  const classes = useStyles()
  const { dispatch, state } = useCalculatorContext()
  const regalias = state.regalias

  const allRegalias = useMemo(
    () => regalias.allIds.map((id) => regalias.byId[id]),
    [regalias]
  )

  const handleAdd = useCallback(() => dispatch(addRegalia()), [dispatch])

  const [copyNotificationOpen, setCopyNotificationOpen] = useState(false)
  const handleCopyNotificationClose = useCallback(
    () => setCopyNotificationOpen(false),
    []
  )

  const handleShare = useCallback(() => {
    const code = encodeRegalias(allRegalias)
    const currentUrl = new URL(window.location.href)
    const shareUrl = new URL(currentUrl.pathname, currentUrl.origin)
    shareUrl.searchParams.set('code', code)
    copyToClipboard(shareUrl.href)
    setCopyNotificationOpen(true)
  }, [allRegalias])

  useEffect(
    () => {
      const query = queryString.parse(location.search)
      if (!query.code || Array.isArray(query.code)) return

      const regalias = decodeRegalias(query.code)
      dispatch(setRegalias(regalias))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  )

  return (
    <Paper className={classes.paper}>
      <CalculatorToolbar onAdd={handleAdd} onShare={handleShare} />
      <CalculatorTable regalias={allRegalias} />
      <Notification
        message={'共有URLをクリップボードにコピーしました'}
        open={copyNotificationOpen}
        onClose={handleCopyNotificationClose}
        severity="success"
      />
    </Paper>
  )
}

export const Calculator = withRouter(withCalculatorContext(InnerCalculator))
