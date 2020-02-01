import {
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
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

interface CalculatorToolbarProps {
  regalias: Regalia.Regalia[]
  onAdd: () => void
  onImport: (regalias: Regalia.Regalia[]) => void
  onShare: () => void
}

export const CalculatorToolbar: React.FC<CalculatorToolbarProps> = ({
  regalias,
  onAdd,
  onImport,
  onShare,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputEl = useRef<HTMLInputElement>(null)

  const closeMenu = useCallback(() => setAnchorEl(null), [setAnchorEl])

  const handleAdd = useCallback(() => onAdd(), [onAdd])

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    [setAnchorEl]
  )

  const handleExport = useCallback(() => {
    const data = { regalias }
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })

    const elm = document.createElement('a')
    elm.download = 'regalia-calc.json'
    elm.href = window.URL.createObjectURL(blob)
    elm.click()

    closeMenu()
  }, [closeMenu, regalias])

  const handleImportClick = useCallback(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.click()
    }

    closeMenu()
  }, [closeMenu])

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

  const handleShare = useCallback(() => {
    onShare()
    closeMenu()
  }, [closeMenu, onShare])

  const addButton = useMemo(
    () => (
      <IconButton onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    ),
    [handleAdd]
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
          onClose={closeMenu}
          open={anchorEl !== null}
        >
          <MenuItem onClick={handleExport}>エクスポート</MenuItem>
          <MenuItem onClick={handleImportClick}>インポート</MenuItem>
          <MenuItem onClick={handleShare}>計算結果を共有</MenuItem>
        </Menu>
        <input type="file" onChange={handleImportChange} ref={inputEl} hidden />
      </div>
    </Toolbar>
  )
}
