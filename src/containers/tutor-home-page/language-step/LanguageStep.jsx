import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useStepContext } from '~/context/step-context'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

// const SPOKEN_LANG_ENUM = [
//   'English',
//   'Ukrainian',
//   'Polish',
//   'German',
//   'French',
//   'Spanish',
//   'Arabic'
// ]

const API_BASE = import.meta.env.VITE_API_BASE_PATH

const LanguageStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const languageFromContext = stepData['language'] || null

  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(true)
  const [setError] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(languageFromContext)

  const handleChange = (event, newValue) => {
    setSelectedLanguage(newValue)
    console.log('Selected language:', newValue)
  }

  useEffect(() => {
    handleStepData('language', selectedLanguage)
  }, [selectedLanguage, handleStepData])

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${API_BASE}languages`)

        if (response.data && Array.isArray(response.data.languages)) {
          setLanguages(response.data.languages)
          setError(null)
        } else {
          setError('Invalid data format from server')
          setLanguages([])
        }
      } catch (err) {
        setError('Failed to fetch languages')
        setLanguages([])
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [setError])

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
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={handleChange}
            options={languages}
            renderInput={(params) => (
              <TextField
                {...params}
                disabled={loading}
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
