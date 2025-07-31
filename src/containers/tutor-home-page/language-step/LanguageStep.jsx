import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'

import { useState } from 'react'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

const SPOKEN_LANG_ENUM = [
  'English',
  'Ukrainian',
  'Polish',
  'German',
  'French',
  'Spanish',
  'Arabic'
]

const LanguageStep = ({ btnsBox }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleChange = (event, newValue) => {
    setSelectedLanguage(newValue)
    console.log('Selected language:', newValue)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.rightContent}>
          <Typography variant='body2'>
            Please select the language in which you would like to study and
            cooperate.
          </Typography>
          <Autocomplete
            onChange={handleChange}
            options={SPOKEN_LANG_ENUM}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Your native language'
                variant='outlined'
              />
            )}
            value={selectedLanguage}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
