import Box from '@mui/material/Box'
import { useRef } from 'react'

import AppHeader from '~/containers/layout/app-header/AppHeader'
import AppMain from '~/containers/layout/app-main/AppMain'
import { styles } from '~/containers/app-content/AppContent.styles'

const AppContent = () => {
  const mainWithFooter = useRef<HTMLDivElement>(null)

  return (
    <Box data-testid='AppContent' sx={styles.root}>
      <AppHeader pageRef={mainWithFooter} />
      <AppMain pageRef={mainWithFooter} />
    </Box>
  )
}

export default AppContent
