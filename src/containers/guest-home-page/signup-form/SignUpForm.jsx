import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppCheckboxField from '~/components/app-checkbox-field/AppCheckboxField'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/signup-form/SignUpForm.styles'
const SignUpForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  handleNonInputChange,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)
  const { authLoading } = useSelector((state) => state.appMain)

  const { t } = useTranslation()

  const checkboxLabel =
    t('signup.iAgree') +
    ' ' +
    t('common.labels.terms') +
    ' ' +
    t('signup.and') +
    ' ' +
    t('common.labels.privacyPolicy')

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
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
      <AppTextField
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='large'
        sx={{ mb: '5px' }}
        type='text'
        value={data.email}
      />
      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        sx={{ mb: '5px' }}
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />
      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />
      <AppCheckboxField
        checkboxSx={{ mb: '5px' }}
        checked={data.areTermsAccepted}
        errorMsg={t(errors.areTermsAccepted)}
        label={checkboxLabel}
        labelSx={{ fontSize: '14px' }}
        onBlur={handleBlur('areTermsAccepted')}
        onChange={(event) =>
          handleNonInputChange('areTermsAccepted', event.target.checked)
        }
      />

      <AppButton
        disabled={
          Boolean(errors.firstName) ||
          Boolean(errors.lastName) ||
          Boolean(errors.confirmPassword) ||
          Boolean(errors.email) ||
          Boolean(errors.password) ||
          Boolean(errors.confirmPassword) ||
          !data.areTermsAccepted
        }
        loading={authLoading}
        sx={styles.loginButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignUpForm
