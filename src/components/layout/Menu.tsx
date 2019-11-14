import { Divider, List, ListSubheader } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import ListItemLink from './ListItemLink'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
  })
)

type MenuProps = {
  onClick: () => void
  onKeyDown: () => void
}

const Menu: React.FC<MenuProps> = props => {
  const classes = useStyles()
  const { onClick, onKeyDown } = props

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClick(),
    [onClick]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => onKeyDown(),
    [onKeyDown]
  )

  return (
    <div className={classes.list} onClick={handleClick} onKeyDown={handleKeyDown}>
      <List>
        <ListSubheader>ツール一覧</ListSubheader>
        <ListItemLink to='/calc' primary='レガリア計算機' />
        <ListItemLink to='/chart' primary='レガリア能力値早見表' />
        <ListItemLink external to='https://period-recorder.com' primary='ギルバト記録ツール' />
        <Divider />
        <ListSubheader>その他</ListSubheader>
        <ListItemLink to='/about' primary='このサイトについて' />
        <ListItemLink external to='https://github.com/questbeat/last-period-tools' primary='GitHub' />
      </List>
    </div>
  )
}

export default Menu
