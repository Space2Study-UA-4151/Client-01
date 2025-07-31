import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import generalInfoImg from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import GeneralInfoForm from '../general-info-form/GeneralInfoForm'

import useForm from '~/hooks/use-form'
import { firstName, lastName } from '~/utils/validations/login'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useEffect } from 'react'
import { useStepContext } from '~/context/step-context'
import { useTranslation } from 'react-i18next'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const general = stepData['generalInfo'] || { data: {}, errors: {} }
  const { data: contextData } = general

  const {
    data,
    errors,
    handleInputChange,
    handleBlur,
    handleAutoCompleteChange
  } = useForm({
    initialValues: { ...contextData },
    validations: { firstName, lastName }
  })
  useEffect(() => {
    handleStepData('generalInfo', data, errors)
  }, [data, errors, handleStepData])
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={generalInfoImg}
          sx={styles.img}
        />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title}>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <GeneralInfoForm
          data={data}
          errors={errors}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleBlur={handleBlur}
          handleChange={handleInputChange}
        />
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
