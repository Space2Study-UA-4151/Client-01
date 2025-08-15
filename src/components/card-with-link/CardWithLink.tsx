import { FC } from 'react'
import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/card-with-link/CardWithLink.styles'

interface CardWithLinkProps {
  Icon: React.ElementType
  iconBackground: string
  title: string
  description: string
  link: string
  color: string
}

const CardWithLink: FC<CardWithLinkProps> = ({
  color,
  Icon,
  iconBackground,
  title,
  description,
  link
}) => {
  return (
    <AppCard link={link}>
      <Box sx={{ ...styles.imgContainer, background: iconBackground }}>
        {Icon ? (
          <Icon
            alt={title}
            sx={{
              color,
              ...styles.img
            }}
          />
        ) : null}
      </Box>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithLink
