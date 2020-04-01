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
import React, { useCallback, useMemo, useState } from 'react'

const useStyles = makeStyles<Theme>((theme) =>
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
  onAdd: () => void
  onShare: () => void
}

export const CalculatorToolbar: React.FC<CalculatorToolbarProps> = ({
  onAdd,
  onShare,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const closeMenu = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const handleAdd = useCallback(() => onAdd(), [onAdd])

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    [setAnchorEl]
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
          <MenuItem onClick={handleShare}>計算結果を共有</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  )
}
