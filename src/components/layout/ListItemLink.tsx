import { Link, ListItem, ListItemText } from '@material-ui/core'
import { LinkProps } from '@material-ui/core/Link'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { Omit } from '@material-ui/types'
import React, { useMemo } from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

interface ListItemLinkProps {
  external?: boolean
  primary: string
  to: string
}

export const ListItemLink: React.FC<ListItemLinkProps> = ({
  external,
  primary,
  to,
}) => {
  const renderLink = useMemo(() => {
    if (external === true) {
      return React.forwardRef<
        HTMLAnchorElement,
        Omit<LinkProps, 'innerRef' | 'to'>
      >((linkProps, ref) => (
        <Link
          href={to}
          target="_blank"
          rel="noopener"
          color="inherit"
          innerRef={ref}
          {...linkProps}
        />
      ))
    } else {
      return React.forwardRef<
        HTMLAnchorElement,
        Omit<RouterLinkProps, 'innerRef' | 'to'>
      >((linkProps, ref) => (
        <RouterLink to={to} innerRef={ref} {...linkProps} />
      ))
    }
  }, [external, to])

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
        {external ? <OpenInNewIcon color="action" fontSize="small" /> : null}
      </ListItem>
    </li>
  )
}
