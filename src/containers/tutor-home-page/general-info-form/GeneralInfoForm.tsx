import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
import { initialValues } from '~/components/user-steps-wrapper/constants'
import { countries } from '~/constants/locations/countries'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/guest-home-page/signup-form/SignUpForm.styles'

interface GeneralInfoFormProps {
  data: typeof initialValues
  errors: Record<string, string>
  handleChange: (
    field: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    field: string
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
  handleAutoCompleteChange: (
    field: string
  ) => (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | null
  ) => void
}

const GeneralInfoForm = ({
  handleChange,
  handleBlur,
  handleAutoCompleteChange,
  data,
  errors
}: GeneralInfoFormProps) => {
  const { t } = useTranslation()
  const selectedCountry = countries.find((c) => c.name === data.country)
  const cityOptions = selectedCountry ? selectedCountry.cities : []
  return (
    <Box component='form' sx={styles.form}>
      <Box sx={styles.row}>
        <AppTextField
          autoFocus
          data-testid={'firstName'}
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          size='small'
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />
        <AppTextField
          data-testid={'lastName'}
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          size='small'
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>
      <Box sx={styles.row}>
        <AppAutoComplete
          fullWidth
          onChange={handleAutoCompleteChange('country')}
          options={countries.map((country) => country.name)}
          textFieldProps={{ label: 'Country' }}
          value={data.country}
        />
        <AppAutoComplete
          disabled={!data.country}
          fullWidth
          onChange={handleAutoCompleteChange('city')}
          options={cityOptions}
          textFieldProps={{ label: 'City', error: !data.country }}
          value={data.city}
        />
      </Box>
      <Box sx={styles.row}>
        <AppTextArea
          fullWidth
          maxLength={100}
          onChange={handleChange('professionalSummary')}
          placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
          sx={{ mt: '30px', width: '100%' }}
          value={data.professionalSummary}
        />
      </Box>
      <Typography>{t('becomeTutor.generalInfo.helperText')}</Typography>
    </Box>
  )
}

export default GeneralInfoForm
