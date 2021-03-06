import React, { useCallback } from 'react'
import { Divider, List, ListSubheader } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { ListItemLink } from './ListItemLink'

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    list: {
      width: 250,
    },
  })
)

interface MenuProps {
  onClick: () => void
  onKeyDown: () => void
}

export const Menu: React.FC<MenuProps> = ({ onClick, onKeyDown }) => {
  const classes = useStyles()

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClick(),
    [onClick]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => onKeyDown(),
    [onKeyDown]
  )

  return (
    <div
      className={classes.list}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <List>
        <ListSubheader>ツール一覧</ListSubheader>
        <ListItemLink to="/calc" primary="レガリア計算機" />
        <ListItemLink to="/chart" primary="レガリア能力値早見表" />
        <ListItemLink
          external
          to="https://period-recorder.com"
          primary="ギルバト記録ツール"
        />
        <Divider />
        <ListSubheader>その他</ListSubheader>
        <ListItemLink to="/about" primary="このサイトについて" />
        <ListItemLink
          external
          to="https://github.com/questbeat/last-period-tools"
          primary="GitHub"
        />
      </List>
    </div>
  )
}
