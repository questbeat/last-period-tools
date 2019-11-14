import {
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import * as Regalia from '../../regalia'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    actions: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
    },
    spacer: {
      flex: '1 1 100%',
    },
    title: {
      flex: '0 0 auto',
    },
    toolbar: {
      minWidth: 650,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
)

type CalculatorToolbarProps = {
  regalias: Regalia.Regalia[]
  onAdd: () => void
  onImport: (regalias: Regalia.Regalia[]) => void
}

const CalculatorToolbar: React.FC<CalculatorToolbarProps> = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const classes = useStyles()
  const inputEl = useRef<HTMLInputElement>(null)
  const { onAdd, onImport } = props

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    [setAnchorEl]
  )

  const handleMenuClose = useCallback(() => setAnchorEl(null), [setAnchorEl])

  const handleExport = useCallback(() => {
    const data = { regalias: props.regalias }
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })

    const elm = document.createElement('a')
    elm.download = 'regalia-calc.json'
    elm.href = window.URL.createObjectURL(blob)
    elm.click()

    setAnchorEl(null)
  }, [props.regalias, setAnchorEl])

  const handleImportClick = useCallback(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.click()
    }

    setAnchorEl(null)
  }, [inputEl, setAnchorEl])

  const handleImportChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const data = JSON.parse(reader.result as string)
          onImport(data.regalias)
        }
        reader.readAsText(files[0])
      }
    },
    [onImport]
  )

  const addButton = useMemo(
    () => (
      <IconButton onClick={onAdd}>
        <AddIcon />
      </IconButton>
    ),
    [onAdd]
  )

  const menuButton = useMemo(
    () => (
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
    ),
    [handleMenuOpen]
  )

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Typography variant="h6">レガリア計算機</Typography>
      </div>
      <div className={classes.spacer}></div>
      <div className={classes.actions}>
        {addButton}
        {menuButton}
        <Menu
          anchorEl={anchorEl}
          keepMounted
          onClose={handleMenuClose}
          open={anchorEl !== null}
        >
          <MenuItem onClick={handleExport}>エクスポート</MenuItem>
          <MenuItem onClick={handleImportClick}>インポート</MenuItem>
        </Menu>
        <input type="file" onChange={handleImportChange} ref={inputEl} hidden />
      </div>
    </Toolbar>
  )
}

export default CalculatorToolbar
