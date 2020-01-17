import { Box, Container } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    footer: {
      backgroundColor: grey[50],
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(4),
    },
  })
)

export const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Box color="text.secondary" fontSize="0.75rem" mb={1}>
          ラストピリオドはHappy Elements株式会社の登録商標です。
        </Box>
        <Box color="text.secondary" fontSize="0.75rem" mb={1}>
          当サイトは個人サイトであり、Happy
          Elements株式会社様とは一切関係ありません。
          <br />
          Happy
          Elements株式会社様に対して、当サイトに関するお問い合わせをなさいませんようお願い致します。
        </Box>
        <Box color="text.secondary" fontSize="0.75rem" mb={1}>
          下記はサイト独自の内容に関する著作権を示すものです。
        </Box>
        <Box color="text.secondary" fontSize="0.75rem">
          &copy; ko9ab
        </Box>
      </Container>
    </footer>
  )
}
