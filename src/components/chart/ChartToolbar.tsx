import {
  FormControl,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import * as Regalia from '../../regalia'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    definitionSelector: {
      marginRight: theme.spacing(2),
    },
    forms: {
      flex: '0 0 auto',
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

type ChartToolbarProps = {
  definition: Regalia.Definition
  rank: Regalia.Rank
  onDefinitionChange: (definition: Regalia.Definition) => void
  onRankChange: (rank: Regalia.Rank) => void
}

const ChartToolbar: React.FC<ChartToolbarProps> = props => {
  const classes = useStyles()
  const { onDefinitionChange, onRankChange } = props

  const handleDefinitionChange = useCallback(
    (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      const name = event.target.value as string
      const definition = Regalia.definitions.find(d => d.name === name)
      if (definition) onDefinitionChange(definition)
    },
    [onDefinitionChange]
  )

  const handleRankChange = useCallback(
    (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      onRankChange(event.target.value as Regalia.Rank)
    },
    [onRankChange]
  )

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Typography variant="h6">レガリア能力値早見表</Typography>
      </div>
      <div className={classes.spacer}></div>
      <div className={classes.forms}>
        <FormControl className={classes.definitionSelector}>
          <Select
            value={props.definition.name}
            onChange={handleDefinitionChange}
            inputProps={{
              name: 'type',
              id: 'type',
            }}
          >
            {Regalia.definitions.map((definition, index) => (
              <MenuItem key={index} value={definition.name}>
                {definition.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={props.rank}
            onChange={handleRankChange}
            inputProps={{
              name: 'rank',
              id: 'rank',
            }}
          >
            {Regalia.ranks.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Toolbar>
  )
}

export default ChartToolbar
