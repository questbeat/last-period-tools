import { Box, Link, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    about: {
      paddingTop: theme.spacing(2),
    },
  }),
)

const Section: React.FC = ({ children }) => {
  return (<Box mb={4}>{children}</Box>)
}

const Paragraph: React.FC = ({ children }) => {
  return (<Box component='p' fontWeight={300}>{children}</Box>)
}

const About = () => {
  const classes = useStyles()

  return (
    <div className={classes.about}>
      <Section>
        <Typography component='h2' variant='h6'>
          このサイトについて
        </Typography>
        <Paragraph>
          iOS/Android 向けゲーム「<Link href='http://lastperiod.happyelements.co.jp/' target='_blank' rel='noopener'>ラストピリオド -終わりなき螺旋の物語-</Link>」向けのツールを公開しています。<br />
          プログラミングの練習を目的として作ったものなので、実用性はあまりないかもしれません。
        </Paragraph>
        <Paragraph>
          このアプリは TypeScript + React + Redux で開発し、Netlify にデプロイしています。<br />
          <Link href='https://github.com/questbeat/last-period-tools' target='_blank' rel='noopener'>GitHub</Link> でソースコードを公開していますので、興味のある方はぜひ開発に参加してください。
        </Paragraph>
      </Section>
      <Section>
        <Typography component='h2' variant='h6'>
          お問い合わせ
        </Typography>
        <Paragraph>
          当サイトに関するお問い合わせは <Link href='https://twitter.com/ko9ab' target='_blank' rel='noopener'>@ko9ab</Link> へのダイレクトメッセージ等でお願い致します。<br />
          ご意見やご要望、不具合報告など、お気軽にご連絡ください。
        </Paragraph>
      </Section>
      <Section>
        <Typography component='h2' variant='h6'>
          使用しているデータについて
        </Typography>
        <Paragraph>
          レガリアのデータについては、<Link href='https://twitter.com/popopooooooooi' target='_blank' rel='noopener'>ぽぽぽーい</Link>様の<Link href='https://docs.google.com/spreadsheets/d/18hSvxSKns_Y3dlqBs-kzaiILYCy9cSU6IjJzUFucgIs' target='_blank' rel='noopener'>レガリア一覧表</Link>のデータを使用させていただきました。<br />
          ぽぽぽーい様に対して、当サイトに関するお問い合わせをなさいませんようお願い致します。
        </Paragraph>
      </Section>
    </div>
  )
}

export default About
