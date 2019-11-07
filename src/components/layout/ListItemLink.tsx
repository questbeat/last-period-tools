import { Link, ListItem, ListItemText } from '@material-ui/core'
import { LinkProps } from '@material-ui/core/Link'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { Omit } from '@material-ui/types'
import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

type Props = {
  external: boolean
  primary: string
  to: string
}

const ListItemLink = (props: Props) => {
  const { external, primary, to } = props

  const renderLink = React.useMemo(
    () => {
      if (external) {
        return React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef' | 'to'>>((linkProps, ref) => (
          <Link href={to} target='_blank' rel='noopener' color='inherit' innerRef={ref} {...linkProps} />
        ))
      } else {
        return React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>((linkProps, ref) => (
          <RouterLink to={to} innerRef={ref} {...linkProps} />
        ))
      }
    },
    [external, to],
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
        {external ? <OpenInNewIcon color='action' fontSize='small' /> : null}
      </ListItem>
    </li>
  )
}

ListItemLink.defaultProps = {
  external: false,
}

export default ListItemLink
