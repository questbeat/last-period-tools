import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useCallback, useState } from 'react'
import Menu from './Menu'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    header: {
      flexGrow: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

const Header: React.FC = () => {
  const classes = useStyles()
  const [menuOpened, setMenuOpened] = useState(false)

  const handleMenuOpen = useCallback(() => setMenuOpened(true), [setMenuOpened])

  const handleMenuClose = useCallback(() => setMenuOpened(false), [
    setMenuOpened,
  ])

  return (
    <AppBar className={classes.header} position="static">
      <Drawer open={menuOpened} onClose={handleMenuClose}>
        <Menu onClick={handleMenuClose} onKeyDown={handleMenuClose} />
      </Drawer>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          Last Period Tools
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
